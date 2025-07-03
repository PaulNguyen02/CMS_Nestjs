import { GetPostDto } from "./dto/get-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PaginationDto } from "@/common/dto/pagination.dto";
export interface IPostsService{
    create(dto: CreatePostDto): Promise<GetPostDto>;
    update (post_id: string, dto: UpdatePostDto): Promise<GetPostDto>
    findOne(post_id: string): Promise<GetPostDto>
    delete(post_id: string): Promise<GetPostDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetPostDto>>
} 