import {MigrationInterface, QueryRunner} from "typeorm";

export class createKorpa1629839590197 implements MigrationInterface {
    name = 'createKorpa1629839590197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`stavka\` (\`id\` int NOT NULL AUTO_INCREMENT, \`kolicina\` int NOT NULL, \`korpaId\` int NOT NULL, \`knjigaId\` int NULL, PRIMARY KEY (\`id\`, \`korpaId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projekat\`.\`korpa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`poslata\` tinyint NOT NULL, \`adresa\` varchar(255) NOT NULL, \`telefon\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_b294e253b475146541c6100c425\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_0bd24564f5128582ce43de666da\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` CHANGE \`zanrId\` \`zanrId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` CHANGE \`kreiraoId\` \`kreiraoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_b294e253b475146541c6100c425\` FOREIGN KEY (\`zanrId\`) REFERENCES \`projekat\`.\`zanr\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_0bd24564f5128582ce43de666da\` FOREIGN KEY (\`kreiraoId\`) REFERENCES \`projekat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`stavka\` ADD CONSTRAINT \`FK_b147ad90bc0f031fb9c545acbe1\` FOREIGN KEY (\`korpaId\`) REFERENCES \`projekat\`.\`korpa\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`stavka\` ADD CONSTRAINT \`FK_8ae15742adacb133929d37316af\` FOREIGN KEY (\`knjigaId\`) REFERENCES \`projekat\`.\`knjiga\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`korpa\` ADD CONSTRAINT \`FK_2815295f3b650447330a4171dd5\` FOREIGN KEY (\`userId\`) REFERENCES \`projekat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`korpa\` DROP FOREIGN KEY \`FK_2815295f3b650447330a4171dd5\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`stavka\` DROP FOREIGN KEY \`FK_8ae15742adacb133929d37316af\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`stavka\` DROP FOREIGN KEY \`FK_b147ad90bc0f031fb9c545acbe1\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_0bd24564f5128582ce43de666da\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` DROP FOREIGN KEY \`FK_b294e253b475146541c6100c425\``);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` CHANGE \`kreiraoId\` \`kreiraoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` CHANGE \`zanrId\` \`zanrId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_0bd24564f5128582ce43de666da\` FOREIGN KEY (\`kreiraoId\`) REFERENCES \`projekat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`projekat\`.\`knjiga\` ADD CONSTRAINT \`FK_b294e253b475146541c6100c425\` FOREIGN KEY (\`zanrId\`) REFERENCES \`projekat\`.\`zanr\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`projekat\`.\`korpa\``);
        await queryRunner.query(`DROP TABLE \`projekat\`.\`stavka\``);
    }

}
