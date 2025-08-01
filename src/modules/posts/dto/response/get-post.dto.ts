import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetFileDto } from "@/modules/files/dto/response/get-file.dto";
import { GetRelatedPostDto } from "./get-related-post.dto";
export class GetPostDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'summary' })
    summary: string;

    @Expose({ name: 'content' })
    content: string;

    @Expose()
    @Type(() => GetFileDto)
    bannerFile: GetFileDto;

    @Expose({name: 'relatedPosts'})
    @Type(() => GetRelatedPostDto)
    relatedPosts: GetRelatedPostDto[];
}