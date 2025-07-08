import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { menuGroup } from './entities/menu-group.entity';
import { GetMenuGroupDto } from './dto/get-menugroup.dto';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';
import { UpdateMenuGroupDto } from './dto/update-menugroup.dto';
@Injectable()
export class MenuGroupsService{

    constructor(
        @InjectRepository(menuGroup)
        private readonly menugroupRepository: Repository<menuGroup>,
    ) {}

    async createMenuGroup(dto: CreateMenuGroupDto): Promise<GetMenuGroupDto>{
        const menuGroup = await this.menugroupRepository.create({
            name: dto.name,
            slug: dto.slug,
            isfooter: dto.is_footer,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.menugroupRepository.save(menuGroup);
        const res = plainToInstance(GetMenuGroupDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateMenuGroup(menuGroupId: string, dto: UpdateMenuGroupDto): Promise<GetMenuGroupDto>{
        const existedMenuGroup = await this.menugroupRepository.findOne({
            where: { id: menuGroupId }
        });       
        if (!existedMenuGroup) {
            throw new NotFoundException('Menu group not found');
        }
        const newMenuGroup = plainToInstance(menuGroup, dto);
        const update = this.menugroupRepository.merge(existedMenuGroup, newMenuGroup);
        const savedMenuGroup = await this.menugroupRepository.save(update);
        const res = plainToInstance(GetMenuGroupDto, savedMenuGroup, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async getMenuGroup(): Promise<GetMenuGroupDto[]>{
        const menuGroups = await this.menugroupRepository.find();
        const res = plainToInstance(GetMenuGroupDto, menuGroups, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async deleteMenuGroup(menuGroupId: string): Promise<GetMenuGroupDto>{
        const menuGroup = await this.menugroupRepository.findOne({ where: { id: menuGroupId } });
        
        if (!menuGroup) {
            throw new NotFoundException(`User with ID ${menuGroupId} not found`);
        }
        
        const delete_menu_group = await this.menugroupRepository.remove(menuGroup); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuGroupDto, delete_menu_group,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
