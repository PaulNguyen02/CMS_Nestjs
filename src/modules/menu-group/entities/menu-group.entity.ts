import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { menuItem } from "../../menu-items/entities/menu-item.entity";
@Entity('menu_group')
export class menuGroup extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar'})
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({name: 'is_footer'})
    isFooter: boolean;

    @OneToMany(() => menuItem, (MenuItem) => MenuItem.MenuGroup)
    MenuItem: menuItem[];
}