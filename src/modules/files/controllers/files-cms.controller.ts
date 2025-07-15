import { 
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from '../files.service';
import { ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetFileDto } from '../dto/get-file.dto';
import { CreateFileDto } from '../dto/create-file.dto';
import { uploadOption } from '@/common/const/upload-options.const';
import { ApiResponse } from '@/common/response/api-response';
import { uploadBody } from '@/common/const/upload-body.const';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('files')
export class FilesCMSController {
    constructor(private readonly fileService: FilesService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody(uploadBody) // mô tả Swagger
    @UseInterceptors(FileInterceptor('file', uploadOption))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileInfo: CreateFileDto,
        @GetUser('username') username: string,
    ): Promise<ApiResponse<GetFileDto>> {
        fileInfo.originalName = file.originalname;
        const result = await this.fileService.uploadFile(fileInfo, username);
        return ApiResponse.success(result);
    }
}
