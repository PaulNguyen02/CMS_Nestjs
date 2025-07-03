import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,  
    OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
import { workingHistory } from "../../working-history/entities/working-history.entity";
@Entity('members')
export class Member extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column()
    slug: string;

    @Column()
    position: string;

    @OneToMany(() => Files, (file) => file.member)
    files: Files[];

    @OneToMany(() => workingHistory, (working_history) => working_history.member)
    working_history: workingHistory[];
}