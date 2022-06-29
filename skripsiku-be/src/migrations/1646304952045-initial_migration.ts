import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1646304952045 implements MigrationInterface {
    name = 'initialMigration1646304952045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`file_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`majors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_approvers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`level\` int NULL, \`approver_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lecturers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(50) NOT NULL, \`registration_number\` varchar(255) NOT NULL, \`gender\` int NOT NULL, \`password\` varchar(255) NOT NULL, \`birthdate\` datetime NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`role\` int NOT NULL, \`is_head_of_study\` tinyint NOT NULL, \`major\` int NULL, UNIQUE INDEX \`IDX_3bf0b8dac54e0e07b5c3078f52\` (\`email\`), UNIQUE INDEX \`IDX_4fee1f8d7abdd337f34021a480\` (\`registration_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`submission_approvals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` int NOT NULL, \`score\` int NOT NULL, \`submission_id\` int NOT NULL, \`stage_id\` int NOT NULL, \`submission_attachment_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`submission_attachments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` int NOT NULL, \`attachment_id\` int NOT NULL, \`stage_id\` int NOT NULL, \`submission_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`submissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`status\` int NOT NULL, \`stage_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(50) NOT NULL, \`registration_number\` varchar(255) NOT NULL, \`class_of\` varchar(255) NULL, \`gender\` int NOT NULL, \`password\` varchar(255) NOT NULL, \`birthdate\` datetime NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`role\` int NOT NULL, \`major\` int NULL, \`thesis_advisor_id_id\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_6913ec13149b6981edb6c8b4d7\` (\`registration_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`erepositories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`status\` int NOT NULL, \`attachment\` int NULL, \`user\` int NULL, UNIQUE INDEX \`REL_62f945a7c2f0cce3459595bd30\` (\`attachment\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temporary_attachments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`file_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_f4a7e35e04214272c4df738b09a\` FOREIGN KEY (\`approver_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_d2436ae24d79eaeab870d202d13\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` ADD CONSTRAINT \`FK_978a47fe0d63c1811558c7f1971\` FOREIGN KEY (\`submission_id\`) REFERENCES \`submissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` ADD CONSTRAINT \`FK_9cec0ed83a367aae7adbd117739\` FOREIGN KEY (\`stage_id\`) REFERENCES \`stages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` ADD CONSTRAINT \`FK_22e675d6dc82881e9aaa838681d\` FOREIGN KEY (\`submission_attachment_id\`) REFERENCES \`submission_attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_d964e5066c655aec1230990b47a\` FOREIGN KEY (\`stage_id\`) REFERENCES \`stages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_c8e2f4d25c94df199d258e1fb1e\` FOREIGN KEY (\`submission_id\`) REFERENCES \`submissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_8b44731fd053ed70dab7a0e5b57\` FOREIGN KEY (\`stage_id\`) REFERENCES \`stages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_fca12c4ddd646dea4572c6815a9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_fca12c4ddd646dea4572c6815a9\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_8b44731fd053ed70dab7a0e5b57\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_c8e2f4d25c94df199d258e1fb1e\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_d964e5066c655aec1230990b47a\``);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` DROP FOREIGN KEY \`FK_22e675d6dc82881e9aaa838681d\``);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` DROP FOREIGN KEY \`FK_9cec0ed83a367aae7adbd117739\``);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` DROP FOREIGN KEY \`FK_978a47fe0d63c1811558c7f1971\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_d2436ae24d79eaeab870d202d13\``);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_f4a7e35e04214272c4df738b09a\``);
        await queryRunner.query(`DROP TABLE \`temporary_attachments\``);
        await queryRunner.query(`DROP INDEX \`REL_62f945a7c2f0cce3459595bd30\` ON \`erepositories\``);
        await queryRunner.query(`DROP TABLE \`erepositories\``);
        await queryRunner.query(`DROP INDEX \`IDX_6913ec13149b6981edb6c8b4d7\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`submissions\``);
        await queryRunner.query(`DROP TABLE \`stages\``);
        await queryRunner.query(`DROP TABLE \`submission_attachments\``);
        await queryRunner.query(`DROP TABLE \`submission_approvals\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fee1f8d7abdd337f34021a480\` ON \`lecturers\``);
        await queryRunner.query(`DROP INDEX \`IDX_3bf0b8dac54e0e07b5c3078f52\` ON \`lecturers\``);
        await queryRunner.query(`DROP TABLE \`lecturers\``);
        await queryRunner.query(`DROP TABLE \`user_approvers\``);
        await queryRunner.query(`DROP TABLE \`majors\``);
        await queryRunner.query(`DROP TABLE \`attachments\``);
    }

}
