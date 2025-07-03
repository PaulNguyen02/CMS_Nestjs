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

    @Column()
    name: string;

    @Column()
    url: string;
 
    @Column()
    file_id: string;

    @OneToOne(() => Files, file => file.partner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'file_id' }) 
    file: Files; 
} 