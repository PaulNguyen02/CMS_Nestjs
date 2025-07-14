import { 
    Controller, 
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    Version,
    UseGuards
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from './dto/category-param.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Version('1')
    @Post()
    async createCategory(
        @Body() dto: CreateCategoryDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetCategoryDto>>
    {
        const result = await this.categoryService.createCategory(dto, username);
        return ApiResponse.success<GetCategoryDto>(result);
    }

    @Version('1')
    @Get()
    @Public()
    async getPaginateCategory(@Query() query: CategoryParam
    ): Promise<ApiResponse<PaginationDto<GetCategoryDto>>>
    {
        const res = await this.categoryService.getPaginateCategory(query);
        return ApiResponse.success<PaginationDto<GetCategoryDto>>(res)
    }

    @Version('1')
    @Put(':id')
    async updateCategory(
        @Param('id') id: string, 
        @Body() update: UpdateCategoryDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetCategoryDto>>
    {
        const res = await this.categoryService.updateCategory(id, update, username);
        return ApiResponse.success<GetCategoryDto>(res)
    }

    @Version('1')
    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>>
    {
        const res = await this.categoryService.deleteCategory(id);
        return ApiResponse.success<GetCategoryDto>(res)
    }
}
