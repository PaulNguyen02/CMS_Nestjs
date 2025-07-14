import slugify from 'slugify';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { menuGroup } from './entities/menu-group.entity';
import { GetMenuGroupDto } from './dto/get-menugroup.dto';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';
import { UpdateMenuGroupDto } from './dto/update-menugroup.dto';
import { MenuGroupParam } from './dto/menu-group-param.dto';
@Injectable()
export class MenuGroupsService{

    constructor(
        @InjectRepository(menuGroup)
        private readonly menugroupRepository: Repository<menuGroup>,
    ) {}

    async createMenuGroup(dto: CreateMenuGroupDto, username: string): Promise<GetMenuGroupDto>{
        const slug = slugString(dto.name)
        const menuGroup = await this.menugroupRepository.create({
            name: dto.name,
            isFooter: dto.isFooter,
            slug: slug,
            createdAt: new Date(),
            createdBy: username
        });
        const saved = await this.menugroupRepository.save(menuGroup);
        const res = plainToInstance(GetMenuGroupDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateMenuGroup(menuGroupId: string, dto: UpdateMenuGroupDto, username: string): Promise<GetMenuGroupDto>{
        if(dto.name){
            const slug = slugString(dto.name)
            await this.menugroupRepository.update(menuGroupId, {
                ...dto,
                slug: slug,
                createdAt: new Date(),
                createdBy: username
            });
        }
        const updatedMenuGroup = await this.menugroupRepository.findOne({
            where: { id: menuGroupId }
        });
        const res = plainToInstance(GetMenuGroupDto, updatedMenuGroup, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async getMenuGroup(query: MenuGroupParam): Promise<GetMenuGroupDto[]>{
        const {search} = query
        const qb = this.menugroupRepository
            .createQueryBuilder('menugroup')
        if (search) {
            qb.andWhere(
                'menugroup.name LIKE :search OR menugroup.slug LIKE :search',
                { search: `%${search}%` },
            );
        }
        const menuGroups = await qb.getMany();
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
