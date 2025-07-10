import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateInformationDto{
    @ApiProperty()
    @IsString()
    key: string;


    @ApiProperty()
    @IsString()
    value: string;
} 