import { Expose, Type } from "class-transformer";
import { GetMemberDto } from "@/modules/members/dto/get-member.dto";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetFileDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'original_name' })
    original_name: string;

    @Expose({ name: 'url' })
    url: string;

    @Expose({ name: 'member_id' })
    member_id: string; 
    
    @Expose()
    @Type(() => GetMemberDto) // <-- ánh xạ nested object
    member: GetMemberDto;
}