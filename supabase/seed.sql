insert into trips(id, name, start_date, end_date) values(1, '2023 Phoenix Open', '2023-02-09', '2023-02-12');

insert into players(id, handicap, name) values(1, 6.9, 'Blazer McDoobie');

insert into trip_players(trip_id, player_id) values (1, 1);

insert into courses(id, name) values (1, 'TPC Scottsdale Stadium Course');
insert into tee_boxes(id, course_id, name, rating, slope) values (1, 1, 'Champion', 74.7, 142);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 1, 4, 403, 14);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 2, 4, 442, 8);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 3, 5, 558, 4);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 4, 3, 183, 18);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 5, 4, 470, 6);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 6, 4, 432, 12);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 7, 3, 215, 16);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 8, 4, 475, 2);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 9, 4, 453, 10);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 10, 4, 428, 11);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 11, 4, 472, 1);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 12, 3, 192, 15);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 13, 5, 558, 5);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 14, 4, 490, 7);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 15, 5, 553, 9);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 16, 3, 163, 17);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 17, 4, 332, 13);
insert into hole_info(tee_box_id, hole_number, par, yardage, handicap) values (1, 18, 4, 442, 3);

insert into rounds(id, trip_id, course_id, name, date) values (1, 1, 1, 'Waste Management Rd. 1', '2023-02-09');