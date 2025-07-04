import { Type } from "class-transformer";
import { ValidateNested } from "@nestjs/class-validator";
import { IsString, IsArray } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
import { CreateWorkingHistoryDto } from "@/modules/working-history/dto/create-workinghistory.dto";
export class CreateMemberDto extends BaseDto{   
    @ApiProperty()
    @IsString()
    slug: string;
    
    @ApiProperty()
    @IsString()    
    fullname: string;
    
    @ApiProperty()
    @IsString()
    position: string;

    @ApiProperty({ type: [CreateWorkingHistoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkingHistoryDto)
    working_history: CreateWorkingHistoryDto[];
}