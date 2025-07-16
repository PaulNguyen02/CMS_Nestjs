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
        let saved;
        const slug = slugString(dto.title)
        if(dto.relatedPosts){
            const relatedEntities = dto.relatedPosts.map(r =>
                this.postsRepository.create({
                title: r.title,
                summary: r.summary,
                content: r.content,
                isActive: r.isActived,
                banner: r.banner,
                slug: slug,
                categoryId: r.categoryId,
                createdBy: username,
                createdAt: new Date(),
                })
            ) || [];
            const newPost = this.postsRepository.create({
                title: dto.title,
                summary: dto.summary,
                content: dto.content,
                isActive: dto.isActived,
                banner: dto.banner,
                slug: slug,
                categoryId: dto.categoryId,
                createdBy: username,
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

    async updatePost (postId: string, dto: UpdatePostDto, username: string): Promise<GetPostDto>{             
        if(dto.title){
            const slug = slugString(dto.title)
            await this.postsRepository.update(postId, {
                ...dto,
                slug: slug,
                createdAt: new Date(),
                createdBy: username
            });
        }
        const updatedPost = await this.postsRepository.findOne({
            where: { id: postId }
        });
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
