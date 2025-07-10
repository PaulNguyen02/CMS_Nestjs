import { IsString, IsBoolean, IsArray, IsOptional, ValidateNested } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateRelatedPostDto } from "./create-related-post.dto";
export class CreatePostDto {
    
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
    isActived: boolean;

    @ApiProperty()
    @IsString()
    banner: string; // Foreign key đến Files (file.id)

    @ApiProperty()
    @IsString()
    categoryId: string; // Foreign key đến Categories (categories.id)

    @ApiProperty({ type: [CreateRelatedPostDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRelatedPostDto)
    relatedPosts?: CreateRelatedPostDto[];

}