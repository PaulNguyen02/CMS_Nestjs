import { IsString, IsEmail, IsPhoneNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateMessageDto extends BaseDto{

    @ApiProperty()   
    @IsString()
    fullName: string;

    @ApiProperty()    
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()    
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    content: string;
}