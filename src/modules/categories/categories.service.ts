import { 
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import slugify from 'slugify';
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
    async createCategory(dto: CreateCategoryDto, username: string): Promise<GetCategoryDto>{
        const slug = slugify(dto.name, {
            lower: true,       // chữ thường
            strict: true       // loại bỏ ký tự đặc biệt
        });
        const newCategory = await this.categoryRepository.create({
            name: dto.name,
            slug: slug,
            createdAt: new Date(),
            createdBy: username
        });
        const saved = await this.categoryRepository.save(newCategory);
        const res = plainToInstance(GetCategoryDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateCategory (categoryId: string, dto: UpdateCategoryDto, username: string): Promise<GetCategoryDto>{
        if(dto.name){
            const slug = slugify(dto.name, {
                lower: true,       // chữ thường
                strict: true       // loại bỏ ký tự đặc biệt
            });
            await this.categoryRepository.update(categoryId, {
                ...dto,
                slug: slug,
                createdAt: new Date(),
                createdBy: username
            });
        }
        const updatedCategory = await this.categoryRepository.findOne({
            where: { id: categoryId }
        });
        const res = plainToInstance(GetCategoryDto, updatedCategory, {
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
        qb.orderBy('category.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();

        const data = plainToInstance(GetCategoryDto, items, {
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
