import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_group" CASCADE;
  DROP TABLE "_pages_v_blocks_group" CASCADE;
  DROP TABLE "home_blocks_group" CASCADE;
  DROP TABLE "_home_v_blocks_group" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_group_variant";
  DROP TYPE "public"."enum__pages_v_blocks_group_variant";
  DROP TYPE "public"."enum_home_blocks_group_variant";
  DROP TYPE "public"."enum__home_v_blocks_group_variant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TABLE "pages_blocks_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_group_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_group_variant" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_group_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_group_variant" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_group" ADD CONSTRAINT "pages_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group" ADD CONSTRAINT "_pages_v_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_group" ADD CONSTRAINT "home_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_group" ADD CONSTRAINT "_home_v_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_group_order_idx" ON "pages_blocks_group" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_parent_id_idx" ON "pages_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_path_idx" ON "pages_blocks_group" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_order_idx" ON "_pages_v_blocks_group" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_parent_id_idx" ON "_pages_v_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_path_idx" ON "_pages_v_blocks_group" USING btree ("_path");
  CREATE INDEX "home_blocks_group_order_idx" ON "home_blocks_group" USING btree ("_order");
  CREATE INDEX "home_blocks_group_parent_id_idx" ON "home_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_group_path_idx" ON "home_blocks_group" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_group_order_idx" ON "_home_v_blocks_group" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_group_parent_id_idx" ON "_home_v_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_group_path_idx" ON "_home_v_blocks_group" USING btree ("_path");`)
}
