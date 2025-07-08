import { 
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from './files.service';
import { ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetFileDto } from './dto/get-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { uploadOption } from '@/common/const/upload-options.const';
import { ApiResponse } from '@/common/response/api-response';
import { uploadBody } from '@/common/const/upload-body.const';
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody(uploadBody)
    @UseInterceptors(FileInterceptor('file', uploadOption))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File, 
        @Body() fileInfo: CreateFileDto
    ): Promise<ApiResponse<GetFileDto>> {
        try{
            const originalName = file.originalname;
            fileInfo.originalName = originalName;
            const result = await this.fileService.uploadFile(fileInfo);
            return ApiResponse.success<GetFileDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }        
    }
}
