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

    async create(dto: CreateMenuItemDto): Promise<GetMenuItemDto>{
        const menu_item = await this.menuitemRepository.create({
            name: dto.name,
            slug: dto.slug,
            group_id: dto.group_id,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.menuitemRepository.save(menu_item);
        const res = plainToInstance(GetMenuItemDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async update (menu_item_id: string, dto: UpdateMenuItemDto): Promise<GetMenuItemDto>{
        const existed_menu_item = await this.menuitemRepository.findOne({
            where: { id: menu_item_id }
        });       
        if (!existed_menu_item) {
            throw new NotFoundException('Menu Item not found');
        }
        const new_menu_item = plainToInstance(menuItem, dto);
        const update = this.menuitemRepository.merge(existed_menu_item,new_menu_item);
        const savedMenuItem = await this.menuitemRepository.save(update);
        const res = plainToInstance(GetMenuItemDto, savedMenuItem, {
            excludeExtraneousValues: true,
        });
        return res;
    }
        
    async get(): Promise<GetMenuItemDto[]>{
        const cached = await this.cacheManager.get<GetMenuItemDto[]>('menuitem');
        if(cached){
            return cached;
        }
        const menu_items = await this.menuitemRepository.find({ relations: ['menu_group'] });
        const res = plainToInstance(GetMenuItemDto, menu_items, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('menuitem', res, 60);
        return res;
    }
        
    async delete(menu_item_id: string): Promise<GetMenuItemDto>{
        const menu_item = await this.menuitemRepository.findOne({ where: { id: menu_item_id } });
        
        if (!menu_item) {
            throw new NotFoundException(`User with ID ${menu_item_id} not found`);
        }
        const delete_menu_item = await this.menuitemRepository.remove(menu_item); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuItemDto, delete_menu_item,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
