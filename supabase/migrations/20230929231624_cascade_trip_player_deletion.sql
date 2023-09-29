alter table "public"."trip_players" drop constraint "trip_players_trip_id_fkey";

alter table "public"."trip_players" add constraint "trip_players_trip_id_fkey" FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE not valid;

alter table "public"."trip_players" validate constraint "trip_players_trip_id_fkey";


