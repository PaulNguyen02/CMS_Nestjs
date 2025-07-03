import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetFileDto } from "@/modules/files/dto/get-file.dto";
import { GetWorkingHistoryDto } from "@/modules/working-history/dto/get-workinghistory.dto";
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

    @Expose({ name: 'working_history' })
    @Type(() => GetWorkingHistoryDto )
    working_history: GetWorkingHistoryDto[];
}