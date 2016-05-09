DROP DATABASE IF EXISTS cascadia_climate_action;
CREATE DATABASE cascadia_climate_action;
USE cascadia_climate_action;

CREATE TABLE address (
	address_id INT PRIMARY KEY AUTO_INCREMENT,
    building_name VARCHAR(100),
    street_address VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip VARCHAR(12) NOT NULL
);

/*Data for address table included in insert file*/

CREATE TABLE organization (
	org_id INT PRIMARY KEY AUTO_INCREMENT,
    org_name VARCHAR(100) NOT NULL,
    org_website VARCHAR(150) NOT NULL,
    org_address_id INT NOT NULL,
    CONSTRAINT org_fk_address_id
		FOREIGN KEY (org_address_id)
        REFERENCES address(address_id)
);

/*Data for organization table in insert data file*/

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

/*Test data for contacts included to insert file*/

CREATE TABLE event_type (
	event_type_id INT PRIMARY KEY AUTO_INCREMENT,
    event_type VARCHAR(50) NOT NULL
);

/*Event type data included to data insert file*/

CREATE TABLE main_topic (
	main_topic_id INT PRIMARY KEY AUTO_INCREMENT,
    main_topic VARCHAR(100) NOT NULL
);

/*Main topic info included to data insert file*/
        
CREATE TABLE subtopics (
	subtopic_id INT PRIMARY KEY AUTO_INCREMENT,
    subtopic VARCHAR(100) NOT NULL
);

/*Data for subtopics included to insert data file*/

CREATE TABLE `event` (
	event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title TEXT NOT NULL,
    event_type INT NOT NULL,
    event_description LONGTEXT NOT NULL,
    CONSTRAINT event_fk_event_type
		FOREIGN KEY (event_type)
        REFERENCES event_type(event_type_id),
	start_date_time DATETIME NOT NULL,
    end_date_time DATETIME,
    address_id INT NOT NULL,
	CONSTRAINT event_fk_address_id
		FOREIGN KEY (address_id)
        REFERENCES address(address_id),
	event_main_sponsor_id INT NOT NULL,
    CONSTRAINT event_main_sponsor_id_fk_organization
		FOREIGN KEY (event_main_sponsor_id)
        REFERENCES organization(org_id),
	event_main_topic_id INT NOT NULL,
    CONSTRAINT event_main_topic_id_fk_main_topic_id
		FOREIGN KEY (event_main_topic_id)
        REFERENCES main_topic(main_topic_id)
);
	event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title TEXT NOT NULL,
    event_type INT NOT NULL,
    event_description LONGTEXT NOT NULL,
    CONSTRAINT event_fk_event_type
		FOREIGN KEY (event_type)
        REFERENCES event_type(event_type_id),
	start_date_time DATETIME NOT NULL,
    end_date_time DATETIME,
    address_id INT NOT NULL,
	CONSTRAINT event_fk_address_id
		FOREIGN KEY (address_id)
        REFERENCES address(address_id),
	main_topic_id INT NOT NULL,
    CONSTRAINT main_topic_fk_event_main_topic_id
		FOREIGN KEY (main_topic_id)
        REFERENCES event_main_topic(event_main_topic_id),
	main_event_org_id INT NOT NULL,
    CONSTRAINT main_event_org_fk_organization
		FOREIGN KEY (main_event_org_id)
        REFERENCES organization(org_id)
);

/*NEED INFO TO FILL EVENT TABLE*/

CREATE TABLE event_subtopics (
	es_event_id INT NOT NULL,
    CONSTRAINT event_subtopics_fk_event_detail
		FOREIGN KEY (es_event_id)
        REFERENCES `event`(event_id),
    es_subtopic_id INT NOT NULL,
    CONSTRAINT es_subtopic_id_fk_subtopic_id
		FOREIGN KEY (es_subtopic_id)
        REFERENCES subtopics(subtopic_id)
);

/*Data for event_subtopics included to insert data file*/

CREATE TABLE event_sponsor (
	event_id INT NOT NULL,
    CONSTRAINT event_sponsor_fk_event_id
		FOREIGN KEY (event_id)
        REFERENCES `event`(event_id),
	org_id INT NOT NULL,
    CONSTRAINT event_sponsor_fk_org_id
		FOREIGN KEY (org_id)
        REFERENCES organization(org_id)
);

/*Data for event_sponsor included to insert data file*/

CREATE TABLE org_image (
	org_image_id INT NOT NULL,
    CONSTRAINT org_image_org_id
		FOREIGN KEY (org_image_id)
        REFERENCES organization(org_id),
    org_image BLOB
);
	
CREATE TABLE event_image (
	event_image_id INT NOT NULL,
    CONSTRAINT event_image_event_id
		FOREIGN KEY (event_image_id)
        REFERENCES `event`(event_id),
	event_image BLOB
);

/*SHOW ENGINE INNODB STATUS;*/