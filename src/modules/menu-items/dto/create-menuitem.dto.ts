import { IsString, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateMenuItemDto{
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    groupId: string; 

}