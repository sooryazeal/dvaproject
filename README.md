# README

1. Clone this repo
2. Run bundle install 
3. Import data into app's database by running, 
sqlite3 db/development.sqlite3 < ../docdata.sql
4. Run,
rake db:migrate
rake import_data:populate_two_tables
rake import_data:populate_master_table

or Run,
sqlite3 db/development.sqlite3 < ../master_table.sql