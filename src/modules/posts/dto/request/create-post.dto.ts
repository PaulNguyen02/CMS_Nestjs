import { IsString, IsOptional} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
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

    @ApiProperty({
        description: 'True là service, False là project'
    })
    @IsBoolean()
    category: boolean; 

    @ApiProperty()
    @IsString()
    bannerId: string;
}