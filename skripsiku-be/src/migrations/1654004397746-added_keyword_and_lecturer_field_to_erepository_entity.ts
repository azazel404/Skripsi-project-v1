import {MigrationInterface, QueryRunner} from "typeorm";

export class addedKeywordAndLecturerFieldToErepositoryEntity1654004397746 implements MigrationInterface {
    name = 'addedKeywordAndLecturerFieldToErepositoryEntity1654004397746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD \`keyword\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD \`lecturer\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP COLUMN \`lecturer\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP COLUMN \`keyword\``);
    }

}
