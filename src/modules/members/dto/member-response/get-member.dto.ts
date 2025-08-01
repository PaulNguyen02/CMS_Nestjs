import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetFileDto } from "@/modules/files/dto/response/get-file.dto";
import { GetWorkingHistoryDto } from "../working-history-response/get-working-history.dto";
export class GetMemberDto extends GetBaseDto{   
    @Expose({ name: 'id' })
    id: string; 
    
    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'fullName' })
    fullName: string;

    @Expose({ name: 'position' })
    position: string;

    @Expose()
    @Type(() => GetFileDto)
    imageFile: GetFileDto;

    @Expose({ name: 'workingHistory' })
    @Type(() => GetWorkingHistoryDto )
    workingHistory: GetWorkingHistoryDto[];
}