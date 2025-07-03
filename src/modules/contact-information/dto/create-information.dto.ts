import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateInformationDto extends BaseDto{
    @ApiProperty()
    @IsString()
    key: string;


    @ApiProperty()
    @IsString()
    value: string;
} 