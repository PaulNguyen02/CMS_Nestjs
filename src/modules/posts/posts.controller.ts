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
@Controller('posts')
export class PostsController {
    constructor (private readonly postService: PostsService){}
    @Post('create')
    async create(@Body() dto: CreatePostDto): Promise<ApiResponse<GetPostDto>>{
        try{
            const result = await this.postService.create(dto);
            return ApiResponse.success<GetPostDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }

    @Get()
    async paginate(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) : Promise<ApiResponse<PaginationDto<GetPostDto>>>{
        try{
            const res = await this.postService.paginate(page,limit);
            return ApiResponse.success<PaginationDto<GetPostDto>>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string, 
        @Body() update: UpdatePostDto 
    ): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.update(id, update);
            return ApiResponse.success<GetPostDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.findOne(id);
            return ApiResponse.success<GetPostDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetPostDto>>{
        try{
            const res = await this.postService.delete(id);
            return ApiResponse.success<GetPostDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
