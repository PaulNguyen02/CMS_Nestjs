import { IsString, IsDate } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
export class BaseDto{
    @ApiProperty()
    @IsDate()
    @Expose({ name: 'created_at' })
    created_at: Date;

    @ApiProperty()
    @IsString()
    @Expose({ name: 'created_by' })
    created_by: string;
}