import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    JoinColumn,
    ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Member } from "./members.entity";

@Entity('working_history')
export class WorkingHistory extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'nvarchar'})
    title: string;

    @Column({type: 'nvarchar'})
    description: string;

    @Column({ nullable: true, type: 'nvarchar' })
    categories: string;

    @Column({name:'member_id'})
    memberId: string;

    @ManyToOne(
        () => Member, 
        (member) => member.workingHistory, // phải trùng tên field ở Member
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'member_id' })
    member: Member;
} 