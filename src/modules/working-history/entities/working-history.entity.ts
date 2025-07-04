import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    JoinColumn,
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

    @Column({ nullable: true })
    categories: string;

    @Column()
    member_id: string;

    @ManyToOne(
        () => Member, 
        (member) => member.working_history, 
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'member_id' })
    member: Member;
} 