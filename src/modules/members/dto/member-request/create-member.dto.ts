import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "@nestjs/class-validator";
import { IsString, IsArray } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateWorkingHistoryDto } from "../working-history-request/create-working-history.dto";
export class CreateMemberDto{   
    
    @ApiProperty()
    @IsString()    
    fullName: string;
    
    @ApiProperty()
    @IsString()
    position: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    imageId?: string;

    @ApiProperty({ type: [CreateWorkingHistoryDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkingHistoryDto)
    workingHistory: CreateWorkingHistoryDto[];
}