import { 
    Inject,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { menuItem } from './entities/menu-item.entity';
import { GetMenuItemDto } from './dto/get-menuitem.dto';
import { CreateMenuItemDto } from './dto/create-menuitem.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';
import { MenuItemParam } from './dto/menu-item-param.dto';
@Injectable()
export class MenuItemsService{

    constructor(
        @InjectRepository(menuItem)
        private readonly menuitemRepository: Repository<menuItem>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createMenuItem(dto: CreateMenuItemDto, username: string): Promise<GetMenuItemDto>{
        const slug = slugify(dto.name, {
            lower: true,       // chữ thường
            strict: true       // loại bỏ ký tự đặc biệt
        });
        const menuItem = await this.menuitemRepository.create({
            name: dto.name,
            groupId: dto.groupId,
            slug: slug,
            createdAt: new Date(),
            createdBy: username
        });
        const saved = await this.menuitemRepository.save(menuItem);
        const res = plainToInstance(GetMenuItemDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async updateMenuItem(menuItemId: string, dto: UpdateMenuItemDto, username: string): Promise<GetMenuItemDto>{
        if(dto.name){
            const slug = slugify(dto.name, {
                lower: true,       // chữ thường
                strict: true       // loại bỏ ký tự đặc biệt
            });
            await this.menuitemRepository.update(menuItemId, {
                ...dto,
                slug: slug,
                createdAt: new Date(),
                createdBy: username
            });
        }
        const updatedMenuItem = await this.menuitemRepository.findOne({
            where: { id: menuItemId }
        });
        const res = plainToInstance(GetMenuItemDto, updatedMenuItem, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async getMenuItem(query: MenuItemParam): Promise<GetMenuItemDto[]>{
        const {search} = query;
        const cacheKey = `follow${search ? `:${search}` : ''}`;
        const cached = await this.cacheManager.get<GetMenuItemDto[]>('menuitem');
        if (cached) {
            return cached;
        }
        const qb = this.menuitemRepository
            .createQueryBuilder('menuitem')
            .leftJoinAndSelect('menuitem.MenuGroup', 'MenuGroup')
        if (search) {
            qb.andWhere(
                'menuitem.name LIKE :search OR menuitem.slug LIKE :search',
                { search: `%${search}%` },
            );
        }
        const menuItems = await qb.getMany();

        const res = plainToInstance(GetMenuItemDto, menuItems, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set(cacheKey, res, 60);
        return res;
    }
        
    async deleteMenuItem(menuItemId: string): Promise<GetMenuItemDto>{
        const menuItem = await this.menuitemRepository.findOne({ where: { id: menuItemId } });
        
        if (!menuItem) {
            throw new NotFoundException(`User with ID ${menuItemId} not found`);
        }
        const deleteMenuItem = await this.menuitemRepository.remove(menuItem); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuItemDto, deleteMenuItem,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
