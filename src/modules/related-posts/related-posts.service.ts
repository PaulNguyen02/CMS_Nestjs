import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { relatedPosts } from './entities/related-posts.entity';
import { GetRelatedPostDto } from './dto/get-related-post.dto';
import { CreateRelatedPostDto } from './dto/create-related-post.dto';
import { IRelatedPostService } from './related-post.service.interface';

@Injectable()
export class RelatedPostsService implements IRelatedPostService {
    constructor(
        @InjectRepository(relatedPosts)
        private readonly related_postsRepository: Repository<relatedPosts>
    ) {}
    async create(dto: CreateRelatedPostDto): Promise<GetRelatedPostDto>{
        const new_related_post = await this.related_postsRepository.create({
            post_id: dto.postId,
            related_id: dto.related_id,
            created_at: dto.created_at,
            created_by: dto.created_by
        });
        const saved = await this.related_postsRepository.save(new_related_post);
        const res = plainToInstance(GetRelatedPostDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }
}
