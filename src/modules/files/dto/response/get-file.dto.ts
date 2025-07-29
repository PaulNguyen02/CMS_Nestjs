import { Expose, Type } from "class-transformer";
import { GetMemberDto } from "@/modules/members/dto/member-response/get-member.dto";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetFileDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'original_name' })
    originalName: string;

    @Expose({ name: 'url' })
    url: string;

    @Expose({ name: 'member_id' })
    memberId: string; 
}