import { 
    Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body
 } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { GetPostDto } from '../dto/get-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from '../dto/post-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('posts')
export class PostsCMSController {
    constructor (private readonly postService: PostsService){}
    @Post()
    async createPost(
        @Body() dto: CreatePostDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetPostDto>>{
        const result = await this.postService.createPost(dto, username);
        return ApiResponse.success<GetPostDto>(result);
    }

    @Get()
    async getPaginatePost(@Query() query: PostParam): Promise<ApiResponse<PaginationDto<GetPostDto>>>{
        const res = await this.postService.getPaginatePost(query);
        return ApiResponse.success<PaginationDto<GetPostDto>>(res)
    }

    @Get(':slug')
    async getDetailPost(@Param('slug') slug: string): Promise<ApiResponse<GetPostDto>>{
        const res = await this.postService.getDetailPost(slug);
        return ApiResponse.success<GetPostDto>(res)
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: string, 
        @Body() update: UpdatePostDto,
        @GetUser('username') username: string 
    ): Promise<ApiResponse<GetPostDto>>{
        const res = await this.postService.updatePost(id, update, username);
        return ApiResponse.success<GetPostDto>(res)
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<ApiResponse<GetPostDto>>{
        const res = await this.postService.deletePost(id);
        return ApiResponse.success<GetPostDto>(res)
    }
}
