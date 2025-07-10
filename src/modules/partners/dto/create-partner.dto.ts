import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreatePartnerDto{

    @ApiProperty()
    @IsString()    
    title: string;

    @ApiProperty()
    @IsString()    
    url: string;

    @ApiProperty()
    @IsString()    
    fileId: string;

}