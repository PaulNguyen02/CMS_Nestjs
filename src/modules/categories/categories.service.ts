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
@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) {}
    async create(dto: CreateCategoryDto): Promise<GetCategoryDto>{
        const new_category = await this.categoryRepository.create({
            name: dto.name,
            slug: dto.slug,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.categoryRepository.save(new_category);
        const res = plainToInstance(GetCategoryDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (category_id: string, dto: UpdateCategoryDto): Promise<GetCategoryDto>{
         
        const existedCategory = await this.categoryRepository.findOne({
            where: { id: category_id }
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

    async paginate(page: number, limit: number): Promise<PaginationDto<GetCategoryDto>>{
        const [posts, total] = await this.categoryRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { created_at: 'DESC' }, 
        });
        
        const data = plainToInstance(GetCategoryDto, posts, {
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

    async findOne(category_id: string): Promise<GetCategoryDto>{
        const existedCategory = await this.categoryRepository.findOne({
            where: { id: category_id }
        });  
        const res = plainToInstance(GetCategoryDto, existedCategory, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async delete(category_id: string): Promise<GetCategoryDto>{
        const category = await this.categoryRepository.findOne({ where: { id: category_id } });

        if (!category) {
            throw new NotFoundException(`User with ID ${category_id} not found`);
        }

        const delete_category = await this.categoryRepository.remove(category); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetCategoryDto, delete_category,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
