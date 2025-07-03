import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,  
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Files } from "../../files/entities/files.entity";
import { Categories } from "../../categories/entities/categories.entity";
import { relatedPosts } from "../../related-posts/entities/related-posts.entity";
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

    @Column({name:"is_active"})
    isActive: boolean;


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

    @OneToMany(() => relatedPosts, rel => rel.post)
    related_posts: relatedPosts[];

}