import { 
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Categories } from './entities/categories.entity';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from './dto/category-param.dto';
@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) {}
    async createCategory(dto: CreateCategoryDto): Promise<GetCategoryDto>{
        const newCategory = await this.categoryRepository.create({
            name: dto.name,
            slug: dto.slug,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.categoryRepository.save(newCategory);
        const res = plainToInstance(GetCategoryDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateCategory (categoryId: string, dto: UpdateCategoryDto): Promise<GetCategoryDto>{
         
        const existedCategory = await this.categoryRepository.findOne({
            where: { id: categoryId }
        });       
        if (!existedCategory) {
            throw new NotFoundException('Category not found');
        }
        const newCategory = plainToInstance(Categories, dto);
        const update = this.categoryRepository.merge(existedCategory,newCategory);
        const savedCategory = await this.categoryRepository.save(update);
        const res = plainToInstance(GetCategoryDto, savedCategory, {
            excludeExtraneousValues: true,
        });

        return res;
    }

    async getPaginateCategory(query: CategoryParam): Promise<PaginationDto<GetCategoryDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.categoryRepository
            .createQueryBuilder('category');

        if (search) {
            qb.andWhere(
                'category.name LIKE :search',
                { search: `%${search}%` },
            );
        }

        qb.orderBy('category.created_at', 'DESC');

        const allCategories = await qb.getMany(); 

        const total = allCategories.length;
        const start = (page - 1) * limit;
        const paginatedCategories = allCategories.slice(start, start + limit);
        const data = plainToInstance(GetCategoryDto, paginatedCategories, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetCategoryDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;         
    }

    async findCategorybyId(categoryId: string): Promise<GetCategoryDto>{
        const existedCategory = await this.categoryRepository.findOne({
            where: { id: categoryId }
        });  
        const res = plainToInstance(GetCategoryDto, existedCategory, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async deleteCategory(categoryId: string): Promise<GetCategoryDto>{
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

        if (!category) {
            throw new NotFoundException(`User with ID ${categoryId} not found`);
        }

        const deleteCategory = await this.categoryRepository.remove(category); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetCategoryDto, deleteCategory,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
