import { IsString, IsUUID, IsOptional } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@/common/dto/base.dto";
export class CreateFileDto extends BaseDto{

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

    @ApiProperty()
    @IsString()
    original_name: string;

    @ApiProperty()
    @IsString()    
    url: string;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    member_id: string; 

}