import { 
    BadRequestException,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { slugString } from '@/common/utils/string.util';
import { menuItem } from './entities/menu-item.entity';
import { GetMenuItemDto } from './dto/response/get-menuitem.dto';
import { CreateMenuItemDto } from './dto/request/create-menuitem.dto';
import { UpdateMenuItemDto } from './dto/request/update-menuitem.dto';
import { MenuItemParam } from './dto/request/menu-item-param.dto';
import { MenuItemExceptions } from './enums/menu-items-exception';
@Injectable()
export class MenuItemsService{

    constructor(
        @InjectRepository(menuItem)
        private readonly menuitemRepository: Repository<menuItem>
    ) {}

    async getMenuItem(query: MenuItemParam): Promise<GetMenuItemDto[]>{
        const {search} = query;
        const qb = this.menuitemRepository
            .createQueryBuilder('menuitem')
            .leftJoinAndSelect('menuitem.MenuGroup', 'MenuGroup')
        if (search) {
            qb.andWhere(`menuitem.name LIKE N'%' + :search + '%'`, { search })
            .orWhere('menuitem.slug LIKE :searchSlug', { searchSlug: `%${search}%` });
        }
        const menuItems = await qb.getMany();

        const res = plainToInstance(GetMenuItemDto, menuItems, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async createMenuItem(dto: CreateMenuItemDto, username: string): Promise<GetMenuItemDto>{
        const slug = slugString(dto.name)
        const existingMenuItem = await this.menuitemRepository.findOne({
            where: { slug: slug }
        });
        if(!existingMenuItem){
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
        }else{
            throw new BadRequestException(MenuItemExceptions.SLUG_ALREADY_EXISTS);
        }
    }
        
    async updateMenuItem(menuItemId: string, dto: UpdateMenuItemDto, username: string): Promise<GetMenuItemDto>{
        if(dto.name){
            const slug = slugString(dto.name)
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
        
    async deleteMenuItem(menuItemId: string): Promise<GetMenuItemDto>{
        const menuItem = await this.menuitemRepository.findOne({ where: { id: menuItemId } });
        
        if (!menuItem) {
            throw new NotFoundException(MenuItemExceptions.MENU_ITEM_NOT_FOUND);
        }
        const deleteMenuItem = await this.menuitemRepository.remove(menuItem); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuItemDto, deleteMenuItem,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
