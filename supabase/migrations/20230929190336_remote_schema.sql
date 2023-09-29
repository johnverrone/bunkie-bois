CREATE INDEX idx_scorecard ON public.hole_scores USING btree (scorecard_id);

create policy "Authenticated users can manage"
on "public"."courses"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users only"
on "public"."courses"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can manage"
on "public"."hole_info"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users only"
on "public"."hole_info"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can modify"
on "public"."hole_scores"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can manage"
on "public"."players"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can view"
on "public"."players"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can manage"
on "public"."rounds"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can view"
on "public"."rounds"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can modity"
on "public"."scorecards"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can manage"
on "public"."tee_boxes"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can view"
on "public"."tee_boxes"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can manage"
on "public"."trip_players"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can view"
on "public"."trip_players"
as permissive
for select
to authenticated
using (true);


create policy "Authenticated users can manage"
on "public"."trips"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Authenticated users can view"
on "public"."trips"
as permissive
for select
to authenticated
using (true);



