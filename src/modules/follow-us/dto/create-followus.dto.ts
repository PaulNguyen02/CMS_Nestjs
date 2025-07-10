import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFollowusDto{   
    
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