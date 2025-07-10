import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateWorkingHistoryDto{
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    categories: string;

}