import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetFileDto } from "@/modules/files/dto/get-file.dto";
import { GetWorkingHistoryDto } from "./get-workinghistory.dto";
export class GetMemberDto extends GetBaseDto{   
    @Expose({ name: 'id' })
    id: string; 
    
    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'fullname' })
    fullname: string;

    @Expose({ name: 'position' })
    position: string;

    @Expose({ name: 'files' })
    @Type(() => GetFileDto )
    files: GetFileDto[];

    @Expose({ name: 'workingHistory' })
    @Type(() => GetWorkingHistoryDto )
    workingHistory: GetWorkingHistoryDto[];
}