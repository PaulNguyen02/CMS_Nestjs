import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn,  
    ManyToOne,
    JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Posts } from "../../posts/entities/posts.entity";
@Entity('related_posts')
export class relatedPosts extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    post_id: string;

    @Column()
    related_id: string;

    @ManyToOne(() => Posts, post => post.related_posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' }) // Thêm cột post_id
    post: Posts;

    // Post liên quan
    @ManyToOne(() => Posts)
    @JoinColumn({ name: 'related_id' })
    related: Posts;

} 