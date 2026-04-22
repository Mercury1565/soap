import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1776843776096 implements MigrationInterface {
    name = ' $npmConfigName1776843776096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "soap_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "sp_id" character varying NOT NULL, "product_id" character varying NOT NULL, "service_id" character varying NOT NULL, "update_type" character varying NOT NULL, "update_time" character varying NOT NULL, "effective_time" character varying NOT NULL, "expiry_time" character varying NOT NULL, "transaction_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_afd710e00c1da80f8924fedb8b2" UNIQUE ("transaction_id"), CONSTRAINT "PK_978999ebfd54053c219cd4e0de0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "soap_data"`);
    }

}
