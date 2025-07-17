import { IsString, IsBoolean, IsArray, IsOptional, ValidateIf } from "@nestjs/class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
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

    @ApiProperty({required: false})
    @IsOptional() //đứng trước để test trước
    @IsString()
    banner: string; // Foreign key đến Files (file.id)

    @ApiProperty()
    @IsString()
    categoryId: string; // Foreign key đến Categories (categories.id)

    @ApiProperty()
    @IsOptional()
    @IsArray()
    relatedId?: string[];
}