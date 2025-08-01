import { IsString, IsOptional } from "@nestjs/class-validator";
export class CreateFileDto{
    @IsString()
    @IsOptional()
    originalName: string;
}