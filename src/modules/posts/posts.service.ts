import { 
    Inject,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
import { slugString } from '@/common/utils/string.util';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Posts } from './entities/posts.entity';
import { GetPostDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto'; 
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from './dto/post-param.dto';
@Injectable()
export class PostsService{
    constructor(   
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createPost(dto: CreatePostDto, username: string): Promise<GetPostDto>{
        const slug = slugString(dto.title)
        const newPost = this.postsRepository.create({
            title: dto.title,
            summary: dto.summary,
            content: dto.content,
            isActived: dto.isActived,
            banner: dto.banner,
            slug: slug,
            categoryId: dto.categoryId,
            createdBy: username,
            createdAt: new Date(),
        })
        const saved = await this.postsRepository.save(newPost);
        if(dto.relatedId && dto.relatedId.length > 0 ){
             const relatedPosts = await this.postsRepository.findByIds(dto.relatedId);
            // Gán các bài viết liên quan vào bài viết mới
            saved.relatedPosts = relatedPosts;
            // Cập nhật lại bài viết với các bài viết liên quan
            await this.postsRepository.save(saved);
        }
        const res = plainToInstance(GetPostDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updatePost(postId: string, dto: UpdatePostDto, username: string): Promise<GetPostDto> {
        // Lấy thông tin bài viết hiện tại
        const updatedPost = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['relatedPosts'], // Lấy các bài viết liên quan
        });

        if (!updatedPost) {
            throw new Error('Không tìm thấy bài viết');
        }

        // Cập nhật các trường từ DTO
        if (dto.title) {
            updatedPost.title = dto.title;
            updatedPost.slug = slugString(dto.title);  // Cập nhật slug nếu có tiêu đề mới
        }

        if (dto.summary) updatedPost.summary = dto.summary;
        if (dto.content) updatedPost.content = dto.content;
        
        // Cập nhật trạng thái isActive
        if (dto.isActived !== undefined) updatedPost.isActived = dto.isActived;

        // Cập nhật danh mục nếu có
        if (dto.categoryId) updatedPost.categoryId = dto.categoryId;

        updatedPost.createdBy = username;
        updatedPost.createdAt = new Date();

        // Cập nhật các bài viết liên quan
        if (dto.relatedId && dto.relatedId.length > 0) {
            const relatedPosts = await this.postsRepository.findByIds(dto.relatedId);
            updatedPost.relatedPosts = relatedPosts;  // Cập nhật bài viết liên quan
        } 

        await this.postsRepository.save(updatedPost);

        // Chuyển đổi bài viết thành DTO và trả về
        const res = plainToInstance(GetPostDto, updatedPost, {
            excludeExtraneousValues: true,
        });

        return res;
    }


    async getPaginatePost(query: PostParam): Promise<PaginationDto<GetPostDto>>{
        const { page = 1, limit = 10, search, categoryName } = query;
        const qb = this.postsRepository.createQueryBuilder('post')

        if (search) {
            qb.andWhere(
                'post.title LIKE :search OR post.content LIKE :search',
                { search: `%${search}%` },
            );
        }
        if (categoryName) {
                qb.andWhere('category.name LIKE :categoryName', {
                categoryName: `%${categoryName}%`,
            });
        }
        qb.orderBy('post.createdAt', 'DESC').skip((page-1)*limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        
        const data = plainToInstance(GetPostDto, items, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetPostDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;
    }


    async getDetailPost(slug: string): Promise<GetPostDto>{
        const qb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.categories', 'category')
        .leftJoinAndSelect('post.relatedPosts', 'relatedPosts')
         .where('post.slug = :slug', { slug });
        const item = await qb.getOne();
        const data = plainToInstance(GetPostDto, item, {
            excludeExtraneousValues: true,
        });
        return data;
    }

    
    async deletePost(postId: string): Promise<GetPostDto> {
        // Tìm bài viết cần xóa, load cả quan hệ relatedPosts và relatedByPosts
        const post = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['relatedPosts', 'relatedPosts.relatedByPosts'], // Load quan hệ hai chiều
        });

        if (!post) {
            throw new NotFoundException(`Không tìm thấy bài viết có ID ${postId}`);
        }

        // Xóa mối quan hệ từ các bài viết liên quan
        if (post.relatedPosts && post.relatedPosts.length > 0) {
            for (const relatedPost of post.relatedPosts) {
                if (relatedPost.relatedByPosts) {
                // Lọc bỏ bài viết hiện tại khỏi relatedByPosts của relatedPost
                relatedPost.relatedByPosts = relatedPost.relatedByPosts.filter(p => p.id !== postId);
                await this.postsRepository.save(relatedPost); // Lưu lại thay đổi
                }
            }
        }

        // Xóa bài viết
        const deletedPost = await this.postsRepository.remove(post); // Hoặc sử dụng softRemove nếu cần soft delete

        // Chuyển đối tượng xóa sang DTO
        const res = plainToInstance(GetPostDto, deletedPost, {
        excludeExtraneousValues: true,
        });
        return res;
    }

}
