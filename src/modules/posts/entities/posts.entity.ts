import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToMany,
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

    @Column({ unique: true })
    slug: string;

    @Column({type: 'nvarchar'})
    title: string;

    @Column({nullable: true, type: 'nvarchar'})
    summary: string;

    @Column({nullable: true, type: 'nvarchar'})
    content: string;

    @Column({ name: 'banner_id', nullable: true })
    bannerId?: string;

    @ManyToOne(() => Files, { nullable: true, eager: false })
    @JoinColumn({ name: 'banner_id' }) // Khớp với tên cột banner_id
    bannerFile?: Files;

    @Column({name:'category_id'})
    categoryId: string;
        
    @ManyToOne(() => Categories, (categories) => categories.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' }) 
    categories: Categories;

    @ManyToMany(() => Posts, post => post.relatedByPosts,{cascade: true})
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
    relatedPosts: Posts[];

    // Inverse relationship - các post có related đến post này
    @ManyToMany(() => Posts, post => post.relatedPosts)
    relatedByPosts: Posts[];    

}