import {MigrationInterface, QueryRunner} from "typeorm";

export class createKnjiga1629839548264 implements MigrationInterface {
    name = 'createKnjiga1629839548264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`knjiga\` (\`id\` int NOT NULL AUTO_INCREMENT, \`naziv\` varchar(255) NOT NULL, \`brojStrana\` int NOT NULL, \`fajl\` varchar(255) NOT NULL, \`slika\` varchar(255) NOT NULL, \`cena\` int NOT NULL, \`zanrId\` int NULL, \`kreiraoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`autorstvo\` (\`knjigaId\` int NOT NULL, \`autorId\` int NOT NULL, INDEX \`IDX_48abf5d1d53b04cbdd4875ea69\` (\`knjigaId\`), INDEX \`IDX_c202a180c24b61b80bcd46b156\` (\`autorId\`), PRIMARY KEY (\`knjigaId\`, \`autorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_b294e253b475146541c6100c425\` FOREIGN KEY (\`zanrId\`) REFERENCES \`projekat\`.\`zanr\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_0bd24564f5128582ce43de666da\` FOREIGN KEY (\`kreiraoId\`) REFERENCES \`projekat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`autorstvo\` ADD CONSTRAINT \`FK_48abf5d1d53b04cbdd4875ea690\` FOREIGN KEY (\`knjigaId\`) REFERENCES \`projekat\`.\`knjiga\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`autorstvo\` ADD CONSTRAINT \`FK_c202a180c24b61b80bcd46b1561\` FOREIGN KEY (\`autorId\`) REFERENCES \`projekat\`.\`autor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`autorstvo\` DROP FOREIGN KEY \`FK_c202a180c24b61b80bcd46b1561\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`autorstvo\` DROP FOREIGN KEY \`FK_48abf5d1d53b04cbdd4875ea690\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_0bd24564f5128582ce43de666da\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_b294e253b475146541c6100c425\``);
        await queryRunner.query(`DROP INDEX \`IDX_c202a180c24b61b80bcd46b156\` ON \`projekat\`.\`autorstvo\``);
        await queryRunner.query(`DROP INDEX \`IDX_48abf5d1d53b04cbdd4875ea69\` ON \`projekat\`.\`autorstvo\``);
        await queryRunner.query(`DROP TABLE \`projekat\`.\`autorstvo\``);
        await queryRunner.query(`DROP TABLE \`projekat\`.\`knjiga\``);
    }

}
