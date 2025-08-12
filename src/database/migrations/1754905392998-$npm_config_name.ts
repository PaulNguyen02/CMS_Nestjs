import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1754905392998 implements MigrationInterface {
    name = ' $npmConfigName1754905392998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_2829ac61eff60fcec60d7274b9e" DEFAULT NEWSEQUENTIALID(), "slug" nvarchar(255) NOT NULL, "title" nvarchar(255) NOT NULL, "summary" nvarchar(255), "content" nvarchar(255), "category" nvarchar(255) NOT NULL, CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_18325f38ae6de43878487eff986" DEFAULT NEWSEQUENTIALID(), "full_name" nvarchar(255) NOT NULL, "phone_number" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "content" nvarchar(255) NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_group" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_1b4355838e113a92087ecb039ee" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "is_footer" bit NOT NULL, CONSTRAINT "UQ_6a60223548ecf47e26cb0e0b1cb" UNIQUE ("slug"), CONSTRAINT "PK_1b4355838e113a92087ecb039ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_722c4de0accbbfafc77947a8556" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "group_id" uniqueidentifier NOT NULL, CONSTRAINT "UQ_705e34e69501e069e43f64fce31" UNIQUE ("slug"), CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_us" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_6d09d7e2f8ac56d3176779b879c" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, "file_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_6d09d7e2f8ac56d3176779b879c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b006afe7727b6279b64f67aa2c" ON "follow_us" ("file_id") WHERE "file_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "files" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_6c16b9093a142e0e7613b04a3d9" DEFAULT NEWSEQUENTIALID(), "original_name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partners" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_998645b20820e4ab99aeae03b41" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "url" nvarchar(255) NOT NULL, "file_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_9306ed146d15d1d4366b721966" ON "partners" ("file_id") WHERE "file_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "members" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_28b53062261b996d9c99fa12404" DEFAULT NEWSEQUENTIALID(), "full_name" nvarchar(255) NOT NULL, "slug" nvarchar(255) NOT NULL, "position" nvarchar(255) NOT NULL, "image_id" uniqueidentifier, CONSTRAINT "UQ_9428057aa473252c5e4d3d02bbf" UNIQUE ("slug"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "working_history" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_1ec6dcc325919fd6cf5ba7b9c6a" DEFAULT NEWSEQUENTIALID(), "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "categories" nvarchar(255), "member_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_1ec6dcc325919fd6cf5ba7b9c6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "username" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "user_agent" nvarchar(255), "create_at" datetime, "login_at" datetime, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_information" ("created_at" datetime NOT NULL, "created_by" nvarchar(255) NOT NULL, "id" uniqueidentifier NOT NULL CONSTRAINT "DF_43f6534cbd3e6f9205afeb87cf0" DEFAULT NEWSEQUENTIALID(), "key" nvarchar(255) NOT NULL, "value" nvarchar(255) NOT NULL, CONSTRAINT "PK_43f6534cbd3e6f9205afeb87cf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_dddf362d27a8bf763fadd4b3ce1" FOREIGN KEY ("group_id") REFERENCES "menu_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_us" ADD CONSTRAINT "FK_b006afe7727b6279b64f67aa2c3" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partners" ADD CONSTRAINT "FK_9306ed146d15d1d4366b7219665" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_af1fa90fb43115943ca660908a5" FOREIGN KEY ("image_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "working_history" ADD CONSTRAINT "FK_b747984b9e1d07275445851c097" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "working_history" DROP CONSTRAINT "FK_b747984b9e1d07275445851c097"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_af1fa90fb43115943ca660908a5"`);
        await queryRunner.query(`ALTER TABLE "partners" DROP CONSTRAINT "FK_9306ed146d15d1d4366b7219665"`);
        await queryRunner.query(`ALTER TABLE "follow_us" DROP CONSTRAINT "FK_b006afe7727b6279b64f67aa2c3"`);
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_dddf362d27a8bf763fadd4b3ce1"`);
        await queryRunner.query(`DROP TABLE "contact_information"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "working_history"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP INDEX "REL_9306ed146d15d1d4366b721966" ON "partners"`);
        await queryRunner.query(`DROP TABLE "partners"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP INDEX "REL_b006afe7727b6279b64f67aa2c" ON "follow_us"`);
        await queryRunner.query(`DROP TABLE "follow_us"`);
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TABLE "menu_group"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
