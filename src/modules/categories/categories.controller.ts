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
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from './dto/category-param.dto';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}
    @Post()
    async createCategory(@Body() dto: CreateCategoryDto): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const result = await this.categoryService.createCategory(dto);
            return ApiResponse.success<GetCategoryDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getPaginateCategory(@Query() query: CategoryParam) : Promise<ApiResponse<PaginationDto<GetCategoryDto>>>{
        try{
            const res = await this.categoryService.getPaginateCategory(query);
            return ApiResponse.success<PaginationDto<GetCategoryDto>>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() update: UpdateCategoryDto): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const res = await this.categoryService.updateCategory(id, update);
            return ApiResponse.success<GetCategoryDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get(':id')
    async findCategorybyId(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>> {
        try{
            const res = await this.categoryService.findCategorybyId(id); 
            return ApiResponse.success<GetCategoryDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const res = await this.categoryService.deleteCategory(id);
            return ApiResponse.success<GetCategoryDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
