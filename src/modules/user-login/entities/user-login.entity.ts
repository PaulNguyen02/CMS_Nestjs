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

    @Column()
    user_agent: string;

    @UpdateDateColumn()
    login_at: Date;
    
}
