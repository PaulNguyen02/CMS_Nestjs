import { 
    Inject,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Posts } from './entities/posts.entity';
import { GetPostDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto'; 
import { PaginationDto } from '@/common/dto/pagination.dto';
@Injectable()
export class PostsService{
    constructor(   
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async create(dto: CreatePostDto): Promise<GetPostDto>{
        const relatedEntities = dto.related_posts?.map(r =>
            this.postsRepository.create({
            title: r.title,
            slug: r.slug,
            summary: r.summary,
            content: r.content,
            is_active: r.is_actived,
            banner: r.banner,
            category_id: r.category_id,
            created_by: r.created_by,
            created_at: new Date(),
            })
        ) || [];

        const new_post = this.postsRepository.create({
            title: dto.title,
            slug: dto.slug,
            summary: dto.summary,
            content: dto.content,
            is_active: dto.is_actived,
            banner: dto.banner,
            category_id: dto.category_id,
            created_by: dto.created_by,
            created_at: new Date(),
            related_posts: relatedEntities,
        });

        const saved = await this.postsRepository.save(new_post);

        const res = plainToInstance(GetPostDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (post_id: string, dto: UpdatePostDto): Promise<GetPostDto>{             
        const existedPost = await this.postsRepository.findOne({
            where: { id: post_id }
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

    
    async paginate(page: number, limit: number): Promise<PaginationDto<GetPostDto>>{
        const cached = await this.cacheManager.get<PaginationDto<GetPostDto>>('posts');
        if(cached){
            return cached;
        }
        const [posts, total] = await this.postsRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations:[
                'banners',
                'related_posts',
                'related_posts.banners',
            ],
            order: { created_at: 'DESC' }, // nếu có field createdAt
        });

        const data = plainToInstance(GetPostDto, posts, {
            excludeExtraneousValues: true,
        });

        const res = new PaginationDto<GetPostDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        await this.cacheManager.set('posts', res, 60);
        return res;
    }

    async findOne(post_id: string): Promise<GetPostDto>{
        const cached = await this.cacheManager.get<GetPostDto>('post');
        if(cached){
            return cached;
        }
        const existedPost = await this.postsRepository.findOne({
            where: { id: post_id }
        });  
        const res = plainToInstance(GetPostDto, existedPost, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('post', res, 60);
        return res;
    }

    async delete(post_id: string): Promise<GetPostDto>{
        const post = await this.postsRepository.findOne({ where: { id: post_id } });  
        if (!post) {
            throw new NotFoundException(`User with ID ${post_id} not found`);
        }
        const delete_post = await this.postsRepository.remove(post); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetPostDto, delete_post,{
            excludeExtraneousValues: true,
        })
        return res;
    }
    
}
