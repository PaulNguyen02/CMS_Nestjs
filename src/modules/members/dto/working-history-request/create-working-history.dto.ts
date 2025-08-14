import { IsString, IsBoolean} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateWorkingHistoryDto{
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'True là dự án, False là kinh nghiệm'
    })
    @IsBoolean()
    categories: boolean; 

}