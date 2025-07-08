import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column} from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
@Entity('messages')
export class Messages extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'fullname'})
    fullName: string;

    @Column({name:'phone_number'})
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    content: string;
}
