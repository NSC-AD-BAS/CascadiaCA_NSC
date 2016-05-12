DROP DATABASE IF EXISTS cascadia_climate_action;
CREATE DATABASE cascadia_climate_action;
USE cascadia_climate_action;

CREATE TABLE address (
	address_id INT PRIMARY KEY AUTO_INCREMENT,
    building_name VARCHAR(100),
    street_address VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip VARCHAR(12) NOT NULL
);

CREATE TABLE organization (
	org_id INT PRIMARY KEY AUTO_INCREMENT,
    org_name VARCHAR(100) NOT NULL,
    org_website VARCHAR(150) NOT NULL,
    org_address_id INT NOT NULL,
    CONSTRAINT org_fk_address_id
		FOREIGN KEY (org_address_id)
        REFERENCES address(address_id)
);

CREATE TABLE contact (
	contact_id	INT PRIMARY KEY AUTO_INCREMENT,
    first_name	VARCHAR(50) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    org_id INT NOT NULL,
    CONSTRAINT contact_fk_org_id
		FOREIGN KEY (org_id)
        REFERENCES organization(org_id)
);

CREATE TABLE event_type (
	event_type_id INT PRIMARY KEY AUTO_INCREMENT,
    event_type VARCHAR(50) NOT NULL
);

CREATE TABLE event_topic (
	event_topic_id INT PRIMARY KEY AUTO_INCREMENT,
    event_topic VARCHAR(100) NOT NULL
);

CREATE TABLE event (
	event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title TEXT NOT NULL,
    event_type INT NOT NULL,
    CONSTRAINT event_fk_event_type
		FOREIGN KEY (event_type)
        REFERENCES event_type(event_type_id),
	date DATE NOT NULL,
	start_time TIME NOT NULL,
    end_time TIME,
    address_id INT NOT NULL,
	CONSTRAINT event_fk_address_id
		FOREIGN KEY (address_id)
        REFERENCES address(address_id),
	main_topic_id INT NOT NULL,
    CONSTRAINT event_fk_main_topic_id
		FOREIGN KEY (main_topic_id)
        REFERENCES event_topic(event_topic_id)
	/*event_organizer_id INT NOT NULL,
    CONSTRAINT event_fk_event_organizer_id
		FOREIGN KEY (event_organizer_id)
        REFERENCES organization(org_id),
	event_contact_id INT NOT NULL,
	CONSTRAINT event_fk_event_contact_id
		FOREIGN KEY (event_contact_id)
        REFERENCES contact(contact_id)*/
);

CREATE TABLE event_sponsor (
	event_id INT NOT NULL,
    CONSTRAINT event_sponsor_fk_event_id
		FOREIGN KEY (event_id)
        REFERENCES event(event_id),
	org_id INT NOT NULL,
    CONSTRAINT event_sponsor_fk_org_id
		FOREIGN KEY (org_id)
        REFERENCES organization(org_id)
);
	
SHOW ERRORS;