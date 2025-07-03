import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    ManyToOne,
    JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { menuGroup } from "../../menu-group/entities/menu-group.entity";
@Entity('menu_item')
export class menuItem extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    group_id: string;

    @ManyToOne(() => menuGroup, (menu_group) => menu_group.menu_item, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' }) 
    menu_group: menuGroup;
} 
