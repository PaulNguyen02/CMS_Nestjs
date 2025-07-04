import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1751613171526 implements MigrationInterface {
    name = ' $npmConfigName1751613171526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_login" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_dea1292c6882b56142e9d6f9a99" DEFAULT NEWSEQUENTIALID(), "username" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "user_agent" nvarchar(255) NOT NULL, "login_at" datetime2 NOT NULL CONSTRAINT "DF_1da1b7e97444773c7b2668ccf07" DEFAULT getdate(), CONSTRAINT "PK_dea1292c6882b56142e9d6f9a99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partners" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_336a22042de3d9e5a1ef9fe2d2c" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_998645b20820e4ab99aeae03b41" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, "file_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_9306ed146d15d1d4366b721966" ON "partners" ("file_id") WHERE "file_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "follow_us" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_a8d145c0b38e7e4323b59e51ec7" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_6d09d7e2f8ac56d3176779b879c" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, "file_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_6d09d7e2f8ac56d3176779b879c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b006afe7727b6279b64f67aa2c" ON "follow_us" ("file_id") WHERE "file_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "working_history" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_693d14157cbaf4a977a1144d6f7" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_1ec6dcc325919fd6cf5ba7b9c6a" DEFAULT NEWSEQUENTIALID(), "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "categories" nvarchar(255), "member_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_1ec6dcc325919fd6cf5ba7b9c6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_befee960c739426b143081c28eb" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_28b53062261b996d9c99fa12404" DEFAULT NEWSEQUENTIALID(), "fullname" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "position" nvarchar(255) NOT NULL, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_c66506fd4a933e403dc80edd692" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_6c16b9093a142e0e7613b04a3d9" DEFAULT NEWSEQUENTIALID(), "original_name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, "member_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_a7b2c155b5bad01eb952cf2e562" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_24dbc6126a28ff948da33e97d3b" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_60818528127866f5002e7f826dd" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_2829ac61eff60fcec60d7274b9e" DEFAULT NEWSEQUENTIALID(), "slug" nvarchar(255) NOT NULL, "title" nvarchar(255) NOT NULL, "summary" nvarchar(255) NOT NULL, "content" nvarchar(255) NOT NULL, "is_active" bit NOT NULL, "banner" uniqueidentifier NOT NULL, "category_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_cc850172538af6b74ca18e0820" ON "posts" ("banner") WHERE "banner" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "menu_group" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_4e0eff709908a088948daab8cf8" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_1b4355838e113a92087ecb039ee" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "isfooter" bit NOT NULL, CONSTRAINT "PK_1b4355838e113a92087ecb039ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_a24bfc84bd4665be608d6b9e62b" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_722c4de0accbbfafc77947a8556" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "group_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_0777b63da90c27d6ed993dc60b2" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_18325f38ae6de43878487eff986" DEFAULT NEWSEQUENTIALID(), "fullname" nvarchar(255) NOT NULL, "phone_number" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "content" nvarchar(255) NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_information" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_e8cd728a65ea6fdc6a3c25c2a3b" DEFAULT getdate(), "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_43f6534cbd3e6f9205afeb87cf0" DEFAULT NEWSEQUENTIALID(), "key" nvarchar(255) NOT NULL, "value" nvarchar(255) NOT NULL, CONSTRAINT "PK_43f6534cbd3e6f9205afeb87cf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_related_posts" ("post_id" uniqueidentifier NOT NULL, "related_post_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_e1132f657e3a8c808b7013f720b" PRIMARY KEY ("post_id", "related_post_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b9f6993c5a74fc7e4c2b4ab85" ON "post_related_posts" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f2713eff60bb2f0a00f6188318" ON "post_related_posts" ("related_post_id") `);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "FK_9306ed146d15d1d4366b7219665" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_us" ADD CONSTRAINT "FK_b006afe7727b6279b64f67aa2c3" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_history" ADD CONSTRAINT "FK_b747984b9e1d07275445851c097" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_cf385d63a2c2df1516b3d50ff61" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_cc850172538af6b74ca18e08204" FOREIGN KEY ("banner") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_dddf362d27a8bf763fadd4b3ce1" FOREIGN KEY ("group_id") REFERENCES "menu_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_related_posts" ADD CONSTRAINT "FK_8b9f6993c5a74fc7e4c2b4ab859" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_related_posts" ADD CONSTRAINT "FK_f2713eff60bb2f0a00f61883184" FOREIGN KEY ("related_post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_related_posts" DROP CONSTRAINT "FK_f2713eff60bb2f0a00f61883184"`);
        await queryRunner.query(`ALTER TABLE "post_related_posts" DROP CONSTRAINT "FK_8b9f6993c5a74fc7e4c2b4ab859"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_dddf362d27a8bf763fadd4b3ce1"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_cc850172538af6b74ca18e08204"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_cf385d63a2c2df1516b3d50ff61"`);
        await queryRunner.query(`ALTER TABLE "working_history" DROP CONSTRAINT "FK_b747984b9e1d07275445851c097"`);
        await queryRunner.query(`ALTER TABLE "follow_us" DROP CONSTRAINT "FK_b006afe7727b6279b64f67aa2c3"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "FK_9306ed146d15d1d4366b7219665"`);
        await queryRunner.query(`DROP INDEX "IDX_f2713eff60bb2f0a00f6188318" ON "post_related_posts"`);
        await queryRunner.query(`DROP INDEX "IDX_8b9f6993c5a74fc7e4c2b4ab85" ON "post_related_posts"`);
        await queryRunner.query(`DROP TABLE "post_related_posts"`);
        await queryRunner.query(`DROP TABLE "contact_information"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TABLE "menu_group"`);
        await queryRunner.query(`DROP INDEX "REL_cc850172538af6b74ca18e0820" ON "posts"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "working_history"`);
        await queryRunner.query(`DROP INDEX "REL_b006afe7727b6279b64f67aa2c" ON "follow_us"`);
        await queryRunner.query(`DROP TABLE "follow_us"`);
        await queryRunner.query(`DROP INDEX "REL_9306ed146d15d1d4366b721966" ON "partners"`);
        await queryRunner.query(`DROP TABLE "partners"`);
        await queryRunner.query(`DROP TABLE "user_login"`);
    }

}
