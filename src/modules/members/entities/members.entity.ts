import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    JoinColumn, 
    OneToMany,
    ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
import { WorkingHistory } from "./working-history.entity";
@Entity('members')
export class Member extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'full_name', type: 'nvarchar'})
    fullName: string;

    @Column({ unique: true })
    slug: string;

    @Column()
    position: string;

    @Column({ name: 'image_id', nullable: true })
    imageId?: string;

    @ManyToOne(() => Files, { nullable: true })
    @JoinColumn({ name: 'image_id' })
    imageFile?: Files;

    @OneToMany(
        () => WorkingHistory, 
        (workingHistory) => workingHistory.member, 
        { cascade: true }
    )
    workingHistory: WorkingHistory[];
}