import { 
    Controller, 
    Get,
    Query,
    Param
 } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { GetPostDto } from '../dto/response/get-post.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from '../dto/request/post-param.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('posts')
export class PostsClientController {
    constructor (private readonly postService: PostsService){}

    @Public()
    @Get()
    async getPaginatePost(@Query() query: PostParam): Promise<ApiResponse<PaginationDto<GetPostDto>>>{
        const res = await this.postService.getPaginatePost(query);
        return ApiResponse.success<PaginationDto<GetPostDto>>(res)
    }    
    
    @Public()
    @Get(':slug')
    async getDetailPost(@Param('slug') slug: string): Promise<ApiResponse<GetPostDto>>{
        const res = await this.postService.getDetailPostBySlug(slug)
        return ApiResponse.success<GetPostDto>(res)
    }

}
