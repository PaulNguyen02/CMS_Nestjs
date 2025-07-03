import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { RelatedPostsService } from './related-posts.service';
import { GetRelatedPostDto } from './dto/get-related-post.dto';
import { CreateRelatedPostDto } from './dto/create-related-post.dto';
@Controller('related-posts')
export class RelatedPostsController {
    constructor (private readonly related_postService: RelatedPostsService){}
    @Post('create')
    async create(@Body() dto: CreateRelatedPostDto): Promise<ApiResponse<GetRelatedPostDto>>{
        try{
            const result = await this.related_postService.create(dto);
            return ApiResponse.success<GetRelatedPostDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }
}
