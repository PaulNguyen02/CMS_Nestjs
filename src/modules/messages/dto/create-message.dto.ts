import { IsString, IsEmail} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateMessageDto{

    @ApiProperty()   
    @IsString()
    fullName: string;

    @ApiProperty()    
    @IsString()
    phoneNumber: string;

    @ApiProperty()    
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    content: string;
}