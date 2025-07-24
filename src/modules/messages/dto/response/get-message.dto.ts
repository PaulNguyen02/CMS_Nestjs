import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetMessageDto extends GetBaseDto {
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'full_name' })
    fullName: string;

    @Expose({ name: 'phone_number' })
    phoneNumber: string;

    @Expose({ name: 'email' })
    email: string;

    @Expose({ name: 'content' })
    content: string;
}