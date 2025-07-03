import { IsString, IsUUID} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateWorkingHistoryDto extends BaseDto{
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    categories: string;

    @ApiProperty()
    @IsUUID()
    memberId: string; 

}