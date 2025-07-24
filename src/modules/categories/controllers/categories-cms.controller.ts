import { 
    Controller, 
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body
} from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { GetCategoryDto } from '../dto/response/get-category.dto';
import { CreateCategoryDto } from '../dto/request/create-category.dto';
import { UpdateCategoryDto } from '../dto/request/update-category.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from '../dto/request/category-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@Controller('categories')
export class CategoriesCMSController {
    constructor(private readonly categoryService: CategoriesService) {}
    
    @Get()
    async getPaginateCategory(@Query() query: CategoryParam
    ): Promise<ApiResponse<PaginationDto<GetCategoryDto>>>
    {
        const res = await this.categoryService.getPaginateCategory(query);
        return ApiResponse.success<PaginationDto<GetCategoryDto>>(res)
    }

    @Get('search')
    async searchCategory(@Query('query') search: string): Promise<ApiResponse<GetCategoryDto[]>>
    {
        const res = await this.categoryService.searchCategory(search);
        return ApiResponse.success<GetCategoryDto[]>(res);
    }

    @Post()
    async createCategory(
        @Body() dto: CreateCategoryDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetCategoryDto>>
    {
        const result = await this.categoryService.createCategory(dto, username);
        return ApiResponse.success<GetCategoryDto>(result);
    }
    
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

    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>>
    {
        const res = await this.categoryService.deleteCategory(id);
        return ApiResponse.success<GetCategoryDto>(res)
    }
}
