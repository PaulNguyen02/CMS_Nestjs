import { 
    Controller, 
    Get,
    Query,
    UseGuards
 } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { GetPostDto } from '../dto/get-post.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PostParam } from '../dto/post-param.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'posts', version: '2'})
export class PostsV2Controller {
    constructor (private readonly postService: PostsService){}
    @Public()
    @Get()
    async getPaginatePost(@Query() query: PostParam): Promise<ApiResponse<PaginationDto<GetPostDto>>>{
        const res = await this.postService.getPaginatePost(query);
        return ApiResponse.success<PaginationDto<GetPostDto>>(res)
    }

    @Public()
    @Get('get-some')
    async getSomePosts(): Promise<ApiResponse<GetPostDto[]>>{
        const res = await this.postService.getSomePosts()
        return ApiResponse.success<GetPostDto[]>(res)
    }

}
