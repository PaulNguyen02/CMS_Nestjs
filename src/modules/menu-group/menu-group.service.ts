import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { menuGroup } from './entities/menu-group.entity';
import { GetMenuGroupDto } from './dto/response/get-menugroup.dto';
import { CreateMenuGroupDto } from './dto/request/create-menugroup.dto';
import { UpdateMenuGroupDto } from './dto/request/update-menugroup.dto';
import { MenuGroupParam } from './dto/request/menu-group-param.dto';
import { MenuGroupExceptions } from './enums/menu-group-exceptions';
@Injectable()
export class MenuGroupsService{

    constructor(
        @InjectRepository(menuGroup)
        private readonly menugroupRepository: Repository<menuGroup>,
    ) {}

    async getMenuGroup(query: MenuGroupParam): Promise<GetMenuGroupDto[]>{
        const {search} = query
        const qb = this.menugroupRepository
            .createQueryBuilder('menugroup')
        if (search) {
            qb.andWhere(`menugroup.name LIKE N'%' + :search + '%'`, { search })
            .orWhere(`menugroup.slug LIKE '%' + :search + '%'`, { search });
        }
        const menuGroups = await qb.getMany();
        const res = plainToInstance(GetMenuGroupDto, menuGroups, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async searchMenuGroup(search: string): Promise<GetMenuGroupDto[]> {
        const qb = this.menugroupRepository.createQueryBuilder('menugroup');

        if (search && search.trim() !== '') {
            qb.where('menugroup.id LIKE :id', { id: `%${search}%` })
            .orWhere(`menugroup.name LIKE N'%' + :search + '%'`, { search });
        }

        const data = await qb.getMany();

        const res = plainToInstance(GetMenuGroupDto, data, {
            excludeExtraneousValues: true,
        });

        return res;
    }

    async createMenuGroup(dto: CreateMenuGroupDto, username: string): Promise<GetMenuGroupDto>{
        const slug = slugString(dto.name)
        const check = await this.menugroupRepository.findOne({
            where: {slug}
        })
        if(!check){
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
        }else{
            throw new BadRequestException(MenuGroupExceptions.SLUG_ALREADY_EXISTS);
        }
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

    async deleteMenuGroup(menuGroupId: string): Promise<GetMenuGroupDto>{
        const menuGroup = await this.menugroupRepository.findOne({ where: { id: menuGroupId } });
        
        if (!menuGroup) {
            throw new NotFoundException(MenuGroupExceptions.MENU_GROUP_NOT_FOUND);
        }
        
        const delete_menu_group = await this.menugroupRepository.remove(menuGroup); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuGroupDto, delete_menu_group,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
