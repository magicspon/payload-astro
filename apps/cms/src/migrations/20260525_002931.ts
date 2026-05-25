import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "menu_id" uuid;
  ALTER TABLE "_pages_v" ADD COLUMN "version_menu_id" uuid;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_menu_id_navigation_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."navigation"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_menu_id_navigation_id_fk" FOREIGN KEY ("version_menu_id") REFERENCES "public"."navigation"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_menu_idx" ON "pages" USING btree ("menu_id");
  CREATE INDEX "_pages_v_version_version_menu_idx" ON "_pages_v" USING btree ("version_menu_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_menu_id_navigation_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_menu_id_navigation_id_fk";
  
  DROP INDEX "pages_menu_idx";
  DROP INDEX "_pages_v_version_version_menu_idx";
  ALTER TABLE "pages" DROP COLUMN "menu_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_menu_id";`)
}
