import { 
    Controller, 
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    DefaultValuePipe,
    ParseIntPipe 
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}
    @Post('create')
    async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const result = await this.categoryService.create(dto);
            return ApiResponse.success<GetCategoryDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }

    @Get('all')
    async get(): Promise<ApiResponse<GetCategoryDto[]>>{
        try{
            const res = await this.categoryService.get();
            return ApiResponse.success<GetCategoryDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Get()
        async paginate(
            @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
            @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        ) : Promise<ApiResponse<PaginationDto<GetCategoryDto>>>{
        try{
            const res = await this.categoryService.paginate(page,limit);
            return ApiResponse.success<PaginationDto<GetCategoryDto>>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() update: UpdateCategoryDto): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const res = await this.categoryService.update(id, update);
            return ApiResponse.success<GetCategoryDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>> {
        try{
            const res = await this.categoryService.findOne(id); 
            return ApiResponse.success<GetCategoryDto>(res)
        }catch(error){
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetCategoryDto>>{
        try{
            const res = await this.categoryService.delete(id);
            return ApiResponse.success<GetCategoryDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
