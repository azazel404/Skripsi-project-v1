import {MigrationInterface, QueryRunner} from "typeorm";

export class addedMajorColumnForErepositoryColumn1652692197028 implements MigrationInterface {
    name = 'addedMajorColumnForErepositoryColumn1652692197028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_d2436ae24d79eaeab870d202d13\``);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_f4a7e35e04214272c4df738b09a\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_61b705e97f03cb428ad727922cc\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_8fecb997e12799d3925f10ce530\``);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` DROP FOREIGN KEY \`FK_25aa840da1be54298de429413ce\``);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` DROP FOREIGN KEY \`FK_82e571914bd3b77ba80a0026d68\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_4465e2482b1858e608c073a3ec1\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_570789daa19012d7b2acad89d02\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_ae2c917c563d245ba9c4f511e23\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1585c628c43cc50dc1e061dc504\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_93a5586a540352e3c3719840d7f\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` DROP FOREIGN KEY \`FK_5f51bec2e93ddfa8748ec9c8d88\``);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` DROP FOREIGN KEY \`FK_f00a161c4388dfaa8c520fa3d6b\``);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` DROP FOREIGN KEY \`FK_22e675d6dc82881e9aaa838681d\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_99f57fa639a31654936b41af35d\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_c8e2f4d25c94df199d258e1fb1e\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_fca12c4ddd646dea4572c6815a9\``);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` DROP FOREIGN KEY \`FK_1f120bcf03d9e18610098a9efb5\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_29095e74c900a5868626470ce58\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e6e10bd4e8132d9317eb3f65d26\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e8a0284e69854693ab8f2245470\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approvals\` DROP FOREIGN KEY \`FK_f352a8886d726e7211967170d23\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` DROP FOREIGN KEY \`FK_6f7530cbed22190728b86a080d0\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` DROP FOREIGN KEY \`FK_be7f8ad56cc9322b511e44fa36d\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_441ddc3a9a093b8046bafa3f040\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` CHANGE \`level\` \`level\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`profile_picture\` \`profile_picture\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`date\` \`date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`start_time\` \`start_time\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`end_time\` \`end_time\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`location\` \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`sequence\` \`sequence\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` CHANGE \`remarks\` \`remarks\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`announcements\` CHANGE \`attachment\` \`attachment\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_f4a7e35e04214272c4df738b09a\` FOREIGN KEY (\`approver_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_d2436ae24d79eaeab870d202d13\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_47adf1b3ff67e2027259c1a3fdc\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_61b705e97f03cb428ad727922cc\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_8fecb997e12799d3925f10ce530\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` ADD CONSTRAINT \`FK_82e571914bd3b77ba80a0026d68\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` ADD CONSTRAINT \`FK_25aa840da1be54298de429413ce\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_4465e2482b1858e608c073a3ec1\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_ae2c917c563d245ba9c4f511e23\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_570789daa19012d7b2acad89d02\` FOREIGN KEY (\`submission_attachment_id\`) REFERENCES \`submission_attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1585c628c43cc50dc1e061dc504\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_93a5586a540352e3c3719840d7f\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` ADD CONSTRAINT \`FK_f00a161c4388dfaa8c520fa3d6b\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` ADD CONSTRAINT \`FK_5f51bec2e93ddfa8748ec9c8d88\` FOREIGN KEY (\`submission_approval_id\`) REFERENCES \`submission_approvals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` ADD CONSTRAINT \`FK_22e675d6dc82881e9aaa838681d\` FOREIGN KEY (\`submission_attachment_id\`) REFERENCES \`submission_attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_c8e2f4d25c94df199d258e1fb1e\` FOREIGN KEY (\`submission_id\`) REFERENCES \`submissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_99f57fa639a31654936b41af35d\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_fca12c4ddd646dea4572c6815a9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` ADD CONSTRAINT \`FK_1f120bcf03d9e18610098a9efb5\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_29095e74c900a5868626470ce58\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e8a0284e69854693ab8f2245470\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e6e10bd4e8132d9317eb3f65d26\` FOREIGN KEY (\`submission_period_id\`) REFERENCES \`submission_periods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approvals\` ADD CONSTRAINT \`FK_f352a8886d726e7211967170d23\` FOREIGN KEY (\`abstract_submission_id\`) REFERENCES \`abstract_submissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` ADD CONSTRAINT \`FK_be7f8ad56cc9322b511e44fa36d\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` ADD CONSTRAINT \`FK_6f7530cbed22190728b86a080d0\` FOREIGN KEY (\`abstract_submission_approval_id\`) REFERENCES \`abstract_submission_approvals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_441ddc3a9a093b8046bafa3f040\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`announcements\` DROP FOREIGN KEY \`FK_441ddc3a9a093b8046bafa3f040\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` DROP FOREIGN KEY \`FK_6f7530cbed22190728b86a080d0\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` DROP FOREIGN KEY \`FK_be7f8ad56cc9322b511e44fa36d\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approvals\` DROP FOREIGN KEY \`FK_f352a8886d726e7211967170d23\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e6e10bd4e8132d9317eb3f65d26\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_e8a0284e69854693ab8f2245470\``);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` DROP FOREIGN KEY \`FK_29095e74c900a5868626470ce58\``);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` DROP FOREIGN KEY \`FK_1f120bcf03d9e18610098a9efb5\``);
        await queryRunner.query(`ALTER TABLE \`submissions\` DROP FOREIGN KEY \`FK_fca12c4ddd646dea4572c6815a9\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_99f57fa639a31654936b41af35d\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` DROP FOREIGN KEY \`FK_c8e2f4d25c94df199d258e1fb1e\``);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` DROP FOREIGN KEY \`FK_22e675d6dc82881e9aaa838681d\``);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` DROP FOREIGN KEY \`FK_5f51bec2e93ddfa8748ec9c8d88\``);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` DROP FOREIGN KEY \`FK_f00a161c4388dfaa8c520fa3d6b\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_93a5586a540352e3c3719840d7f\``);
        await queryRunner.query(`ALTER TABLE \`lecturers\` DROP FOREIGN KEY \`FK_b90ea54b4b1c6437889fc84b930\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1585c628c43cc50dc1e061dc504\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_16903503d5c6b46bebb0b8a8de5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_36140e591dbea83bac5b2f8fa7d\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_570789daa19012d7b2acad89d02\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_ae2c917c563d245ba9c4f511e23\``);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` DROP FOREIGN KEY \`FK_4465e2482b1858e608c073a3ec1\``);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` DROP FOREIGN KEY \`FK_25aa840da1be54298de429413ce\``);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` DROP FOREIGN KEY \`FK_82e571914bd3b77ba80a0026d68\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_8fecb997e12799d3925f10ce530\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_61b705e97f03cb428ad727922cc\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_47adf1b3ff67e2027259c1a3fdc\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_3cf20fa414914ae683ed8bde242\``);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP FOREIGN KEY \`FK_62f945a7c2f0cce3459595bd30f\``);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_d2436ae24d79eaeab870d202d13\``);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` DROP FOREIGN KEY \`FK_f4a7e35e04214272c4df738b09a\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` CHANGE \`remarks\` \`remarks\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` CHANGE \`sequence\` \`sequence\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`location\` \`location\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`end_time\` \`end_time\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`start_time\` \`start_time\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` CHANGE \`date\` \`date\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` CHANGE \`remarks\` \`remarks\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`profile_picture\` \`profile_picture\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`profile_picture\` \`profile_picture\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`thesis_advisor_id_id\` \`thesis_advisor_id_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`major\` \`major\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`class_of\` \`class_of\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`user\` \`user\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` CHANGE \`attachment\` \`attachment\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` CHANGE \`level\` \`level\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` DROP COLUMN \`major\``);
        await queryRunner.query(`ALTER TABLE \`announcements\` ADD CONSTRAINT \`FK_441ddc3a9a093b8046bafa3f040\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` ADD CONSTRAINT \`FK_be7f8ad56cc9322b511e44fa36d\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approval_details\` ADD CONSTRAINT \`FK_6f7530cbed22190728b86a080d0\` FOREIGN KEY (\`abstract_submission_approval_id\`) REFERENCES \`abstract_submission_approvals\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submission_approvals\` ADD CONSTRAINT \`FK_f352a8886d726e7211967170d23\` FOREIGN KEY (\`abstract_submission_id\`) REFERENCES \`abstract_submissions\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e8a0284e69854693ab8f2245470\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_e6e10bd4e8132d9317eb3f65d26\` FOREIGN KEY (\`submission_period_id\`) REFERENCES \`submission_periods\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`abstract_submissions\` ADD CONSTRAINT \`FK_29095e74c900a5868626470ce58\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_periods\` ADD CONSTRAINT \`FK_1f120bcf03d9e18610098a9efb5\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submissions\` ADD CONSTRAINT \`FK_fca12c4ddd646dea4572c6815a9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_c8e2f4d25c94df199d258e1fb1e\` FOREIGN KEY (\`submission_id\`) REFERENCES \`submissions\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_attachments\` ADD CONSTRAINT \`FK_99f57fa639a31654936b41af35d\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_approvals\` ADD CONSTRAINT \`FK_22e675d6dc82881e9aaa838681d\` FOREIGN KEY (\`submission_attachment_id\`) REFERENCES \`submission_attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` ADD CONSTRAINT \`FK_f00a161c4388dfaa8c520fa3d6b\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_approval_details\` ADD CONSTRAINT \`FK_5f51bec2e93ddfa8748ec9c8d88\` FOREIGN KEY (\`submission_approval_id\`) REFERENCES \`submission_approvals\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_b90ea54b4b1c6437889fc84b930\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`lecturers\` ADD CONSTRAINT \`FK_93a5586a540352e3c3719840d7f\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_36140e591dbea83bac5b2f8fa7d\` FOREIGN KEY (\`major\`) REFERENCES \`majors\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_16903503d5c6b46bebb0b8a8de5\` FOREIGN KEY (\`thesis_advisor_id_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1585c628c43cc50dc1e061dc504\` FOREIGN KEY (\`profile_picture\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_ae2c917c563d245ba9c4f511e23\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_570789daa19012d7b2acad89d02\` FOREIGN KEY (\`submission_attachment_id\`) REFERENCES \`submission_attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`submission_attachment_approvers\` ADD CONSTRAINT \`FK_4465e2482b1858e608c073a3ec1\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` ADD CONSTRAINT \`FK_82e571914bd3b77ba80a0026d68\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_abstract_approvers\` ADD CONSTRAINT \`FK_25aa840da1be54298de429413ce\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_8fecb997e12799d3925f10ce530\` FOREIGN KEY (\`lecturer_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_61b705e97f03cb428ad727922cc\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_62f945a7c2f0cce3459595bd30f\` FOREIGN KEY (\`attachment\`) REFERENCES \`attachments\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`erepositories\` ADD CONSTRAINT \`FK_3cf20fa414914ae683ed8bde242\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_f4a7e35e04214272c4df738b09a\` FOREIGN KEY (\`approver_id\`) REFERENCES \`lecturers\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`user_approvers\` ADD CONSTRAINT \`FK_d2436ae24d79eaeab870d202d13\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
