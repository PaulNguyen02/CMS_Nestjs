import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Member } from "../../members/entities/members.entity";

@Entity('working_history')
export class workingHistory extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    categories: string;

    @Column()
    memberId: string;

    @ManyToOne(() => Member, (member) => member.working_history, { onDelete: 'CASCADE' })
    member: Member;
} 