import {MigrationInterface, QueryRunner} from "typeorm";

export class updateLecturerEntity1646483237968 implements MigrationInterface {
    name = 'updateLecturerEntity1646483237968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
    }

}
