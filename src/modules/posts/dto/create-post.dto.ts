import { IsString, IsBoolean, IsUUID, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreatePostDto extends BaseDto{

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
    banner: string; // Foreign key đến Files (file.id)

    @ApiProperty()
    @IsUUID()
    category_id: string; // Foreign key đến Categories (categories.id)
}