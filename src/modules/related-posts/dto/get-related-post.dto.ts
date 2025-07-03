import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetPostDto } from "@/modules/posts/dto/get-post.dto";
export class GetRelatedPostDto extends GetBaseDto{

    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'postId' })
    postId: string; 

    @Expose({ name: 'related_id' })
    related_id: string;

    @Expose()
    @Type(() => GetPostDto)
    post: GetPostDto;
    
    @Expose()
    @Type(() => GetPostDto)
    related: GetPostDto;
}