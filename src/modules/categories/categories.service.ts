import { 
    BadRequestException,
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {slugString} from 'src/common/utils/string.util'
import { Categories } from './entities/categories.entity';
import { GetCategoryDto } from './dto/response/get-category.dto';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CategoryParam } from './dto/request/category-param.dto';
import { CategoryExceptions } from './enums/category-exceptions';
@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) {}

    async getPaginateCategory(query: CategoryParam): Promise<PaginationDto<GetCategoryDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.categoryRepository
            .createQueryBuilder('category');

        if (search) {
            qb.andWhere(
                `category.name LIKE N'%' + :search + '%'`,
                { search },
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

    async searchCategory(search: string): Promise<GetCategoryDto[]> {
        const qb = this.categoryRepository.createQueryBuilder('category');
        
        if (search && search.trim() !== '') {
            qb.where('category.id LIKE :id', { id: `%${search}%` })
            .orWhere(`category.name LIKE N'%' + :search + '%'`, { search });
        }
        
        const data = await qb.getMany();
        
        const res = plainToInstance(GetCategoryDto, data, {
            excludeExtraneousValues: true,
        });
        
        return res;
    }

    async createCategory(dto: CreateCategoryDto, username: string): Promise<GetCategoryDto>{
        const slug = slugString(dto.name)
        const existing = await this.categoryRepository.findOne({where:{slug}})
        if(!existing){
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
        }else{
            throw new BadRequestException(CategoryExceptions.SLUG_ALREADY_EXIST)
        }
    }

    async updateCategory (categoryId: string, dto: UpdateCategoryDto, username: string): Promise<GetCategoryDto>{
        if(dto.name){
            const slug = slugString(dto.name)
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

    async deleteCategory(categoryId: string): Promise<GetCategoryDto>{
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

        if (!category) {
            throw new NotFoundException(CategoryExceptions.CATEGORY_NOT_FOUND);
        }

        const deleteCategory = await this.categoryRepository.remove(category); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetCategoryDto, deleteCategory,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
