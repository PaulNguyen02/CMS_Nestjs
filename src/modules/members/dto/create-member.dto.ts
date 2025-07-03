import { IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";

export class CreateMemberDto extends BaseDto{   
    @ApiProperty()
    @IsString()
    slug: string;
    
    @ApiProperty()
    @IsString()    
    fullname: string;
    
    @ApiProperty()
    @IsString()
    position: string;

}