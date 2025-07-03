import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
@Entity('contact_information')
export class contactInformation extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    key: string;

    @Column()
    value: string;

}
