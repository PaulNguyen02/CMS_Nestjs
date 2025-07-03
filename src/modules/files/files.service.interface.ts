import { GetFileDto } from "./dto/get-file.dto";
import { CreateFileDto } from "./dto/create-file.dto";
export interface IFilesService{
    uploadFile(file: CreateFileDto): Promise<GetFileDto>;
}