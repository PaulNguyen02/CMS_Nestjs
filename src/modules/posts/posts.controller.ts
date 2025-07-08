import { 
    Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    ParseIntPipe,
    DefaultValuePipe
 } from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostDto } from './dto/get-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from './dto/post-param.dto';
@Controller('posts')
export class PostsController {
    constructor (private readonly postService: PostsService){}
    @Post()
    async createPost(@Body() dto: CreatePostDto): Promise<ApiResponse<GetPostDto>>{
        try{
            const result = await this.postService.createPost(dto);
            return ApiResponse.success<GetPostDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getPaginatePost(@Query() query: PostParam): Promise<ApiResponse<PaginationDto<GetPostDto>>>{
        try{
            const res = await this.postService.getPaginatePost(query);
            return ApiResponse.success<PaginationDto<GetPostDto>>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: string, 
        @Body() update: UpdatePostDto 
    ): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.updatePost(id, update);
            return ApiResponse.success<GetPostDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get(':id')
    async findPostbyId(@Param('id') id: string): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.findPostbyId(id);
            return ApiResponse.success<GetPostDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.deletePost(id);
            return ApiResponse.success<GetPostDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
