import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
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

    @Expose({name: 'category'})
    category: string;  

    @Expose({name: 'relatedPosts'})
    relatedPosts: GetPostDto[];

}