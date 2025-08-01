import { 
    BadRequestException,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { Repository, DataSource} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Posts } from './entities/posts.entity';
import { Files } from '../files/entities/files.entity';
import { GetPostDto } from './dto/response/get-post.dto';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto'; 
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from './dto/request/post-param.dto';
import { PostsException } from './enums/posts-exception';
@Injectable()
export class PostsService{
    constructor(   
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
        private readonly dataSource: DataSource
    ) {}

    async getPaginatePost(query: PostParam): Promise<PaginationDto<GetPostDto>>{
        const { page = 1, limit = 10, search, categoryName } = query;
        const qb = this.postsRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.bannerFile', 'bannerFile')
        if (search) {
            qb.andWhere(
                `post.title LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        if (categoryName) {
            qb.andWhere(
                `category.name LIKE N'%' + :categoryName + '%'`,
                { categoryName },
            );
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


    async getDetailPost(id: string): Promise<GetPostDto>{
        const qb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.bannerFile', 'bannerFile')
        .leftJoinAndSelect('post.categories', 'category')
        .leftJoinAndSelect('post.relatedPosts', 'relatedPosts')
         .where('post.id = :id', { id });
        const item = await qb.getOne();
        const data = plainToInstance(GetPostDto, item, {
            excludeExtraneousValues: true,
        });
        return data;
    }

    async getDetailPostBySlug(slug: string): Promise<GetPostDto>{
        const qb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.bannerFile', 'bannerFile')
        .leftJoinAndSelect('post.categories', 'category')
        .leftJoinAndSelect('post.relatedPosts', 'relatedPosts')
         .where('post.slug = :slug', { slug });
        const item = await qb.getOne();
        const data = plainToInstance(GetPostDto, item, {
            excludeExtraneousValues: true,
        });
        return data;
    }



    async createPost(dto: CreatePostDto, username: string): Promise<GetPostDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const postRepo = queryRunner.manager.getRepository(Posts);
            const slug = slugString(dto.title);
            const existing = await this.postsRepository.findOne({where: {slug}})
            if(existing){
                throw new BadRequestException(PostsException.SLUG_ALREADY_EXIST)
            }
            const newPost = postRepo.create({
                title: dto.title,
                summary: dto.summary,
                content: dto.content,
                bannerId: dto.bannerId,
                slug: slug,
                categoryId: dto.categoryId,
                createdBy: username,
                createdAt: new Date(),
            });
            const saved = await postRepo.save(newPost);
            if (dto.relatedId && dto.relatedId.length > 0) {
                const relatedPosts = await postRepo.findByIds(dto.relatedId);
                saved.relatedPosts = relatedPosts;
                await postRepo.save(saved);
            }
            await queryRunner.commitTransaction();
            const result = plainToInstance(GetPostDto, saved, {
                excludeExtraneousValues: true,
            });
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async updatePost(postId: string, dto: UpdatePostDto, username: string): Promise<GetPostDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const postRepo = queryRunner.manager.getRepository(Posts);

            const updatedPost = await postRepo.findOne({
                where: { id: postId },
                relations: ['relatedPosts'],
            });

            if (!updatedPost) {
                throw new NotFoundException(PostsException.POST_NOT_FOUND);
            }

            if (dto.title) {
                updatedPost.title = dto.title;
                updatedPost.slug = slugString(dto.title);
            }
            if(dto.bannerId) updatedPost.bannerId = dto.bannerId;
            if (dto.summary) updatedPost.summary = dto.summary;
            if (dto.content) updatedPost.content = dto.content;
            if (dto.categoryId) updatedPost.categoryId = dto.categoryId;

            updatedPost.createdBy = username;
            updatedPost.createdAt = new Date();

            if (dto.relatedId && dto.relatedId.length > 0) {
                const relatedPosts = await postRepo.findByIds(dto.relatedId);
                updatedPost.relatedPosts = relatedPosts;
            } else {
                updatedPost.relatedPosts = [];
            }

            const savedPost = await postRepo.save(updatedPost);

            await queryRunner.commitTransaction();

            return plainToInstance(GetPostDto, savedPost, {
                excludeExtraneousValues: true,
            });

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deletePost(postId: string): Promise<GetPostDto> {
        // Tìm bài viết cần xóa, load cả quan hệ relatedPosts và relatedByPosts
        const post = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['relatedPosts', 'relatedPosts.relatedByPosts'], // Load quan hệ hai chiều
        });

        if (!post) {
            throw new NotFoundException(PostsException.POST_NOT_FOUND);
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
