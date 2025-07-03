import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreatePartnerDto extends BaseDto{

    @ApiProperty()
    @IsString()    
    title: string;

    @ApiProperty()
    @IsString()    
    url: string;

    @ApiProperty()
    @IsString()    
    file_id: string;

}