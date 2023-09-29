alter table "public"."rounds" drop constraint "rounds_trip_id_fkey";

alter table "public"."rounds" add constraint "rounds_trip_id_fkey" FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE not valid;

alter table "public"."rounds" validate constraint "rounds_trip_id_fkey";


