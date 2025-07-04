import { IsString, IsBoolean, IsUUID, IsArray, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateRelatedPostDto extends BaseDto{

    @ApiProperty()
    @IsString()
    slug: string;
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()    
    summary: string;

    @ApiProperty()
    @IsString()    
    content: string;

    @ApiProperty()
    @IsBoolean()
    is_actived: boolean;

    @ApiProperty()
    @IsUUID()
    banner: string; 

    @ApiProperty()
    @IsUUID()
    category_id: string; 

}