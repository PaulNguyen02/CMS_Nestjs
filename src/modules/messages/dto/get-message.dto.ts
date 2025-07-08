import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetMessageDto extends GetBaseDto {
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'fullname' })
    fullName: string;

    @Expose({ name: 'phoneNumber' })
    phoneNumber: string;

    @Expose({ name: 'email' })
    email: string;

    @Expose({ name: 'content' })
    content: string;
}