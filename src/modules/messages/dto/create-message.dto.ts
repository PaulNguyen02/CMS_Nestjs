import { IsString, IsEmail, IsPhoneNumber } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateMessageDto{

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