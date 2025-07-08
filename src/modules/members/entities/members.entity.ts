import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
import { WorkingHistory } from "../../working-history/entities/working-history.entity";
@Entity('members')
export class Member extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'fullname'})
    fullName: string;

    @Column()
    slug: string;

    @Column()
    position: string;

    @OneToMany(
        () => Files, 
        (file) => file.member, 
        { cascade: true }
    )
    files: Files[];

    @OneToMany(
        () => WorkingHistory, 
        (workingHistory) => workingHistory.member, 
        { cascade: true }
    )
    workingHistory: WorkingHistory[];
}