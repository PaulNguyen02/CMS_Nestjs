import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToOne,
    JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
@Entity('partners')
export class Partners extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar'})
    name: string;

    @Column()
    url: string;
 
    @Column({name:'file_id'})
    fileId: string;

    @OneToOne(() => Files, file => file.partner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'file_id' }) 
    file: Files; 
} 