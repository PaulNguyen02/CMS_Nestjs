import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePostDto {
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
    categoryId: string;
}