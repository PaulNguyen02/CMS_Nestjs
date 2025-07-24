import { IsString, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateFileDto{

    @IsString()
    @IsOptional()
    originalName: string;

    @ApiProperty({required: false})
    @IsOptional()       //cho nó đứng trc để tránh validation
    @IsString()
    memberId: string; 

}