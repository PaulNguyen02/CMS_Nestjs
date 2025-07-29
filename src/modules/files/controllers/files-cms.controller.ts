import { 
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Query,
    UseInterceptors,
    UploadedFile,
    Body
} from '@nestjs/common';
import { Express } from 'express';
import { FilesService } from '../files.service';
import { ApiConsumes, ApiBody} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetFileDto } from '../dto/response/get-file.dto';
import { FileParam } from '../dto/request/file-param.dto';
import { CreateFileDto } from '../dto/request/create-file.dto';
import { uploadOption } from '@/common/const/upload-options.const';
import { ApiResponse } from '@/common/response/api-response';
import { uploadBody } from '@/common/const/upload-body.const';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Controller('files')
export class FilesCMSController {
    constructor(private readonly fileService: FilesService) {}

    @Get()
    async getPaginateFiles(@Query() query: FileParam): Promise<ApiResponse<PaginationDto<GetFileDto>>>
    {
        const res = await this.fileService.getPaginateFiles(query);
        return ApiResponse.success<PaginationDto<GetFileDto>>(res)
    }

    @Get('search')
    async searchFile(@Query('query') search: string): Promise<ApiResponse<GetFileDto[]>>
    {
        const res = await this.fileService.searchFile(search);
        return ApiResponse.success<GetFileDto[]>(res);
    }

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

    @Delete(':id')
    async deleteFile(@Param('id') id: string): Promise<ApiResponse<any>> {
        await this.fileService.deleteFile(id);
        return ApiResponse.success('File deleted successfully');
    }
}
