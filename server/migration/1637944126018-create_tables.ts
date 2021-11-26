import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1637944126018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Role
            (
                code    varchar(64),
                label   varchar(64) NOT NULL,

                PRIMARY KEY (code)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE User
            (
                id                                          int AUTO_INCREMENT,
                first_name                                  varchar(64),
                last_name                                   varchar(64),
                email                                       varchar(256) NOT NULL,
                password                                    varchar(256) NOT NULL,
                reset_password_link                         varchar(256),
                reset_password_link_expiration_timestamp    int,
                picture_name                                varchar(256),
                average_answer_time_in_seconds              int,
                role_code                                   varchar(64),

                PRIMARY KEY (id),
                FOREIGN KEY (role_code) REFERENCES Role(code)
            );
        `);
        await queryRunner.query(`
            CREATE TABLE Deck
            (
                id		int AUTO_INCREMENT,
                name	varchar(256) NOT NULL,
                user_id	int,
                
                PRIMARY KEY(id),
                FOREIGN KEY(user_id) REFERENCES User(id)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE Card
            (
                id		int AUTO_INCREMENT,
                name	varchar(256) NOT NULL,
                answer	text NOT NULL,
                deck_id	int,
                
                PRIMARY KEY(id),
                FOREIGN KEY(deck_id) REFERENCES Deck(id)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE AnswerCategory
            (
                code	varchar(64),
                label	varchar(256) NOT NULL,
                
                PRIMARY KEY(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE TestCategory
            (
                code	varchar(64),
                label	varchar(256) NOT NULL,
                
                PRIMARY KEY(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE Test
            (
                id					int AUTO_INCREMENT,
                test_category_code 	varchar(64),
                
                PRIMARY KEY(id),
                FOREIGN KEY(test_category_code) REFERENCES TestCategory(code)
            );
        `)
        await queryRunner.query(`
            CREATE TABLE Answer
            (
                card_id		            int,
                test_id		            int,
                answer_category_code	varchar(64),
                date		            DATETIME,
                
                PRIMARY KEY(card_id, test_id, answer_category_code),
                
                FOREIGN KEY(card_id) REFERENCES Card(id),
                FOREIGN KEY(test_id) REFERENCES Test(id),
                FOREIGN KEY(answer_category_code) REFERENCES AnswerCategory(code)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE Answer;`);
        await queryRunner.query(`DROP TABLE Card;`);
        await queryRunner.query(`DROP TABLE Deck;`);
        await queryRunner.query(`DROP TABLE User;`);
        await queryRunner.query(`DROP TABLE Role;`);
        await queryRunner.query(`DROP TABLE Test;`);
        await queryRunner.query(`DROP TABLE TestCategory;`);
        await queryRunner.query(`DROP TABLE AnswerCategory;`);
    }

}
