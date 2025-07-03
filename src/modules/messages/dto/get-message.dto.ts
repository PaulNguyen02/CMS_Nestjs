import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetMessageDto extends GetBaseDto {
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'fullname' })
    fullname: string;

    @Expose({ name: 'phone_number' })
    phone_number: string;

    @Expose({ name: 'email' })
    email: string;

    @Expose({ name: 'content' })
    content: string;
}