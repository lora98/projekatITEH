import {MigrationInterface, QueryRunner} from "typeorm";

export class createZanr1629839458926 implements MigrationInterface {
    name = 'createZanr1629839458926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`zanr\` (\`id\` int NOT NULL AUTO_INCREMENT, \`naziv\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`projekat\`.\`zanr\``);
    }

}
