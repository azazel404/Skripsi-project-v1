import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAnnouncementEntity1650290500072 implements MigrationInterface {
    name = 'updateAnnouncementEntity1650290500072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_a3b441c7569693a3ee9d72fa7b2\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_af5515c63ea99a6746624721ee6\``);
        await queryRunner.query(`DROP INDEX \`REL_a3b441c7569693a3ee9d72fa7b\` ON \`announcements\``);
        await queryRunner.query(`DROP INDEX \`REL_af5515c63ea99a6746624721ee\` ON \`announcements\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP COLUMN \`document\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD UNIQUE INDEX \`IDX_441ddc3a9a093b8046bafa3f04\` (\`attachment\`)`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_61b705e97f03cb428ad727922cc\``);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1585c628c43cc50dc1e061dc504\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_93a5586a540352e3c3719840d7f\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`profile_picture\` \`profile_picture\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_99f57fa639a31654936b41af35d\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`date\` \`date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`start_time\` \`start_time\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`location\` \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e8a0284e69854693ab8f2245470\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`sequence\` \`sequence\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_441ddc3a9a093b8046bafa3f04\` ON \`announcements\` (\`attachment\`)`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_61b705e97f03cb428ad727922cc\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1585c628c43cc50dc1e061dc504\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_93a5586a540352e3c3719840d7f\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_99f57fa639a31654936b41af35d\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e8a0284e69854693ab8f2245470\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_441ddc3a9a093b8046bafa3f040\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_441ddc3a9a093b8046bafa3f040\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e8a0284e69854693ab8f2245470\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_99f57fa639a31654936b41af35d\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_93a5586a540352e3c3719840d7f\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1585c628c43cc50dc1e061dc504\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_61b705e97f03cb428ad727922cc\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`DROP INDEX \`REL_441ddc3a9a093b8046bafa3f04\` ON \`announcements\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`sequence\` \`sequence\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e8a0284e69854693ab8f2245470\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`location\` \`location\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`start_time\` \`start_time\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`date\` \`date\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_99f57fa639a31654936b41af35d\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`profile_picture\` \`profile_picture\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_93a5586a540352e3c3719840d7f\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1585c628c43cc50dc1e061dc504\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_61b705e97f03cb428ad727922cc\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP INDEX \`IDX_441ddc3a9a093b8046bafa3f04\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP COLUMN \`attachment\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD \`image\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD \`document\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_af5515c63ea99a6746624721ee\` ON \`announcements\` (\`image\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a3b441c7569693a3ee9d72fa7b\` ON \`announcements\` (\`document\`)`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_af5515c63ea99a6746624721ee6\` FOREIGN KEY (\`image\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_a3b441c7569693a3ee9d72fa7b2\` FOREIGN KEY (\`document\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
