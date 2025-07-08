import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    UpdateDateColumn } from "typeorm";

@Entity('user_login')
export class userLogin{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({name:'user_agent'})
    userAgent: string;

    @UpdateDateColumn({name:'login_at'})
    loginAt: Date;
    
}
