import {
  Column
} from 'typeorm';
export abstract class BaseEntity{

    @Column({name: 'created_at'})
    createdAt: Date;
    
    @Column({name: 'created_by'})
    createdBy: string ;

}