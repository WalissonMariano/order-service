import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableItems1721784345575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        
        CREATE TABLE public.items (
                id integer NOT NULL,
                number_item integer NOT NULL,
                items_description character varying NOT NULL,
                id_type_of_items integer NOT NULL,
                quantity double precision NOT NULL,
                unit_value double precision NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                update_at timestamp without time zone DEFAULT now() NOT NULL,
                PRIMARY KEY (id)
            );
        
        CREATE SEQUENCE public.items_id_seq
            INCREMENT 1
            START 1
            MINVALUE 1
            MAXVALUE 2147483647
            CACHE 1;
            
        ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;

        ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE public.items
        `);
  }
}
