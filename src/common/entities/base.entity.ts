import {
  CreateDateColumn,
  Column
} from 'typeorm';
export abstract class BaseEntity{

    @CreateDateColumn()
    created_at: Date;
    
    @Column()
    created_by: string ;

}