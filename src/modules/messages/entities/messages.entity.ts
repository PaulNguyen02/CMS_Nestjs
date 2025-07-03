import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column} from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
@Entity('messages')
export class Messages extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @Column()
    content: string;
}
