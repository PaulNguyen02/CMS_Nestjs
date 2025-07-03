import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Partners } from "../../partners/entities/partners.entity";
import { Posts } from "../../posts/entities/posts.entity";
import { followUs } from "../../follow-us/entities/follow-us.entity";
import { Member } from "../../members/entities/members.entity";
@Entity('files')
export class Files extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    original_name: string;

    @Column()
    url: string;

    @Column()
    member_id?: string;

    @OneToOne(() => Partners, partner => partner.file)
    partner: Partners;

    @OneToOne(() => Posts, posts => posts.banner)
    posts: Posts;

    @OneToOne(() => followUs, follow_us => follow_us.file)
    follow_us: followUs;

    @ManyToOne(() => Member, (member) => member.files, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'member_id' })
    member: Member;
} 