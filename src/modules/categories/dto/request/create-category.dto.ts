import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateCategoryDto{
    @ApiProperty()
    @IsString()
    name: string;
} 