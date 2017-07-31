\c food_diary_dev

CREATE TABLE IF NOT EXIST food_entries (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR,
	date DATE,
	time TIME(0),
	cals INTEGER,
	details VARCHAR	
);