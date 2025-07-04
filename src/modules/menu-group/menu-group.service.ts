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

    async create(dto: CreateMenuGroupDto): Promise<GetMenuGroupDto>{
        const menu_group = await this.menugroupRepository.create({
            name: dto.name,
            slug: dto.slug,
            isfooter: dto.is_footer,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.menugroupRepository.save(menu_group);
        const res = plainToInstance(GetMenuGroupDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (menu_group_id: string, dto: UpdateMenuGroupDto): Promise<GetMenuGroupDto>{
        const existed_menu_group = await this.menugroupRepository.findOne({
            where: { id: menu_group_id }
        });       
        if (!existed_menu_group) {
            throw new NotFoundException('Menu group not found');
        }
        const new_menu_group = plainToInstance(menuGroup, dto);
        const update = this.menugroupRepository.merge(existed_menu_group, new_menu_group);
        const savedMenuGroup = await this.menugroupRepository.save(update);
        const res = plainToInstance(GetMenuGroupDto, savedMenuGroup, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async get(): Promise<GetMenuGroupDto[]>{
        const menu_groups = await this.menugroupRepository.find();
        const res = plainToInstance(GetMenuGroupDto, menu_groups, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async delete(menu_group_id: string): Promise<GetMenuGroupDto>{
        const menu_group = await this.menugroupRepository.findOne({ where: { id: menu_group_id } });
        
        if (!menu_group) {
            throw new NotFoundException(`User with ID ${menu_group_id} not found`);
        }
        
        const delete_menu_group = await this.menugroupRepository.remove(menu_group); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMenuGroupDto, delete_menu_group,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
