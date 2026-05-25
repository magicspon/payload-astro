import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_fit" AS ENUM('cover', 'contain', 'fill', 'inside', 'outside');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_hero_theme" AS ENUM('light', 'dark', 'primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_text_block_buttons_button_type" AS ENUM('url', 'internal', 'email', 'tel', 'download', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_text_block_buttons_button_variant" AS ENUM('default', 'ghost', 'link', 'outline', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_text_block_buttons_button_target" AS ENUM('_blank');
  CREATE TYPE "public"."enum_pages_blocks_text_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_form_block_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_related_blocks_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_image_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_listing_list" AS ENUM('pages', 'posts', 'children');
  CREATE TYPE "public"."enum_pages_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('default', 'article', 'listing', 'contact');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_theme" AS ENUM('light', 'dark', 'primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_type" AS ENUM('url', 'internal', 'email', 'tel', 'download', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_variant" AS ENUM('default', 'ghost', 'link', 'outline', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_target" AS ENUM('_blank');
  CREATE TYPE "public"."enum__pages_v_blocks_text_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_related_blocks_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_image_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_version_listing_list" AS ENUM('pages', 'posts', 'children');
  CREATE TYPE "public"."enum__pages_v_version_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('default', 'article', 'listing', 'contact');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'contributor', 'member', 'user');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('redirect', 'message');
  CREATE TYPE "public"."enum_forms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__forms_v_version_confirmation_type" AS ENUM('redirect', 'message');
  CREATE TYPE "public"."enum__forms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__submissions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menu_item_type" AS ENUM('url', 'internal', 'custom', 'passive');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_home_blocks_hero_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_hero_theme" AS ENUM('light', 'dark', 'primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_text_block_buttons_button_type" AS ENUM('url', 'internal', 'email', 'tel', 'download', 'custom');
  CREATE TYPE "public"."enum_home_blocks_text_block_buttons_button_variant" AS ENUM('default', 'ghost', 'link', 'outline', 'secondary');
  CREATE TYPE "public"."enum_home_blocks_text_block_buttons_button_target" AS ENUM('_blank');
  CREATE TYPE "public"."enum_home_blocks_text_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_form_block_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_home_blocks_related_blocks_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_image_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_home_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_blocks_hero_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_hero_theme" AS ENUM('light', 'dark', 'primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_text_block_buttons_button_type" AS ENUM('url', 'internal', 'email', 'tel', 'download', 'custom');
  CREATE TYPE "public"."enum__home_v_blocks_text_block_buttons_button_variant" AS ENUM('default', 'ghost', 'link', 'outline', 'secondary');
  CREATE TYPE "public"."enum__home_v_blocks_text_block_buttons_button_target" AS ENUM('_blank');
  CREATE TYPE "public"."enum__home_v_blocks_text_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_form_block_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__home_v_blocks_related_blocks_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_image_block_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_blocks_group_variant" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__home_v_version_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_settings_meta_twitter_card" AS ENUM('summary', 'summary_large_image', 'app', 'player');
  CREATE TABLE "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"quality" numeric DEFAULT 80,
  	"optimise" boolean DEFAULT true,
  	"resize_width" numeric,
  	"resize_height" numeric,
  	"fit" "enum_media_fit" DEFAULT 'cover',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'primary',
  	"theme" "enum_pages_blocks_hero_theme" DEFAULT 'light',
  	"title" varchar,
  	"content" jsonb,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_pages_blocks_text_block_buttons_button_type" DEFAULT 'url',
  	"button_url" varchar,
  	"button_email" varchar,
  	"button_tel" varchar,
  	"button_custom" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"button_variant" "enum_pages_blocks_text_block_buttons_button_variant" DEFAULT 'default',
  	"button_target" "enum_pages_blocks_text_block_buttons_button_target"
  );
  
  CREATE TABLE "pages_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_text_block_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_form_block_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_related_blocks_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_image_block_variant" DEFAULT 'primary',
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_group" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_group_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "lngAlts" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"href_lang" varchar NOT NULL
  );
  
  CREATE TABLE "pages_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"locale" varchar
  );
  
  CREATE TABLE "pages_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar
  );
  
  CREATE TABLE "pages_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar
  );
  
  CREATE TABLE "pages_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" uuid,
  	"listing_list" "enum_pages_listing_list",
  	"listing_limit" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"meta_canonical" varchar,
  	"meta_robots_nofollow" boolean DEFAULT false,
  	"meta_robots_noindex" boolean DEFAULT false,
  	"meta_robots_noarchive" boolean DEFAULT false,
  	"meta_robots_nocache" boolean DEFAULT false,
  	"meta_robots_extras" varchar,
  	"meta_open_graph_basic_title" varchar,
  	"meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"meta_open_graph_basic_image_id" uuid,
  	"meta_open_graph_basic_url" varchar,
  	"meta_open_graph_optional_audio" varchar,
  	"meta_open_graph_optional_description" varchar,
  	"meta_open_graph_optional_determiner" varchar,
  	"meta_open_graph_optional_locale" varchar,
  	"meta_open_graph_optional_site_name" varchar,
  	"meta_open_graph_optional_video" varchar,
  	"meta_open_graph_image_type" varchar,
  	"meta_open_graph_image_width" numeric,
  	"meta_open_graph_image_height" numeric,
  	"meta_open_graph_image_alt" varchar,
  	"meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"meta_open_graph_article_section" varchar,
  	"meta_twitter_card" "enum_pages_meta_twitter_card",
  	"meta_twitter_site" varchar,
  	"meta_twitter_creator" varchar,
  	"meta_twitter_title" varchar,
  	"meta_twitter_description" varchar,
  	"meta_twitter_image_id" uuid,
  	"meta_twitter_image_alt" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"template" "enum_pages_template",
  	"author_id" uuid,
  	"parent_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"media_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'primary',
  	"theme" "enum__pages_v_blocks_hero_theme" DEFAULT 'light',
  	"title" varchar,
  	"content" jsonb,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"button_type" "enum__pages_v_blocks_text_block_buttons_button_type" DEFAULT 'url',
  	"button_url" varchar,
  	"button_email" varchar,
  	"button_tel" varchar,
  	"button_custom" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"button_variant" "enum__pages_v_blocks_text_block_buttons_button_variant" DEFAULT 'default',
  	"button_target" "enum__pages_v_blocks_text_block_buttons_button_target",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_text_block_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_form_block_variant" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_related_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_related_blocks_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__pages_v_blocks_image_block_variant" DEFAULT 'primary',
  	"image_id" uuid,
  	"_uuid" varchar,
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
  
  CREATE TABLE "_lngAlts_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"href" varchar,
  	"href_lang" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"locale" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"author" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_image_id" uuid,
  	"version_listing_list" "enum__pages_v_version_listing_list",
  	"version_listing_limit" numeric,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_canonical" varchar,
  	"version_meta_robots_nofollow" boolean DEFAULT false,
  	"version_meta_robots_noindex" boolean DEFAULT false,
  	"version_meta_robots_noarchive" boolean DEFAULT false,
  	"version_meta_robots_nocache" boolean DEFAULT false,
  	"version_meta_robots_extras" varchar,
  	"version_meta_open_graph_basic_title" varchar,
  	"version_meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"version_meta_open_graph_basic_image_id" uuid,
  	"version_meta_open_graph_basic_url" varchar,
  	"version_meta_open_graph_optional_audio" varchar,
  	"version_meta_open_graph_optional_description" varchar,
  	"version_meta_open_graph_optional_determiner" varchar,
  	"version_meta_open_graph_optional_locale" varchar,
  	"version_meta_open_graph_optional_site_name" varchar,
  	"version_meta_open_graph_optional_video" varchar,
  	"version_meta_open_graph_image_type" varchar,
  	"version_meta_open_graph_image_width" numeric,
  	"version_meta_open_graph_image_height" numeric,
  	"version_meta_open_graph_image_alt" varchar,
  	"version_meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_section" varchar,
  	"version_meta_twitter_card" "enum__pages_v_version_meta_twitter_card",
  	"version_meta_twitter_site" varchar,
  	"version_meta_twitter_creator" varchar,
  	"version_meta_twitter_title" varchar,
  	"version_meta_twitter_description" varchar,
  	"version_meta_twitter_image_id" uuid,
  	"version_meta_twitter_image_alt" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_template" "enum__pages_v_version_template",
  	"version_author_id" uuid,
  	"version_parent_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"media_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE "posts_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"locale" varchar
  );
  
  CREATE TABLE "posts_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar
  );
  
  CREATE TABLE "posts_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar
  );
  
  CREATE TABLE "posts_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"meta_canonical" varchar,
  	"meta_robots_nofollow" boolean DEFAULT false,
  	"meta_robots_noindex" boolean DEFAULT false,
  	"meta_robots_noarchive" boolean DEFAULT false,
  	"meta_robots_nocache" boolean DEFAULT false,
  	"meta_robots_extras" varchar,
  	"meta_open_graph_basic_title" varchar,
  	"meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"meta_open_graph_basic_image_id" uuid,
  	"meta_open_graph_basic_url" varchar,
  	"meta_open_graph_optional_audio" varchar,
  	"meta_open_graph_optional_description" varchar,
  	"meta_open_graph_optional_determiner" varchar,
  	"meta_open_graph_optional_locale" varchar,
  	"meta_open_graph_optional_site_name" varchar,
  	"meta_open_graph_optional_video" varchar,
  	"meta_open_graph_image_type" varchar,
  	"meta_open_graph_image_width" numeric,
  	"meta_open_graph_image_height" numeric,
  	"meta_open_graph_image_alt" varchar,
  	"meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"meta_open_graph_article_section" varchar,
  	"meta_twitter_card" "enum_posts_meta_twitter_card",
  	"meta_twitter_site" varchar,
  	"meta_twitter_creator" varchar,
  	"meta_twitter_title" varchar,
  	"meta_twitter_description" varchar,
  	"meta_twitter_image_id" uuid,
  	"meta_twitter_image_alt" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"author_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_version_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"locale" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"author" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_canonical" varchar,
  	"version_meta_robots_nofollow" boolean DEFAULT false,
  	"version_meta_robots_noindex" boolean DEFAULT false,
  	"version_meta_robots_noarchive" boolean DEFAULT false,
  	"version_meta_robots_nocache" boolean DEFAULT false,
  	"version_meta_robots_extras" varchar,
  	"version_meta_open_graph_basic_title" varchar,
  	"version_meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"version_meta_open_graph_basic_image_id" uuid,
  	"version_meta_open_graph_basic_url" varchar,
  	"version_meta_open_graph_optional_audio" varchar,
  	"version_meta_open_graph_optional_description" varchar,
  	"version_meta_open_graph_optional_determiner" varchar,
  	"version_meta_open_graph_optional_locale" varchar,
  	"version_meta_open_graph_optional_site_name" varchar,
  	"version_meta_open_graph_optional_video" varchar,
  	"version_meta_open_graph_image_type" varchar,
  	"version_meta_open_graph_image_width" numeric,
  	"version_meta_open_graph_image_height" numeric,
  	"version_meta_open_graph_image_alt" varchar,
  	"version_meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_section" varchar,
  	"version_meta_twitter_card" "enum__posts_v_version_meta_twitter_card",
  	"version_meta_twitter_site" varchar,
  	"version_meta_twitter_creator" varchar,
  	"version_meta_twitter_title" varchar,
  	"version_meta_twitter_description" varchar,
  	"version_meta_twitter_image_id" uuid,
  	"version_meta_twitter_image_alt" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_author_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"image" varchar,
  	"role" "enum_users_role" DEFAULT 'user',
  	"email_verified" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sessions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"token" varchar NOT NULL,
  	"ip_address" varchar,
  	"user_agent" varchar,
  	"user_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "accounts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"account_id" varchar NOT NULL,
  	"provider_id" varchar NOT NULL,
  	"user_id" uuid NOT NULL,
  	"access_token" varchar,
  	"refresh_token" varchar,
  	"id_token" varchar,
  	"access_token_expires_at" timestamp(3) with time zone,
  	"refresh_token_expires_at" timestamp(3) with time zone,
  	"scope" varchar,
  	"password" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "verifications" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"identifier" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "passkeys" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"public_key" varchar NOT NULL,
  	"user_id" uuid NOT NULL,
  	"credential_i_d" varchar NOT NULL,
  	"counter" numeric NOT NULL,
  	"device_type" varchar NOT NULL,
  	"backed_up" boolean DEFAULT false NOT NULL,
  	"transports" varchar,
  	"aaguid" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_notification" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"subject" varchar,
  	"message" jsonb,
  	"conditions" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"locked" boolean,
  	"pages" jsonb,
  	"confirmation_type" "enum_forms_confirmation_type",
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"form_schema" jsonb,
  	"identifier_field" varchar,
  	"rich_text" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_forms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_forms_v_version_notification" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"email" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"subject" varchar,
  	"message" jsonb,
  	"conditions" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_forms_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_locked" boolean,
  	"version_pages" jsonb,
  	"version_confirmation_type" "enum__forms_v_version_confirmation_type",
  	"version_confirmation_message" jsonb,
  	"version_redirect_url" varchar,
  	"version_form_schema" jsonb,
  	"version_identifier_field" varchar,
  	"version_rich_text" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__forms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "submissions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"identifier" varchar,
  	"form_id" uuid,
  	"submission_data" jsonb,
  	"form_snapshot" jsonb,
  	"user_agent" varchar,
  	"ip_address" varchar,
  	"file_uploads" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_submissions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_submissions_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_identifier" varchar,
  	"version_form_id" uuid,
  	"version_submission_data" jsonb,
  	"version_form_snapshot" jsonb,
  	"version_user_agent" varchar,
  	"version_ip_address" varchar,
  	"version_file_uploads" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__submissions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "form_uploads" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"form_id" uuid,
  	"submission_id" uuid,
  	"field_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "navigation" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"items" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_item" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_order" varchar,
  	"type" "enum_menu_item_type" DEFAULT 'url',
  	"title" varchar NOT NULL,
  	"navigation_id" uuid NOT NULL,
  	"parent_id" uuid,
  	"url" varchar,
  	"custom" varchar,
  	"passive" varchar,
  	"collapsed" boolean DEFAULT false,
  	"depth" numeric DEFAULT 0,
  	"href" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_item_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid
  );
  
  CREATE TABLE "payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" uuid,
  	"pages_id" uuid,
  	"posts_id" uuid,
  	"users_id" uuid,
  	"sessions_id" uuid,
  	"accounts_id" uuid,
  	"verifications_id" uuid,
  	"passkeys_id" uuid,
  	"forms_id" uuid,
  	"submissions_id" uuid,
  	"form_uploads_id" uuid,
  	"navigation_id" uuid,
  	"menu_item_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_hero_variant" DEFAULT 'primary',
  	"theme" "enum_home_blocks_hero_theme" DEFAULT 'light',
  	"title" varchar,
  	"content" jsonb,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_text_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_type" "enum_home_blocks_text_block_buttons_button_type" DEFAULT 'url',
  	"button_url" varchar,
  	"button_email" varchar,
  	"button_tel" varchar,
  	"button_custom" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"button_variant" "enum_home_blocks_text_block_buttons_button_variant" DEFAULT 'default',
  	"button_target" "enum_home_blocks_text_block_buttons_button_target"
  );
  
  CREATE TABLE "home_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_text_block_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_form_block_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_related_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_related_blocks_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_home_blocks_image_block_variant" DEFAULT 'primary',
  	"image_id" uuid,
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
  
  CREATE TABLE "home_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"locale" varchar
  );
  
  CREATE TABLE "home_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar
  );
  
  CREATE TABLE "home_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "home_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar
  );
  
  CREATE TABLE "home_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "home" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"meta_canonical" varchar,
  	"meta_robots_nofollow" boolean DEFAULT false,
  	"meta_robots_noindex" boolean DEFAULT false,
  	"meta_robots_noarchive" boolean DEFAULT false,
  	"meta_robots_nocache" boolean DEFAULT false,
  	"meta_robots_extras" varchar,
  	"meta_open_graph_basic_title" varchar,
  	"meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"meta_open_graph_basic_image_id" uuid,
  	"meta_open_graph_basic_url" varchar,
  	"meta_open_graph_optional_audio" varchar,
  	"meta_open_graph_optional_description" varchar,
  	"meta_open_graph_optional_determiner" varchar,
  	"meta_open_graph_optional_locale" varchar,
  	"meta_open_graph_optional_site_name" varchar,
  	"meta_open_graph_optional_video" varchar,
  	"meta_open_graph_image_type" varchar,
  	"meta_open_graph_image_width" numeric,
  	"meta_open_graph_image_height" numeric,
  	"meta_open_graph_image_alt" varchar,
  	"meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"meta_open_graph_article_section" varchar,
  	"meta_twitter_card" "enum_home_meta_twitter_card",
  	"meta_twitter_site" varchar,
  	"meta_twitter_creator" varchar,
  	"meta_twitter_title" varchar,
  	"meta_twitter_description" varchar,
  	"meta_twitter_image_id" uuid,
  	"meta_twitter_image_alt" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"media_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE "_home_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_hero_variant" DEFAULT 'primary',
  	"theme" "enum__home_v_blocks_hero_theme" DEFAULT 'light',
  	"title" varchar,
  	"content" jsonb,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_text_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"button_type" "enum__home_v_blocks_text_block_buttons_button_type" DEFAULT 'url',
  	"button_url" varchar,
  	"button_email" varchar,
  	"button_tel" varchar,
  	"button_custom" varchar,
  	"button_text" varchar,
  	"button_href" varchar,
  	"button_variant" "enum__home_v_blocks_text_block_buttons_button_variant" DEFAULT 'default',
  	"button_target" "enum__home_v_blocks_text_block_buttons_button_target",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_text_block_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_form_block_variant" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_related_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_related_blocks_variant" DEFAULT 'primary',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"variant" "enum__home_v_blocks_image_block_variant" DEFAULT 'primary',
  	"image_id" uuid,
  	"_uuid" varchar,
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
  
  CREATE TABLE "_home_v_version_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"locale" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"author" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_canonical" varchar,
  	"version_meta_robots_nofollow" boolean DEFAULT false,
  	"version_meta_robots_noindex" boolean DEFAULT false,
  	"version_meta_robots_noarchive" boolean DEFAULT false,
  	"version_meta_robots_nocache" boolean DEFAULT false,
  	"version_meta_robots_extras" varchar,
  	"version_meta_open_graph_basic_title" varchar,
  	"version_meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"version_meta_open_graph_basic_image_id" uuid,
  	"version_meta_open_graph_basic_url" varchar,
  	"version_meta_open_graph_optional_audio" varchar,
  	"version_meta_open_graph_optional_description" varchar,
  	"version_meta_open_graph_optional_determiner" varchar,
  	"version_meta_open_graph_optional_locale" varchar,
  	"version_meta_open_graph_optional_site_name" varchar,
  	"version_meta_open_graph_optional_video" varchar,
  	"version_meta_open_graph_image_type" varchar,
  	"version_meta_open_graph_image_width" numeric,
  	"version_meta_open_graph_image_height" numeric,
  	"version_meta_open_graph_image_alt" varchar,
  	"version_meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"version_meta_open_graph_article_section" varchar,
  	"version_meta_twitter_card" "enum__home_v_version_meta_twitter_card",
  	"version_meta_twitter_site" varchar,
  	"version_meta_twitter_creator" varchar,
  	"version_meta_twitter_title" varchar,
  	"version_meta_twitter_description" varchar,
  	"version_meta_twitter_image_id" uuid,
  	"version_meta_twitter_image_alt" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"media_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE "settings_meta_open_graph_optional_locale_alternate" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"locale" varchar NOT NULL
  );
  
  CREATE TABLE "settings_meta_open_graph_article_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL
  );
  
  CREATE TABLE "settings_meta_open_graph_article_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "settings_meta_extend_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rel" varchar,
  	"href" varchar,
  	"hreflang" varchar,
  	"type" varchar
  );
  
  CREATE TABLE "settings_meta_extend_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"property" varchar,
  	"content" varchar
  );
  
  CREATE TABLE "settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"meta_canonical" varchar,
  	"meta_robots_nofollow" boolean DEFAULT false,
  	"meta_robots_noindex" boolean DEFAULT false,
  	"meta_robots_noarchive" boolean DEFAULT false,
  	"meta_robots_nocache" boolean DEFAULT false,
  	"meta_robots_extras" varchar,
  	"meta_open_graph_basic_title" varchar,
  	"meta_open_graph_basic_type" varchar DEFAULT 'website',
  	"meta_open_graph_basic_image_id" uuid,
  	"meta_open_graph_basic_url" varchar,
  	"meta_open_graph_optional_audio" varchar,
  	"meta_open_graph_optional_description" varchar,
  	"meta_open_graph_optional_determiner" varchar,
  	"meta_open_graph_optional_locale" varchar,
  	"meta_open_graph_optional_site_name" varchar,
  	"meta_open_graph_optional_video" varchar,
  	"meta_open_graph_image_type" varchar,
  	"meta_open_graph_image_width" numeric,
  	"meta_open_graph_image_height" numeric,
  	"meta_open_graph_image_alt" varchar,
  	"meta_open_graph_article_published_time" timestamp(3) with time zone,
  	"meta_open_graph_article_modified_time" timestamp(3) with time zone,
  	"meta_open_graph_article_expiration_time" timestamp(3) with time zone,
  	"meta_open_graph_article_section" varchar,
  	"meta_twitter_card" "enum_settings_meta_twitter_card",
  	"meta_twitter_site" varchar,
  	"meta_twitter_creator" varchar,
  	"meta_twitter_title" varchar,
  	"meta_twitter_description" varchar,
  	"meta_twitter_image_id" uuid,
  	"meta_twitter_image_alt" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_block_buttons" ADD CONSTRAINT "pages_blocks_text_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_block" ADD CONSTRAINT "pages_blocks_text_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_block" ADD CONSTRAINT "pages_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_blocks" ADD CONSTRAINT "pages_blocks_related_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group" ADD CONSTRAINT "pages_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lngAlts" ADD CONSTRAINT "lngAlts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "pages_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_meta_open_graph_article_authors" ADD CONSTRAINT "pages_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_meta_open_graph_article_tags" ADD CONSTRAINT "pages_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_meta_extend_link" ADD CONSTRAINT "pages_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_meta_extend_meta" ADD CONSTRAINT "pages_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_block_buttons" ADD CONSTRAINT "_pages_v_blocks_text_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_block" ADD CONSTRAINT "_pages_v_blocks_text_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_text_block" ADD CONSTRAINT "_pages_v_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_related_blocks" ADD CONSTRAINT "_pages_v_blocks_related_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group" ADD CONSTRAINT "_pages_v_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lngAlts_v" ADD CONSTRAINT "_lngAlts_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "_pages_v_version_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_open_graph_article_authors" ADD CONSTRAINT "_pages_v_version_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_open_graph_article_tags" ADD CONSTRAINT "_pages_v_version_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_extend_link" ADD CONSTRAINT "_pages_v_version_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_meta_extend_meta" ADD CONSTRAINT "_pages_v_version_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("version_meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("version_meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "posts_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_open_graph_article_authors" ADD CONSTRAINT "posts_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_open_graph_article_tags" ADD CONSTRAINT "posts_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_extend_link" ADD CONSTRAINT "posts_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_meta_extend_meta" ADD CONSTRAINT "posts_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "_posts_v_version_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_open_graph_article_authors" ADD CONSTRAINT "_posts_v_version_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_open_graph_article_tags" ADD CONSTRAINT "_posts_v_version_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_extend_link" ADD CONSTRAINT "_posts_v_version_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_meta_extend_meta" ADD CONSTRAINT "_posts_v_version_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("version_meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("version_meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "passkeys" ADD CONSTRAINT "passkeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_notification" ADD CONSTRAINT "forms_notification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v_version_notification" ADD CONSTRAINT "_forms_v_version_notification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_forms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_forms_v" ADD CONSTRAINT "_forms_v_parent_id_forms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "submissions" ADD CONSTRAINT "submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_submissions_v" ADD CONSTRAINT "_submissions_v_parent_id_submissions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."submissions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_submissions_v" ADD CONSTRAINT "_submissions_v_version_form_id_forms_id_fk" FOREIGN KEY ("version_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_uploads" ADD CONSTRAINT "form_uploads_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_uploads" ADD CONSTRAINT "form_uploads_submission_id_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submissions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_navigation_id_navigation_id_fk" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_parent_id_menu_item_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_item"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_item_rels" ADD CONSTRAINT "menu_item_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_item_rels" ADD CONSTRAINT "menu_item_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accounts_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_verifications_fk" FOREIGN KEY ("verifications_id") REFERENCES "public"."verifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_passkeys_fk" FOREIGN KEY ("passkeys_id") REFERENCES "public"."passkeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_uploads_fk" FOREIGN KEY ("form_uploads_id") REFERENCES "public"."form_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_fk" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_item_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_hero" ADD CONSTRAINT "home_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_text_block_buttons" ADD CONSTRAINT "home_blocks_text_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_text_block" ADD CONSTRAINT "home_blocks_text_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_text_block" ADD CONSTRAINT "home_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_form_block" ADD CONSTRAINT "home_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_related_blocks" ADD CONSTRAINT "home_blocks_related_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_image_block" ADD CONSTRAINT "home_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_image_block" ADD CONSTRAINT "home_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_group" ADD CONSTRAINT "home_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "home_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meta_open_graph_article_authors" ADD CONSTRAINT "home_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meta_open_graph_article_tags" ADD CONSTRAINT "home_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meta_extend_link" ADD CONSTRAINT "home_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_meta_extend_meta" ADD CONSTRAINT "home_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero" ADD CONSTRAINT "_home_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_hero" ADD CONSTRAINT "_home_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_text_block_buttons" ADD CONSTRAINT "_home_v_blocks_text_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_text_block" ADD CONSTRAINT "_home_v_blocks_text_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_text_block" ADD CONSTRAINT "_home_v_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_form_block" ADD CONSTRAINT "_home_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_related_blocks" ADD CONSTRAINT "_home_v_blocks_related_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_image_block" ADD CONSTRAINT "_home_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_image_block" ADD CONSTRAINT "_home_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_group" ADD CONSTRAINT "_home_v_blocks_group_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "_home_v_version_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_meta_open_graph_article_authors" ADD CONSTRAINT "_home_v_version_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_meta_open_graph_article_tags" ADD CONSTRAINT "_home_v_version_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_meta_extend_link" ADD CONSTRAINT "_home_v_version_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_meta_extend_meta" ADD CONSTRAINT "_home_v_version_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("version_meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("version_meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_meta_open_graph_optional_locale_alternate" ADD CONSTRAINT "settings_meta_open_graph_optional_locale_alternate_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_meta_open_graph_article_authors" ADD CONSTRAINT "settings_meta_open_graph_article_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_meta_open_graph_article_tags" ADD CONSTRAINT "settings_meta_open_graph_article_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_meta_extend_link" ADD CONSTRAINT "settings_meta_extend_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_meta_extend_meta" ADD CONSTRAINT "settings_meta_extend_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_meta_open_graph_basic_image_id_media_id_fk" FOREIGN KEY ("meta_open_graph_basic_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_meta_twitter_image_id_media_id_fk" FOREIGN KEY ("meta_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_text_block_buttons_order_idx" ON "pages_blocks_text_block_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_block_buttons_parent_id_idx" ON "pages_blocks_text_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_block_order_idx" ON "pages_blocks_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_block_parent_id_idx" ON "pages_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_block_path_idx" ON "pages_blocks_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_block_image_idx" ON "pages_blocks_text_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_related_blocks_order_idx" ON "pages_blocks_related_blocks" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_blocks_parent_id_idx" ON "pages_blocks_related_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_blocks_path_idx" ON "pages_blocks_related_blocks" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_block_image_idx" ON "pages_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_group_order_idx" ON "pages_blocks_group" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_parent_id_idx" ON "pages_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_path_idx" ON "pages_blocks_group" USING btree ("_path");
  CREATE INDEX "lngAlts_order_idx" ON "lngAlts" USING btree ("_order");
  CREATE INDEX "lngAlts_parent_id_idx" ON "lngAlts" USING btree ("_parent_id");
  CREATE INDEX "pages_meta_open_graph_optional_locale_alternate_order_idx" ON "pages_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "pages_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "pages_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "pages_meta_open_graph_article_authors_order_idx" ON "pages_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "pages_meta_open_graph_article_authors_parent_id_idx" ON "pages_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "pages_meta_open_graph_article_tags_order_idx" ON "pages_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "pages_meta_open_graph_article_tags_parent_id_idx" ON "pages_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_meta_extend_link_order_idx" ON "pages_meta_extend_link" USING btree ("_order");
  CREATE INDEX "pages_meta_extend_link_parent_id_idx" ON "pages_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "pages_meta_extend_meta_order_idx" ON "pages_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "pages_meta_extend_meta_parent_id_idx" ON "pages_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages__order_idx" ON "pages" USING btree ("_order");
  CREATE INDEX "pages_image_idx" ON "pages" USING btree ("image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_meta_open_graph_basic_meta_open_graph_basic_image_idx" ON "pages" USING btree ("meta_open_graph_basic_image_id");
  CREATE INDEX "pages_meta_twitter_meta_twitter_image_idx" ON "pages" USING btree ("meta_twitter_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_author_idx" ON "pages" USING btree ("author_id");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_text_block_buttons_order_idx" ON "_pages_v_blocks_text_block_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_block_buttons_parent_id_idx" ON "_pages_v_blocks_text_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_block_order_idx" ON "_pages_v_blocks_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_text_block_parent_id_idx" ON "_pages_v_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_text_block_path_idx" ON "_pages_v_blocks_text_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_text_block_image_idx" ON "_pages_v_blocks_text_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_related_blocks_order_idx" ON "_pages_v_blocks_related_blocks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_related_blocks_parent_id_idx" ON "_pages_v_blocks_related_blocks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_related_blocks_path_idx" ON "_pages_v_blocks_related_blocks" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_block_order_idx" ON "_pages_v_blocks_image_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_block_parent_id_idx" ON "_pages_v_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_block_path_idx" ON "_pages_v_blocks_image_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_block_image_idx" ON "_pages_v_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_group_order_idx" ON "_pages_v_blocks_group" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_parent_id_idx" ON "_pages_v_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_path_idx" ON "_pages_v_blocks_group" USING btree ("_path");
  CREATE INDEX "_lngAlts_v_order_idx" ON "_lngAlts_v" USING btree ("_order");
  CREATE INDEX "_lngAlts_v_parent_id_idx" ON "_lngAlts_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_meta_open_graph_optional_locale_alternate_order_idx" ON "_pages_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "_pages_v_version_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "_pages_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_meta_open_graph_article_authors_order_idx" ON "_pages_v_version_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "_pages_v_version_meta_open_graph_article_authors_parent_id_idx" ON "_pages_v_version_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_meta_open_graph_article_tags_order_idx" ON "_pages_v_version_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_version_meta_open_graph_article_tags_parent_id_idx" ON "_pages_v_version_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_meta_extend_link_order_idx" ON "_pages_v_version_meta_extend_link" USING btree ("_order");
  CREATE INDEX "_pages_v_version_meta_extend_link_parent_id_idx" ON "_pages_v_version_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_meta_extend_meta_order_idx" ON "_pages_v_version_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "_pages_v_version_meta_extend_meta_parent_id_idx" ON "_pages_v_version_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version__order_idx" ON "_pages_v" USING btree ("version__order");
  CREATE INDEX "_pages_v_version_version_image_idx" ON "_pages_v" USING btree ("version_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_meta_open_graph_basic_version_meta_open_idx" ON "_pages_v" USING btree ("version_meta_open_graph_basic_image_id");
  CREATE INDEX "_pages_v_version_meta_twitter_version_meta_twitter_image_idx" ON "_pages_v" USING btree ("version_meta_twitter_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_author_idx" ON "_pages_v" USING btree ("version_author_id");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "posts_meta_open_graph_optional_locale_alternate_order_idx" ON "posts_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "posts_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "posts_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "posts_meta_open_graph_article_authors_order_idx" ON "posts_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "posts_meta_open_graph_article_authors_parent_id_idx" ON "posts_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_meta_open_graph_article_tags_order_idx" ON "posts_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "posts_meta_open_graph_article_tags_parent_id_idx" ON "posts_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "posts_meta_extend_link_order_idx" ON "posts_meta_extend_link" USING btree ("_order");
  CREATE INDEX "posts_meta_extend_link_parent_id_idx" ON "posts_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "posts_meta_extend_meta_order_idx" ON "posts_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "posts_meta_extend_meta_parent_id_idx" ON "posts_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_meta_open_graph_basic_meta_open_graph_basic_image_idx" ON "posts" USING btree ("meta_open_graph_basic_image_id");
  CREATE INDEX "posts_meta_twitter_meta_twitter_image_idx" ON "posts" USING btree ("meta_twitter_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_version_meta_open_graph_optional_locale_alternate_order_idx" ON "_posts_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "_posts_v_version_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "_posts_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_meta_open_graph_article_authors_order_idx" ON "_posts_v_version_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_meta_open_graph_article_authors_parent_id_idx" ON "_posts_v_version_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_meta_open_graph_article_tags_order_idx" ON "_posts_v_version_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_meta_open_graph_article_tags_parent_id_idx" ON "_posts_v_version_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_meta_extend_link_order_idx" ON "_posts_v_version_meta_extend_link" USING btree ("_order");
  CREATE INDEX "_posts_v_version_meta_extend_link_parent_id_idx" ON "_posts_v_version_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_meta_extend_meta_order_idx" ON "_posts_v_version_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "_posts_v_version_meta_extend_meta_parent_id_idx" ON "_posts_v_version_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_meta_open_graph_basic_version_meta_open_idx" ON "_posts_v" USING btree ("version_meta_open_graph_basic_image_id");
  CREATE INDEX "_posts_v_version_meta_twitter_version_meta_twitter_image_idx" ON "_posts_v" USING btree ("version_meta_twitter_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "sessions_token_idx" ON "sessions" USING btree ("token");
  CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");
  CREATE INDEX "sessions_updated_at_idx" ON "sessions" USING btree ("updated_at");
  CREATE INDEX "sessions_created_at_idx" ON "sessions" USING btree ("created_at");
  CREATE INDEX "accounts_user_idx" ON "accounts" USING btree ("user_id");
  CREATE INDEX "accounts_updated_at_idx" ON "accounts" USING btree ("updated_at");
  CREATE INDEX "accounts_created_at_idx" ON "accounts" USING btree ("created_at");
  CREATE INDEX "verifications_updated_at_idx" ON "verifications" USING btree ("updated_at");
  CREATE INDEX "verifications_created_at_idx" ON "verifications" USING btree ("created_at");
  CREATE INDEX "passkeys_user_idx" ON "passkeys" USING btree ("user_id");
  CREATE INDEX "passkeys_updated_at_idx" ON "passkeys" USING btree ("updated_at");
  CREATE INDEX "passkeys_created_at_idx" ON "passkeys" USING btree ("created_at");
  CREATE INDEX "forms_notification_order_idx" ON "forms_notification" USING btree ("_order");
  CREATE INDEX "forms_notification_parent_id_idx" ON "forms_notification" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_slug_idx" ON "forms" USING btree ("slug");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "forms__status_idx" ON "forms" USING btree ("_status");
  CREATE INDEX "_forms_v_version_notification_order_idx" ON "_forms_v_version_notification" USING btree ("_order");
  CREATE INDEX "_forms_v_version_notification_parent_id_idx" ON "_forms_v_version_notification" USING btree ("_parent_id");
  CREATE INDEX "_forms_v_parent_idx" ON "_forms_v" USING btree ("parent_id");
  CREATE INDEX "_forms_v_version_version_slug_idx" ON "_forms_v" USING btree ("version_slug");
  CREATE INDEX "_forms_v_version_version_updated_at_idx" ON "_forms_v" USING btree ("version_updated_at");
  CREATE INDEX "_forms_v_version_version_created_at_idx" ON "_forms_v" USING btree ("version_created_at");
  CREATE INDEX "_forms_v_version_version__status_idx" ON "_forms_v" USING btree ("version__status");
  CREATE INDEX "_forms_v_created_at_idx" ON "_forms_v" USING btree ("created_at");
  CREATE INDEX "_forms_v_updated_at_idx" ON "_forms_v" USING btree ("updated_at");
  CREATE INDEX "_forms_v_latest_idx" ON "_forms_v" USING btree ("latest");
  CREATE INDEX "_forms_v_autosave_idx" ON "_forms_v" USING btree ("autosave");
  CREATE INDEX "submissions_form_idx" ON "submissions" USING btree ("form_id");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE INDEX "submissions__status_idx" ON "submissions" USING btree ("_status");
  CREATE INDEX "_submissions_v_parent_idx" ON "_submissions_v" USING btree ("parent_id");
  CREATE INDEX "_submissions_v_version_version_form_idx" ON "_submissions_v" USING btree ("version_form_id");
  CREATE INDEX "_submissions_v_version_version_updated_at_idx" ON "_submissions_v" USING btree ("version_updated_at");
  CREATE INDEX "_submissions_v_version_version_created_at_idx" ON "_submissions_v" USING btree ("version_created_at");
  CREATE INDEX "_submissions_v_version_version__status_idx" ON "_submissions_v" USING btree ("version__status");
  CREATE INDEX "_submissions_v_created_at_idx" ON "_submissions_v" USING btree ("created_at");
  CREATE INDEX "_submissions_v_updated_at_idx" ON "_submissions_v" USING btree ("updated_at");
  CREATE INDEX "_submissions_v_latest_idx" ON "_submissions_v" USING btree ("latest");
  CREATE INDEX "form_uploads_form_idx" ON "form_uploads" USING btree ("form_id");
  CREATE INDEX "form_uploads_submission_idx" ON "form_uploads" USING btree ("submission_id");
  CREATE INDEX "form_uploads_updated_at_idx" ON "form_uploads" USING btree ("updated_at");
  CREATE INDEX "form_uploads_created_at_idx" ON "form_uploads" USING btree ("created_at");
  CREATE UNIQUE INDEX "form_uploads_filename_idx" ON "form_uploads" USING btree ("filename");
  CREATE UNIQUE INDEX "navigation_slug_idx" ON "navigation" USING btree ("slug");
  CREATE INDEX "navigation_updated_at_idx" ON "navigation" USING btree ("updated_at");
  CREATE INDEX "navigation_created_at_idx" ON "navigation" USING btree ("created_at");
  CREATE INDEX "menu_item__order_idx" ON "menu_item" USING btree ("_order");
  CREATE INDEX "menu_item_navigation_idx" ON "menu_item" USING btree ("navigation_id");
  CREATE INDEX "menu_item_parent_idx" ON "menu_item" USING btree ("parent_id");
  CREATE INDEX "menu_item_updated_at_idx" ON "menu_item" USING btree ("updated_at");
  CREATE INDEX "menu_item_created_at_idx" ON "menu_item" USING btree ("created_at");
  CREATE INDEX "menu_item_rels_order_idx" ON "menu_item_rels" USING btree ("order");
  CREATE INDEX "menu_item_rels_parent_idx" ON "menu_item_rels" USING btree ("parent_id");
  CREATE INDEX "menu_item_rels_path_idx" ON "menu_item_rels" USING btree ("path");
  CREATE INDEX "menu_item_rels_pages_id_idx" ON "menu_item_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("sessions_id");
  CREATE INDEX "payload_locked_documents_rels_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("accounts_id");
  CREATE INDEX "payload_locked_documents_rels_verifications_id_idx" ON "payload_locked_documents_rels" USING btree ("verifications_id");
  CREATE INDEX "payload_locked_documents_rels_passkeys_id_idx" ON "payload_locked_documents_rels" USING btree ("passkeys_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_locked_documents_rels_form_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("form_uploads_id");
  CREATE INDEX "payload_locked_documents_rels_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("navigation_id");
  CREATE INDEX "payload_locked_documents_rels_menu_item_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_item_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_blocks_hero_order_idx" ON "home_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_blocks_hero_parent_id_idx" ON "home_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_hero_path_idx" ON "home_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_blocks_hero_image_idx" ON "home_blocks_hero" USING btree ("image_id");
  CREATE INDEX "home_blocks_text_block_buttons_order_idx" ON "home_blocks_text_block_buttons" USING btree ("_order");
  CREATE INDEX "home_blocks_text_block_buttons_parent_id_idx" ON "home_blocks_text_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_text_block_order_idx" ON "home_blocks_text_block" USING btree ("_order");
  CREATE INDEX "home_blocks_text_block_parent_id_idx" ON "home_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_text_block_path_idx" ON "home_blocks_text_block" USING btree ("_path");
  CREATE INDEX "home_blocks_text_block_image_idx" ON "home_blocks_text_block" USING btree ("image_id");
  CREATE INDEX "home_blocks_form_block_order_idx" ON "home_blocks_form_block" USING btree ("_order");
  CREATE INDEX "home_blocks_form_block_parent_id_idx" ON "home_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_form_block_path_idx" ON "home_blocks_form_block" USING btree ("_path");
  CREATE INDEX "home_blocks_related_blocks_order_idx" ON "home_blocks_related_blocks" USING btree ("_order");
  CREATE INDEX "home_blocks_related_blocks_parent_id_idx" ON "home_blocks_related_blocks" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_related_blocks_path_idx" ON "home_blocks_related_blocks" USING btree ("_path");
  CREATE INDEX "home_blocks_image_block_order_idx" ON "home_blocks_image_block" USING btree ("_order");
  CREATE INDEX "home_blocks_image_block_parent_id_idx" ON "home_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_image_block_path_idx" ON "home_blocks_image_block" USING btree ("_path");
  CREATE INDEX "home_blocks_image_block_image_idx" ON "home_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "home_blocks_group_order_idx" ON "home_blocks_group" USING btree ("_order");
  CREATE INDEX "home_blocks_group_parent_id_idx" ON "home_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_group_path_idx" ON "home_blocks_group" USING btree ("_path");
  CREATE INDEX "home_meta_open_graph_optional_locale_alternate_order_idx" ON "home_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "home_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "home_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "home_meta_open_graph_article_authors_order_idx" ON "home_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "home_meta_open_graph_article_authors_parent_id_idx" ON "home_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "home_meta_open_graph_article_tags_order_idx" ON "home_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "home_meta_open_graph_article_tags_parent_id_idx" ON "home_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "home_meta_extend_link_order_idx" ON "home_meta_extend_link" USING btree ("_order");
  CREATE INDEX "home_meta_extend_link_parent_id_idx" ON "home_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "home_meta_extend_meta_order_idx" ON "home_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "home_meta_extend_meta_parent_id_idx" ON "home_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "home_meta_meta_image_idx" ON "home" USING btree ("meta_image_id");
  CREATE INDEX "home_meta_open_graph_basic_meta_open_graph_basic_image_idx" ON "home" USING btree ("meta_open_graph_basic_image_id");
  CREATE INDEX "home_meta_twitter_meta_twitter_image_idx" ON "home" USING btree ("meta_twitter_image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_pages_id_idx" ON "home_rels" USING btree ("pages_id");
  CREATE INDEX "home_rels_media_id_idx" ON "home_rels" USING btree ("media_id");
  CREATE INDEX "home_rels_posts_id_idx" ON "home_rels" USING btree ("posts_id");
  CREATE INDEX "_home_v_blocks_hero_order_idx" ON "_home_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_hero_parent_id_idx" ON "_home_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_hero_path_idx" ON "_home_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_hero_image_idx" ON "_home_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_text_block_buttons_order_idx" ON "_home_v_blocks_text_block_buttons" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_text_block_buttons_parent_id_idx" ON "_home_v_blocks_text_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_text_block_order_idx" ON "_home_v_blocks_text_block" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_text_block_parent_id_idx" ON "_home_v_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_text_block_path_idx" ON "_home_v_blocks_text_block" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_text_block_image_idx" ON "_home_v_blocks_text_block" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_form_block_order_idx" ON "_home_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_form_block_parent_id_idx" ON "_home_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_form_block_path_idx" ON "_home_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_related_blocks_order_idx" ON "_home_v_blocks_related_blocks" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_related_blocks_parent_id_idx" ON "_home_v_blocks_related_blocks" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_related_blocks_path_idx" ON "_home_v_blocks_related_blocks" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_image_block_order_idx" ON "_home_v_blocks_image_block" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_image_block_parent_id_idx" ON "_home_v_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_image_block_path_idx" ON "_home_v_blocks_image_block" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_image_block_image_idx" ON "_home_v_blocks_image_block" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_group_order_idx" ON "_home_v_blocks_group" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_group_parent_id_idx" ON "_home_v_blocks_group" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_group_path_idx" ON "_home_v_blocks_group" USING btree ("_path");
  CREATE INDEX "_home_v_version_meta_open_graph_optional_locale_alternate_order_idx" ON "_home_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "_home_v_version_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "_home_v_version_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_meta_open_graph_article_authors_order_idx" ON "_home_v_version_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "_home_v_version_meta_open_graph_article_authors_parent_id_idx" ON "_home_v_version_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_meta_open_graph_article_tags_order_idx" ON "_home_v_version_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "_home_v_version_meta_open_graph_article_tags_parent_id_idx" ON "_home_v_version_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_meta_extend_link_order_idx" ON "_home_v_version_meta_extend_link" USING btree ("_order");
  CREATE INDEX "_home_v_version_meta_extend_link_parent_id_idx" ON "_home_v_version_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_meta_extend_meta_order_idx" ON "_home_v_version_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "_home_v_version_meta_extend_meta_parent_id_idx" ON "_home_v_version_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_meta_version_meta_image_idx" ON "_home_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_home_v_version_meta_open_graph_basic_version_meta_open__idx" ON "_home_v" USING btree ("version_meta_open_graph_basic_image_id");
  CREATE INDEX "_home_v_version_meta_twitter_version_meta_twitter_image_idx" ON "_home_v" USING btree ("version_meta_twitter_image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_pages_id_idx" ON "_home_v_rels" USING btree ("pages_id");
  CREATE INDEX "_home_v_rels_media_id_idx" ON "_home_v_rels" USING btree ("media_id");
  CREATE INDEX "_home_v_rels_posts_id_idx" ON "_home_v_rels" USING btree ("posts_id");
  CREATE INDEX "settings_meta_open_graph_optional_locale_alternate_order_idx" ON "settings_meta_open_graph_optional_locale_alternate" USING btree ("_order");
  CREATE INDEX "settings_meta_open_graph_optional_locale_alternate_parent_id_idx" ON "settings_meta_open_graph_optional_locale_alternate" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_open_graph_article_authors_order_idx" ON "settings_meta_open_graph_article_authors" USING btree ("_order");
  CREATE INDEX "settings_meta_open_graph_article_authors_parent_id_idx" ON "settings_meta_open_graph_article_authors" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_open_graph_article_tags_order_idx" ON "settings_meta_open_graph_article_tags" USING btree ("_order");
  CREATE INDEX "settings_meta_open_graph_article_tags_parent_id_idx" ON "settings_meta_open_graph_article_tags" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_extend_link_order_idx" ON "settings_meta_extend_link" USING btree ("_order");
  CREATE INDEX "settings_meta_extend_link_parent_id_idx" ON "settings_meta_extend_link" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_extend_meta_order_idx" ON "settings_meta_extend_meta" USING btree ("_order");
  CREATE INDEX "settings_meta_extend_meta_parent_id_idx" ON "settings_meta_extend_meta" USING btree ("_parent_id");
  CREATE INDEX "settings_meta_meta_image_idx" ON "settings" USING btree ("meta_image_id");
  CREATE INDEX "settings_meta_open_graph_basic_meta_open_graph_basic_ima_idx" ON "settings" USING btree ("meta_open_graph_basic_image_id");
  CREATE INDEX "settings_meta_twitter_meta_twitter_image_idx" ON "settings" USING btree ("meta_twitter_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_text_block_buttons" CASCADE;
  DROP TABLE "pages_blocks_text_block" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_related_blocks" CASCADE;
  DROP TABLE "pages_blocks_image_block" CASCADE;
  DROP TABLE "pages_blocks_group" CASCADE;
  DROP TABLE "lngAlts" CASCADE;
  DROP TABLE "pages_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "pages_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "pages_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "pages_meta_extend_link" CASCADE;
  DROP TABLE "pages_meta_extend_meta" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_text_block_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_related_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_image_block" CASCADE;
  DROP TABLE "_pages_v_blocks_group" CASCADE;
  DROP TABLE "_lngAlts_v" CASCADE;
  DROP TABLE "_pages_v_version_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "_pages_v_version_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "_pages_v_version_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "_pages_v_version_meta_extend_link" CASCADE;
  DROP TABLE "_pages_v_version_meta_extend_meta" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "posts_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "posts_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "posts_meta_extend_link" CASCADE;
  DROP TABLE "posts_meta_extend_meta" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_version_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "_posts_v_version_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "_posts_v_version_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "_posts_v_version_meta_extend_link" CASCADE;
  DROP TABLE "_posts_v_version_meta_extend_meta" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "accounts" CASCADE;
  DROP TABLE "verifications" CASCADE;
  DROP TABLE "passkeys" CASCADE;
  DROP TABLE "forms_notification" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "_forms_v_version_notification" CASCADE;
  DROP TABLE "_forms_v" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "_submissions_v" CASCADE;
  DROP TABLE "form_uploads" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "menu_item" CASCADE;
  DROP TABLE "menu_item_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_blocks_hero" CASCADE;
  DROP TABLE "home_blocks_text_block_buttons" CASCADE;
  DROP TABLE "home_blocks_text_block" CASCADE;
  DROP TABLE "home_blocks_form_block" CASCADE;
  DROP TABLE "home_blocks_related_blocks" CASCADE;
  DROP TABLE "home_blocks_image_block" CASCADE;
  DROP TABLE "home_blocks_group" CASCADE;
  DROP TABLE "home_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "home_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "home_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "home_meta_extend_link" CASCADE;
  DROP TABLE "home_meta_extend_meta" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_blocks_hero" CASCADE;
  DROP TABLE "_home_v_blocks_text_block_buttons" CASCADE;
  DROP TABLE "_home_v_blocks_text_block" CASCADE;
  DROP TABLE "_home_v_blocks_form_block" CASCADE;
  DROP TABLE "_home_v_blocks_related_blocks" CASCADE;
  DROP TABLE "_home_v_blocks_image_block" CASCADE;
  DROP TABLE "_home_v_blocks_group" CASCADE;
  DROP TABLE "_home_v_version_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "_home_v_version_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "_home_v_version_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "_home_v_version_meta_extend_link" CASCADE;
  DROP TABLE "_home_v_version_meta_extend_meta" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "settings_meta_open_graph_optional_locale_alternate" CASCADE;
  DROP TABLE "settings_meta_open_graph_article_authors" CASCADE;
  DROP TABLE "settings_meta_open_graph_article_tags" CASCADE;
  DROP TABLE "settings_meta_extend_link" CASCADE;
  DROP TABLE "settings_meta_extend_meta" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_media_fit";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_text_block_buttons_button_type";
  DROP TYPE "public"."enum_pages_blocks_text_block_buttons_button_variant";
  DROP TYPE "public"."enum_pages_blocks_text_block_buttons_button_target";
  DROP TYPE "public"."enum_pages_blocks_text_block_variant";
  DROP TYPE "public"."enum_pages_blocks_form_block_variant";
  DROP TYPE "public"."enum_pages_blocks_related_blocks_variant";
  DROP TYPE "public"."enum_pages_blocks_image_block_variant";
  DROP TYPE "public"."enum_pages_blocks_group_variant";
  DROP TYPE "public"."enum_pages_listing_list";
  DROP TYPE "public"."enum_pages_meta_twitter_card";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_text_block_buttons_button_target";
  DROP TYPE "public"."enum__pages_v_blocks_text_block_variant";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_variant";
  DROP TYPE "public"."enum__pages_v_blocks_related_blocks_variant";
  DROP TYPE "public"."enum__pages_v_blocks_image_block_variant";
  DROP TYPE "public"."enum__pages_v_blocks_group_variant";
  DROP TYPE "public"."enum__pages_v_version_listing_list";
  DROP TYPE "public"."enum__pages_v_version_meta_twitter_card";
  DROP TYPE "public"."enum__pages_v_version_template";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_meta_twitter_card";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_meta_twitter_card";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_status";
  DROP TYPE "public"."enum__forms_v_version_confirmation_type";
  DROP TYPE "public"."enum__forms_v_version_status";
  DROP TYPE "public"."enum_submissions_status";
  DROP TYPE "public"."enum__submissions_v_version_status";
  DROP TYPE "public"."enum_menu_item_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_home_blocks_hero_variant";
  DROP TYPE "public"."enum_home_blocks_hero_theme";
  DROP TYPE "public"."enum_home_blocks_text_block_buttons_button_type";
  DROP TYPE "public"."enum_home_blocks_text_block_buttons_button_variant";
  DROP TYPE "public"."enum_home_blocks_text_block_buttons_button_target";
  DROP TYPE "public"."enum_home_blocks_text_block_variant";
  DROP TYPE "public"."enum_home_blocks_form_block_variant";
  DROP TYPE "public"."enum_home_blocks_related_blocks_variant";
  DROP TYPE "public"."enum_home_blocks_image_block_variant";
  DROP TYPE "public"."enum_home_blocks_group_variant";
  DROP TYPE "public"."enum_home_meta_twitter_card";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_blocks_hero_variant";
  DROP TYPE "public"."enum__home_v_blocks_hero_theme";
  DROP TYPE "public"."enum__home_v_blocks_text_block_buttons_button_type";
  DROP TYPE "public"."enum__home_v_blocks_text_block_buttons_button_variant";
  DROP TYPE "public"."enum__home_v_blocks_text_block_buttons_button_target";
  DROP TYPE "public"."enum__home_v_blocks_text_block_variant";
  DROP TYPE "public"."enum__home_v_blocks_form_block_variant";
  DROP TYPE "public"."enum__home_v_blocks_related_blocks_variant";
  DROP TYPE "public"."enum__home_v_blocks_image_block_variant";
  DROP TYPE "public"."enum__home_v_blocks_group_variant";
  DROP TYPE "public"."enum__home_v_version_meta_twitter_card";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_settings_meta_twitter_card";`)
}
