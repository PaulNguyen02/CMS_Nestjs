import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetFileDto } from "@/modules/files/dto/get-file.dto";
export class GetPartnerDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'url' })
    url: string;

    @Expose({ name: 'file' })
    @Type(() => GetFileDto)
    file: GetFileDto;
}