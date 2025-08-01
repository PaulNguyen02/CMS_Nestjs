import { IsString, IsArray, IsOptional} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreatePostDto {  
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()    
    summary: string;

    @ApiProperty()
    @IsOptional()
    @IsString()    
    content: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    bannerId?: string;

    @ApiProperty()
    @IsString()
    categoryId: string; 

    @ApiProperty()
    @IsOptional()
    @IsArray()
    relatedId?: string[];
}