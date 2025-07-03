import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Posts } from "../../posts/entities/posts.entity";
@Entity('categories')
export class Categories extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @OneToMany(() => Posts, (post) => post.categories)
    posts: Posts[];

}