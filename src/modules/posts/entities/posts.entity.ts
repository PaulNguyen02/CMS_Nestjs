import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToOne,
    JoinColumn
} from "typeorm";
import { Files } from "../../files/entities/files.entity";
import { BaseEntity } from "../../../common/entities/base.entity";
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

    @Column({name:'banner_id'})
    bannerId: string;

    @OneToOne(() => Files)
    @JoinColumn({ name: 'banner_id' }) // nối với cột bannerId
    banner: Files;
}