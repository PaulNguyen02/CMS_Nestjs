import { GetCategoryDto } from './dto/get-category.dto';
import { PaginationDto } from "@/common/dto/pagination.dto";
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export interface ICategoriesService {
    create(dto: CreateCategoryDto): Promise<GetCategoryDto>;
    update (category_id: string, dto: UpdateCategoryDto): Promise<GetCategoryDto>
    get(): Promise<GetCategoryDto[]>
    findOne(category_id: string): Promise<GetCategoryDto>
    delete(category_id: string): Promise<GetCategoryDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetCategoryDto>>
}