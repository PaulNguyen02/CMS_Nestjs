import { IsString, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateMenuItemDto extends BaseDto{

    @ApiProperty()
    @IsString()
    slug: string;
    
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    groupId: string; 

}