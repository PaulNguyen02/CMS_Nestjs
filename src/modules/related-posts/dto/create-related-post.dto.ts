import { IsUUID } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateRelatedPostDto extends BaseDto{
    @ApiProperty()
    @IsUUID()
    postId: string; 

    @ApiProperty()
    @IsUUID()
    related_id: string;

}