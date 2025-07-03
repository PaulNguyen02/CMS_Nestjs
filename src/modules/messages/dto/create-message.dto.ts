import { IsString, IsEmail, IsPhoneNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateMessageDto extends BaseDto{

    @ApiProperty()   
    @IsString()
    fullname: string;

    @ApiProperty()    
    @IsPhoneNumber()
    phone_number: string;

    @ApiProperty()    
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    content: string;
}