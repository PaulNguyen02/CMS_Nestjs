import { IsString, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateFileDto{

    @IsString()
    @IsOptional()
    originalName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    memberId: string; 

}