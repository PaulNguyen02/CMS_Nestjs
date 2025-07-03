import { 
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetFileDto } from './dto/get-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { uploadOption } from '@/common/const/upload-options';
import { ApiResponse } from '@/common/response/api-response';
import { uploadBody } from '@/common/const/upload-body.const';
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post('file-upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody(uploadBody)
    @UseInterceptors(FileInterceptor('file', uploadOption))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File, 
        @Body() file_info: CreateFileDto
    ): Promise<ApiResponse<GetFileDto>> {
        try{
            const originalName = file.originalname;
            file_info.original_name = originalName;
            const result = await this.fileService.uploadFile(file_info);
            return ApiResponse.success<GetFileDto>(result);
        }catch(err){
            return ApiResponse.error();
        }        
    }
}
