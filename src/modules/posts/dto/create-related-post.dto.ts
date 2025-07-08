import { IsString, IsBoolean} from "@nestjs/class-validator";
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
    isActived: boolean;

    @ApiProperty()
    @IsString()
    banner: string; 

    @ApiProperty()
    @IsString()
    categoryId: string; 

}