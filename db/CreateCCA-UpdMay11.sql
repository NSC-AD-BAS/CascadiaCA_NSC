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

CREATE TABLE main_type (
	main_type_id INT PRIMARY KEY AUTO_INCREMENT,
    main_type VARCHAR(50) NOT NULL
);

CREATE TABLE subtypes (
	subtype_id INT PRIMARY KEY AUTO_INCREMENT,
    main_type_id INT NOT NULL,
    CONSTRAINT subtype_fk_main_type_id
		FOREIGN KEY (main_type_id)
        REFERENCES main_type(main_type_id),
	subtype_type VARCHAR(100) NOT NULL
);

CREATE TABLE main_topic (
	main_topic_id INT PRIMARY KEY AUTO_INCREMENT,
    main_topic VARCHAR(100) NOT NULL
);

CREATE TABLE subtopics (
	subtopic_id INT PRIMARY KEY AUTO_INCREMENT,
    main_topic_id INT NOT NULL,
    CONSTRAINT subtopics_fk_main_topic_id
		FOREIGN KEY (main_topic_id)
        REFERENCES main_topic(main_topic_id),
    subtopic VARCHAR(100) NOT NULL
);

CREATE TABLE `event` (
	event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title TEXT NOT NULL,
    event_description LONGTEXT NOT NULL,
	main_event_type INT NOT NULL,
    CONSTRAINT event_fk_main_event_type
		FOREIGN KEY (main_event_type)
        REFERENCES main_type(main_type_id),
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
        REFERENCES main_topic(main_topic_id),
	main_contact_id INT NOT NULL
);

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

CREATE TABLE event_subtype (
	estype_event_id INT NOT NULL,
    CONSTRAINT event_subtypes_fk_event_detail
		FOREIGN KEY (estype_event_id)
        REFERENCES `event`(event_id),
	estype_subtype_id INT NOT NULL,
    CONSTRAINT estype_subtype_id_fk_subtype_id
		FOREIGN KEY (estype_subtype_id)
        REFERENCES subtypes(subtype_id)
);

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
