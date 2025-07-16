import { IsString, IsDate } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserLoginDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

}