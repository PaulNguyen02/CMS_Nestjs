import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToOne,
    JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";

@Entity('follow_us')
export class followUs extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({name: 'file_id'})
    fileId: string;

    @OneToOne(() => Files, file => file.followUs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'file_id' }) // Ràng buộc khóa ngoại
    file: Files;
}