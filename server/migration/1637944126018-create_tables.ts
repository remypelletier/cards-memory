import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1637944126018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE user_role
            (
                code    varchar(64),
                label   varchar(64) NOT NULL,

                PRIMARY KEY (code)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE user
            (
                id                                          int AUTO_INCREMENT,
                first_name                                   varchar(64),
                last_name                                    varchar(64),
                email                                       varchar(256) NOT NULL UNIQUE,
                password                                    varchar(256) NOT NULL,
                reset_password_link                           varchar(256),
                reset_password_link_expiration_timestamp        int,
                picture_name                                 varchar(256),
                average_answer_time_in_seconds                  int,
                user_role_code                                varchar(64),

                PRIMARY KEY (id),
                FOREIGN KEY (user_role_code) REFERENCES user_role(code)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE deck
            (
                id		int AUTO_INCREMENT,
                name	varchar(256) NOT NULL,
                user_id	int,
                
                PRIMARY KEY(id),
                FOREIGN KEY(user_id) REFERENCES user(id)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE card
            (
                id		int AUTO_INCREMENT,
                name	varchar(256) NOT NULL,
                answer	text NOT NULL,
                deck_id	int,
                
                PRIMARY KEY(id),
                FOREIGN KEY(deck_id) REFERENCES deck(id)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE answer_category
            (
                code	varchar(64),
                label	varchar(256) NOT NULL,
                
                PRIMARY KEY(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE test_category
            (
                code	varchar(64),
                label	varchar(256) NOT NULL,
                
                PRIMARY KEY(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE test
            (
                id					int AUTO_INCREMENT,
                test_category_code 	varchar(64),
                
                PRIMARY KEY(id),
                FOREIGN KEY(test_category_code) REFERENCES test_category(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE answer
            (
                card_id		            int,
                test_id		            int,
                answer_category_code	varchar(64),
                date		            DATETIME,
                
                PRIMARY KEY(card_id, test_id, answer_category_code),
                
                FOREIGN KEY(card_id) REFERENCES card(id),
                FOREIGN KEY(test_id) REFERENCES test(id),
                FOREIGN KEY(answer_category_code) REFERENCES answer_category(code)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE answer;`);
        await queryRunner.query(`DROP TABLE card;`);
        await queryRunner.query(`DROP TABLE deck;`);
        await queryRunner.query(`DROP TABLE user;`);
        await queryRunner.query(`DROP TABLE user_role;`);
        await queryRunner.query(`DROP TABLE test;`);
        await queryRunner.query(`DROP TABLE test_category;`);
        await queryRunner.query(`DROP TABLE answer_category;`);
    }

}
