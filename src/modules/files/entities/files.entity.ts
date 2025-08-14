import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne
} from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Partners } from "../../partners/entities/partners.entity";
import { Posts } from "../../posts/entities/posts.entity";
import { Member } from "../../members/entities/members.entity";
import { followUs } from "../../follow-us/entities/follow-us.entity";
@Entity('files')
export class Files extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'original_name'})
    originalName: string;

    @Column()
    url: string;

    @OneToOne(() => Partners, partner => partner.file)
    partner: Partners;

    @OneToOne(() => followUs, followUs => followUs.file)
    followUs: followUs;

    @OneToOne(() => Posts, post => post.banner)
    post: Posts;

    @OneToOne(() => Member, member => member.imageFile)
    member: Member;
} 