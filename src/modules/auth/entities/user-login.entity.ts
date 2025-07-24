import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column } from "typeorm";

@Entity('user')
export class userLogin{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true, name:'user_agent'})
    userAgent: string;

    @Column({nullable: true, name:'create_at'})
    createAt: Date;

    @Column({nullable: true, name:'login_at'})
    loginAt: Date;
    
}
