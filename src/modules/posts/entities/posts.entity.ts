import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToMany,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
@Entity('posts')
export class Posts extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    slug: string;

    @Column({type: 'nvarchar'})
    title: string;

    @Column({nullable: true, type: 'nvarchar'})
    summary: string;

    @Column({nullable: true, type: 'nvarchar'})
    content: string;

    @Column({name:'category'})
    category: string;  

}