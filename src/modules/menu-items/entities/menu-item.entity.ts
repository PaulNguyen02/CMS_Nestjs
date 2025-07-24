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

    @Column({type: 'nvarchar'})
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({name:'group_id'})
    groupId: string;

    @ManyToOne(() => menuGroup, (MenuGroup) => MenuGroup.MenuItem, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'group_id' }) 
    MenuGroup: menuGroup;
} 
