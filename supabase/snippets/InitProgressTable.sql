create table progress (
  id serial primary key,
  streak int default 0,
  tickets int default 0,
  updated_at timestamp with time zone default now()
);

-- insert our starting row
insert into progress(id, streak, tickets) values(1, 0, 0);