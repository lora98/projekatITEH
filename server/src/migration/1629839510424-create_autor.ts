import {MigrationInterface, QueryRunner} from "typeorm";

export class createAutor1629839510424 implements MigrationInterface {
    name = 'createAutor1629839510424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`autor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ime\` varchar(255) NOT NULL, \`prezime\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`projekat\`.\`autor\``);
    }

}
