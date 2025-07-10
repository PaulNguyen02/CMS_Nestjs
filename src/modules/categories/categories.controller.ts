import { 
    Controller, 
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    UseGuards, 
    HttpStatus,
    BadRequestException
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from './dto/category-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}
    @Post()
    async createCategory(
        @Body() dto: CreateCategoryDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetCategoryDto>>{
        const result = await this.categoryService.createCategory(dto, username);
        return ApiResponse.success<GetCategoryDto>(result);
    }

    @Get()
    async getPaginateCategory(@Query() query: CategoryParam) : Promise<ApiResponse<PaginationDto<GetCategoryDto>>>{
        const res = await this.categoryService.getPaginateCategory(query);
        return ApiResponse.success<PaginationDto<GetCategoryDto>>(res)
    }

    @Put(':id')
    async updateCategory(
        @Param('id') id: string, 
        @Body() update: UpdateCategoryDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetCategoryDto>>{
        const res = await this.categoryService.updateCategory(id, update, username);
        return ApiResponse.success<GetCategoryDto>(res)
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>>{
        const res = await this.categoryService.deleteCategory(id);
        return ApiResponse.success<GetCategoryDto>(res)
    }
}
