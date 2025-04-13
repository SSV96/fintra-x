import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUsersTable1744540852224 implements MigrationInterface {
  name = 'AddedUsersTable1744540852224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstName" character varying NOT NULL, "lastName" character varying, "emailVerifiedAt" boolean NOT NULL DEFAULT false, "phone" character varying NOT NULL, "phoneVerifiedAt" boolean NOT NULL DEFAULT false, "address" json, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
