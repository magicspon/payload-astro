import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu_item_rels" ADD COLUMN "posts_id" uuid;
  ALTER TABLE "menu_item_rels" ADD CONSTRAINT "menu_item_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "menu_item_rels_posts_id_idx" ON "menu_item_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu_item_rels" DROP CONSTRAINT "menu_item_rels_posts_fk";
  
  DROP INDEX "menu_item_rels_posts_id_idx";
  ALTER TABLE "menu_item_rels" DROP COLUMN "posts_id";`)
}
