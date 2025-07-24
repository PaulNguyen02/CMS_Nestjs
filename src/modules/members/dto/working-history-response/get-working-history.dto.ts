import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetMemberDto } from "../member-response/get-member.dto";
export class GetWorkingHistoryDto extends GetBaseDto{    
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'description' })
    description: string;

    @Expose({ name: 'categories' })
    categories: string;

}