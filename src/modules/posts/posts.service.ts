import { 
    BadRequestException,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { Repository, DataSource} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Posts } from './entities/posts.entity';
import { GetPostDto } from './dto/response/get-post.dto';
import { CreatePostDto } from './dto/request/create-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto'; 
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from './dto/request/post-param.dto';
import { PostsException } from './enums/posts-exception';
import { Category } from './enums/category';
@Injectable()
export class PostsService{
    constructor(   
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
        private readonly dataSource: DataSource
    ) {}

    async getPaginatePost(query: PostParam): Promise<PaginationDto<GetPostDto>>{
        const { page = 1, limit = 10, search, category } = query;
        const qb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.banner', 'banner')
        if (search) {
            qb.andWhere(
                `post.title LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        if (category) {
            qb.andWhere(
                `post.category LIKE N'%' + :category + '%'`,
                { category },
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

    async searchPost(search: string): Promise<GetPostDto[]> {
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.banner', 'banner')   
        if (search && search.trim() !== '') {
            qb.where('post.id LIKE :id', { id: `%${search}%` })
            .orWhere(`post.title LIKE N'%' + :search + '%'`, { search });
        }             
        const data = await qb.getMany();       
        const res = plainToInstance(GetPostDto, data, {
            excludeExtraneousValues: true,
        });    
        return res;
    }


    async getDetailPost(id: string): Promise<GetPostDto> {
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.banner', 'banner')
            .where('post.id = :id', { id });      
        const item = await qb.getOne();
        
        if (!item) {
            throw new NotFoundException(PostsException.POST_NOT_FOUND);
        }

        const relatedPostsQb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.banner', 'banner')
        .where('post.category = :category', { category: item.category })
        .andWhere('post.id != :currentId', { currentId: id })
        .orderBy('post.createdAt', 'DESC')
        .limit(5);
    
        const relatedPosts = await relatedPostsQb.getMany();
        const { id: bannerId, url } = item.banner;
        const data = new GetPostDto()
        data.id = item.id;
        data.title = item.title;
        data.slug = item.slug;
        data.summary = item.summary;
        data.content = item.content;
        data.category = item.category;
        data.banner = { id: bannerId, url };
        data.createdAt = item.createdAt;
        data.createdBy = item.createdBy;
        const relatedPost = plainToInstance(GetPostDto, relatedPosts, {
            excludeExtraneousValues: true,
        });
        data.relatedPosts = relatedPost;
        return data;
    }

    async getDetailPostBySlug(slug: string): Promise<GetPostDto>{
        const qb = this.postsRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.banner', 'banner')
            .where('post.slug = :slug', { slug });
        const item = await qb.getOne();
        
        if (!item) {
            throw new NotFoundException(PostsException.POST_NOT_FOUND);
        }

        const relatedPostsQb = this.postsRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.banner', 'banner')
        .where('post.category = :category', { category: item.category })
        .andWhere('post.slug != :currentSlug', { currentSlug: slug })
        .orderBy('post.createdAt', 'DESC')
        .limit(5);
    
        const relatedPosts = await relatedPostsQb.getMany();
        const { id: bannerId, url } = item.banner;
        const data = new GetPostDto()
        data.id = item.id;
        data.title = item.title;
        data.slug = item.slug;
        data.summary = item.summary;
        data.content = item.content;
        data.category = item.category;
        data.banner = { id: bannerId, url };
        data.createdAt = item.createdAt;
        data.createdBy = item.createdBy;
        const relatedPost = plainToInstance(GetPostDto, relatedPosts, {
            excludeExtraneousValues: true,
        });
        data.relatedPosts = relatedPost;
        return data;
    }



    async createPost(dto: CreatePostDto, username: string): Promise<GetPostDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const postRepo = queryRunner.manager.getRepository(Posts);
            const slug = slugString(dto.title);
            const existingSlug = await this.postsRepository.findOne({where: {slug}})

            if(existingSlug){
                throw new BadRequestException(PostsException.SLUG_ALREADY_EXIST)
            }
            const bannerId = dto.bannerId;
            const existingBanner = await this.postsRepository.findOne({
                where: { bannerId }
            });
            if (existingBanner) {
                throw new BadRequestException(PostsException.BANNER_ALREADY_EXIST)
            }
            const category = dto.category ? Category.SERVICE : Category.PROJECT;

            const newPost = postRepo.create({
                title: dto.title,
                summary: dto.summary,
                content: dto.content,
                slug: slug,
                category: category,
                bannerId: bannerId,
                createdBy: username,
                createdAt: new Date(),
            });
            const saved = await postRepo.save(newPost);
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
                where: { id: postId }
            });

            if (!updatedPost) {
                throw new NotFoundException(PostsException.POST_NOT_FOUND);
            }

            if (dto.title) {
                updatedPost.title = dto.title;
                updatedPost.slug = slugString(dto.title);
            }
            if (dto.summary) updatedPost.summary = dto.summary;
            if (dto.content) updatedPost.content = dto.content;
            if (dto.category !== undefined) {
                updatedPost.category = dto.category ? Category.SERVICE : Category.PROJECT;
            }
            if(dto.bannerId){
                updatedPost.bannerId = dto.bannerId;
            }
            updatedPost.createdBy = username;
            updatedPost.createdAt = new Date();
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
        const post = await this.postsRepository.findOne({
            where: { id: postId }
        });

        if (!post) {
            throw new NotFoundException(PostsException.POST_NOT_FOUND);
        }
        // Xóa bài viết
        const deletedPost = await this.postsRepository.remove(post); 
        // Chuyển đối tượng xóa sang DTO
        const res = plainToInstance(GetPostDto, deletedPost, {
        excludeExtraneousValues: true,
        });
        return res;
    }
}
