import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateCategoryDto extends BaseDto{
    @ApiProperty()
    @IsString()
    name: string;


    @ApiProperty()
    @IsString()
    slug: string;
} 