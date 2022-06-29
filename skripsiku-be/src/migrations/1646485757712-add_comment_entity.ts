import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentEntity1646485757712 implements MigrationInterface {
    name = 'addCommentEntity1646485757712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`note\` varchar(255) NOT NULL, \`sender\` int NOT NULL, \`attachment\` int NULL, \`user_id\` int NOT NULL, \`lecturer_id\` int NOT NULL, UNIQUE INDEX \`REL_61b705e97f03cb428ad727922c\` (\`attachment\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_61b705e97f03cb428ad727922cc\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_8fecb997e12799d3925f10ce530\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_8fecb997e12799d3925f10ce530\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_61b705e97f03cb428ad727922cc\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`REL_61b705e97f03cb428ad727922c\` ON \`comments\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
