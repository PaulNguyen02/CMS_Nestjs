import { Type } from "class-transformer";
import { ValidateNested } from "@nestjs/class-validator";
import { IsString, IsArray } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateWorkingHistoryDto } from "@/modules/working-history/dto/create-workinghistory.dto";
export class CreateMemberDto{   
    
    @ApiProperty()
    @IsString()    
    fullName: string;
    
    @ApiProperty()
    @IsString()
    position: string;

    @ApiProperty({ type: [CreateWorkingHistoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkingHistoryDto)
    workingHistory: CreateWorkingHistoryDto[];
}