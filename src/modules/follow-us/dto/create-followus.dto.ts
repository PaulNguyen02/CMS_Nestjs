import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";

export class CreateFollowusDto extends BaseDto{   
    
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsString()
    fileId: string;

}