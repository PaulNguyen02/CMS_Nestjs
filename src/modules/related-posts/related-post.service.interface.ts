import { GetRelatedPostDto } from "./dto/get-related-post.dto";
import { CreateRelatedPostDto } from "./dto/create-related-post.dto";
export interface IRelatedPostService{
    create(dto: CreateRelatedPostDto): Promise<GetRelatedPostDto>;
}