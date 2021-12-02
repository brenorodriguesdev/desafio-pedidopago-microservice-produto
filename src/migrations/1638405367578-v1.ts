import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class v11638405367578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "ingrediente",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "nome",
                    type: "varchar",
                }
            ]
        }), true)
        

        await queryRunner.createTable(new Table({
            name: "produto",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "thumbnail",
                    type: "varchar",
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "preco",
                    type: "varchar",
                },
                {
                    name: "disponibilidade",
                    type: "varchar",
                },
                {
                    name: "volume",
                    type: "varchar",
                },
                {
                    name: "outros",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "produtoIngrediente",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                }
            ]
        }), true);

        await queryRunner.addColumn("produtoIngrediente", new TableColumn({
            name: "idIngrediente",
            type: "int"
        }));

        await queryRunner.createForeignKey("produtoIngrediente", new TableForeignKey({
            columnNames: ["idIngrediente"],
            referencedColumnNames: ["id"],
            referencedTableName: "ingrediente",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("produtoIngrediente", new TableColumn({
            name: "idProduto",
            type: "int"
        }));

        await queryRunner.createForeignKey("produtoIngrediente", new TableForeignKey({
            columnNames: ["idProduto"],
            referencedColumnNames: ["id"],
            referencedTableName: "produto",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("produtoIngrediente");
        const foreignKeyProduto = table.foreignKeys.find(fk => fk.columnNames.indexOf("idProduto") !== -1);
        await queryRunner.dropForeignKey("produtoIngrediente", foreignKeyProduto);

        const foreignKeyIngrediente = table.foreignKeys.find(fk => fk.columnNames.indexOf("idIngrediente") !== -1);
        await queryRunner.dropForeignKey("produtoIngrediente", foreignKeyIngrediente);

        await queryRunner.dropColumn("produtoIngrediente", "idProduto");
        await queryRunner.dropColumn("produtoIngrediente", "idIngrediente");

        await queryRunner.dropTable("produto");
        await queryRunner.dropTable("ingrediente");
    }

}
