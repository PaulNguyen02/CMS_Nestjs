import { IsString} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BaseDto{
    @ApiProperty()
    @IsString()
    createdBy: string;
}