import { 
    Inject,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { menuItem } from './entities/menu-item.entity';
import { GetMenuItemDto } from './dto/get-menuitem.dto';
import { CreateMenuItemDto } from './dto/create-menuitem.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';
@Injectable()
export class MenuItemsService{

    constructor(
        @InjectRepository(menuItem)
        private readonly menuitemRepository: Repository<menuItem>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createMenuItem(dto: CreateMenuItemDto): Promise<GetMenuItemDto>{
        const menuItem = await this.menuitemRepository.create({
            name: dto.name,
            slug: dto.slug,
            groupId: dto.groupId,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.menuitemRepository.save(menuItem);
        const res = plainToInstance(GetMenuItemDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async updateMenuItem(menuItemId: string, dto: UpdateMenuItemDto): Promise<GetMenuItemDto>{
        const existedMenuItem = await this.menuitemRepository.findOne({
            where: { id: menuItemId }
        });       
        if (!existedMenuItem) {
            throw new NotFoundException('Menu Item not found');
        }
        const newMenuItem = plainToInstance(menuItem, dto);
        const update = this.menuitemRepository.merge(existedMenuItem,newMenuItem);
        const savedMenuItem = await this.menuitemRepository.save(update);
        const res = plainToInstance(GetMenuItemDto, savedMenuItem, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async getMenuItem(): Promise<GetMenuItemDto[]>{
        const cached = await this.cacheManager.get<GetMenuItemDto[]>('menuitem');
        if(cached){
            return cached;
        }
        const menuItems = await this.menuitemRepository.find({ relations: ['menu_group'] });
        const res = plainToInstance(GetMenuItemDto, menuItems, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('menuitem', res, 60);
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
