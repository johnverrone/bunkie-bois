drop policy "Authenticated users can manage" on "public"."rounds";

drop policy "Authenticated users can manage" on "public"."trips";

create table "public"."user_roles" (
    "user_id" uuid not null,
    "role" text not null default 'user'::text,
    "created_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (user_id);

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

create policy "Enable management for admins"
on "public"."rounds"
as permissive
for all
to authenticated
using (('admin'::text = ( SELECT user_roles.role
   FROM user_roles
  WHERE (user_roles.user_id = auth.uid()))))
with check (('admin'::text = ( SELECT user_roles.role
   FROM user_roles
  WHERE (user_roles.user_id = auth.uid()))));


create policy "Admins can manage"
on "public"."trips"
as permissive
for all
to authenticated
using (('admin'::text = ( SELECT user_roles.role
   FROM user_roles
  WHERE (user_roles.user_id = auth.uid()))))
with check (('admin'::text = ( SELECT user_roles.role
   FROM user_roles
  WHERE (user_roles.user_id = auth.uid()))));



