import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMemberDto {
    @ApiProperty()
    @IsString()    
    fullName: string;
        
    @ApiProperty()
    @IsString()
    position: string;
}