import { IsString, IsBoolean } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateMenuGroupDto{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsBoolean()
    isFooter: boolean; 

}