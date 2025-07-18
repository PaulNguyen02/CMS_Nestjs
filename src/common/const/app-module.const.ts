import { FilesModule } from '@modules/files/files.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ContactInformationModule } from '@modules/contact-information/contact-information.module';
import { FollowUsModule } from '@modules/follow-us/follow-us.module';
import { MemberModule } from '@modules/members/members.module';
import { MenuGroupModule } from '@modules/menu-group/menu-group.module';
import { MenuItemModule } from '@/modules/menu-items/menu-items.module';
import { MessageModule } from '@modules/messages/messages.module';
import { PartnersModule } from '@modules/partners/partners.module';
import { PostsModule } from '@modules/posts/posts.module';
import { UserLoginModule } from '@/modules/auth/user-login.module';
import { DatabaseModule } from '@database/database.module';
import { Cache } from '@/common/cache/cache/cache.module';
import { ThrottleModule } from '../utils/throttler.module';
export const appModules = [
    Cache,
    DatabaseModule,
    PostsModule,
    FilesModule,
    MemberModule,
    CategoriesModule,
    FollowUsModule,
    MenuGroupModule,
    MenuItemModule,
    MessageModule,
    PartnersModule,
    UserLoginModule,
    ContactInformationModule,
    ThrottleModule
]