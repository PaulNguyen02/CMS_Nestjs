import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToOne,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
import { Categories } from "../../categories/entities/categories.entity";
@Entity('posts')
export class Posts extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column()
    content: string;

    @Column()
    is_active: boolean;

    @Column()
    banner: string;

    @Column()
    category_id: string;

    @OneToOne(() => Files, file => file.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'banner' }) // Ràng buộc khóa ngoại
    banners: Files;
        
    @ManyToOne(() => Categories, (categories) => categories.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' }) 
    categories: Categories;

    @ManyToMany(() => Posts, post => post.related_by_posts,{cascade: true})
    @JoinTable({
        name: 'post_related_posts',
        joinColumn: {
            name: 'post_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'related_post_id',
            referencedColumnName: 'id'
        }
    }) 
    related_posts: Posts[];

    // Inverse relationship - các post có related đến post này
    @ManyToMany(() => Posts, post => post.related_posts)
    related_by_posts: Posts[];    

}