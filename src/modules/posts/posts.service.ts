import { 
    Inject,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
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

    async createPost(dto: CreatePostDto): Promise<GetPostDto>{
        let saved;
        if(dto.relatedPosts){
            const relatedEntities = dto.relatedPosts.map(r =>
                this.postsRepository.create({
                title: r.title,
                slug: r.slug,
                summary: r.summary,
                content: r.content,
                isActive: r.isActived,
                banner: r.banner,
                categoryId: r.categoryId,
                createdBy: r.createdBy,
                createdAt: new Date(),
                })
            ) || [];
            const newPost = this.postsRepository.create({
                title: dto.title,
                slug: dto.slug,
                summary: dto.summary,
                content: dto.content,
                isActive: dto.isActived,
                banner: dto.banner,
                categoryId: dto.categoryId,
                createdBy: dto.createdBy,
                createdAt: new Date(),
                relatedPosts: relatedEntities,
            });
            saved = await this.postsRepository.save(newPost);
        }
        const res = plainToInstance(GetPostDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updatePost (postId: string, dto: UpdatePostDto): Promise<GetPostDto>{             
        const existedPost = await this.postsRepository.findOne({
            where: { id: postId }
        });       
        if (!existedPost) {
            throw new NotFoundException('Post not found');
        }
        const newPost = plainToInstance(Posts, dto);
        const update = this.postsRepository.merge(existedPost,newPost);
        const savedCategory = await this.postsRepository.save(update);
        const res = plainToInstance(GetPostDto, savedCategory, {
            excludeExtraneousValues: true,
        });    
        return res;
    }

    
    async getPaginatePost(query: PostParam): Promise<PaginationDto<GetPostDto>>{
        const { page = 1, limit = 10, search, categoryName } = query;

        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.categories', 'category')
            .leftJoinAndSelect('post.relatedPosts', 'relatedPosts') /*Lấy khóa ngoại*/

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

        qb.orderBy('post.created_at', 'DESC');

        const allPosts = await qb.getMany(); 

        const total = allPosts.length;
        const start = (page - 1) * limit;
        const paginatedPosts = allPosts.slice(start, start + limit);
        const data = plainToInstance(GetPostDto, paginatedPosts, {
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
        
    async findPostbyId(postId: string): Promise<GetPostDto>{
        const cached = await this.cacheManager.get<GetPostDto>('post');
        if(cached){
            return cached;
        }
        const existedPost = await this.postsRepository.findOne({
            where: { id: postId }
        });  
        const res = plainToInstance(GetPostDto, existedPost, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('post', res, 60);
        return res;
    }

    async deletePost(postId: string): Promise<GetPostDto>{
        const post = await this.postsRepository.findOne({ where: { id: postId } });  
        if (!post) {
            throw new NotFoundException(`User with ID ${postId} not found`);
        }
        const delete_post = await this.postsRepository.remove(post); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetPostDto, delete_post,{
            excludeExtraneousValues: true,
        })
        return res;
    }
    
}
