import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class PartnerParam{
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

}