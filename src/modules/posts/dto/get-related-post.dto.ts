import { Expose, Type } from "class-transformer";
import { GetFileDto } from "@/modules/files/dto/get-file.dto";
export class GetRelatedPostDto {
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

    @Expose({ name: 'banners' })
    @Type(() => GetFileDto) 
    banner: GetFileDto;
}