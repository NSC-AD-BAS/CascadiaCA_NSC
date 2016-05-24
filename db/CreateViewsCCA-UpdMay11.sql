USE cascadia_climate_action;

/*Creates a list of all main/sub topics including the topic
id, name and whether it is a main/sub topic*/
CREATE OR REPLACE VIEW full_topic_list AS
	SELECT mt.main_topic_id AS `Main_Topic_Id`, mt.main_topic AS `Main_Topic`,
		st.subtopic_id AS `Subtopic_Id`, st.subtopic AS `Subtopic`
		FROM main_topic mt
	JOIN subtopics st 
		ON mt.main_topic_id = st.main_topic_id
	ORDER BY mt.main_topic_id;

/*Creates a list of main types and subtypes including the
type id, type name and whether it is a sub/main type*/
CREATE OR REPLACE VIEW full_type_list AS
	SELECT mtype.main_type_id AS `Main_Type_Id`, mtype.main_type AS `Main_Type`,
		stype.subtype_id AS `Subtype_Id`, stype.subtype_type AS `Subtype`
        FROM main_type mtype
	JOIN subtypes stype
		ON mtype.main_type_id = stype.main_type_id
	ORDER BY mtype.main_type_id;
    
    
/*Creates a list of the main event details*/
CREATE OR REPLACE VIEW event_list AS
	SELECT e.event_id AS `Event_Id`, e.event_title AS `Title`, 
		e.event_description AS `Description`,
		e.start_date_time AS `Start_Time`, e.end_date_time AS `End_Time`,
        a.building_name AS `Building`, a.street_address AS `Street_Address`,
        a.city AS `City`, a.state AS `State`, a.zip AS `ZIP`,
        CONCAT(c.first_name, " ", c.last_name) AS `Main_Contact`,
        c.email AS `Contact_Email`, c.phone AS `Contact_Phone`,
        o.org_name AS `Main_Sponsor`,
        mt.main_topic AS `Main_Topic`, mtype.main_type AS `Main_Type`
        FROM `event` e
	JOIN address a 
		ON e.address_id = a.address_id
	JOIN contact c 
		ON e.main_contact_id = c.contact_id
	JOIN organization o
		ON e.event_main_sponsor_id = o.org_id
	JOIN main_topic mt
		ON e.event_main_topic_id = mt.main_topic_id 
	JOIN main_type mtype
		ON e.main_event_type = mtype.main_type_id;

/*Creates a list containing event id, name, and all 
sponsors listed as main or secondary*/
CREATE OR REPLACE VIEW event_sponsor_list AS
SELECT e.event_id AS `Event_Id`, e.event_title AS `Title`,
		'Main' AS `Sponsor_Type`, o.org_name AS `Sponsor`
	FROM `event` e
	JOIN organization o 
		ON e.event_main_sponsor_id = o.org_id
UNION
SELECT ev.event_id, ev.event_title, 'Secondary' AS `Sponsor_Type`,
		o.org_name
	FROM `event` ev
	JOIN event_sponsor es 
		ON ev.event_id = es.event_id
	JOIN organization o ON
		es.org_id = o.org_id
ORDER BY `Event_Id`;
    
    
/*Creates a view listing the event id, name, the main
event type, and all subtypes*/
CREATE OR REPLACE VIEW event_type_list AS
SELECT e.event_id AS `Event_Id`, e.event_title AS `Title`,
	'Main Type' AS `Type`, mt.main_type AS `Type_Name`
    FROM `event` e
    JOIN main_type mt
		ON e.main_event_type = mt.main_type_id
UNION
SELECT e.event_id, e.event_title, 'Main_Subtype', 
	st.subtype_type
	FROM `event` e
    JOIN subtypes st
		ON e.main_event_subtype = st.subtype_id
UNION
SELECT e.event_id, e.event_title, 'Subtype', st.subtype_type
	FROM `event` e
    JOIN event_subtype es
		ON e.event_id = es.estype_event_id
	JOIN subtypes st 
		ON es.estype_subtype_id = st.subtype_id
ORDER BY `Event_Id`;
	
/*Creates a list of all topics/subtopics associated
with an event*/
CREATE OR REPLACE VIEW event_topic_list AS
SELECT e.event_id AS `Event_Id`, e.event_title AS `Title`,
	'Main Topic' AS `Type`, mt.main_topic AS `Topic`
    FROM `event` e
    JOIN main_topic mt 
		ON e.event_main_topic_id = mt.main_topic_id
UNION
SELECT e.event_id, e.event_title, 'Subtopic', st.subtopic
	FROM `event` e
    JOIN event_subtopics es
		ON e.event_id = es.es_event_id
	JOIN subtopics st
		ON es.es_subtopic_id = st.subtopic_id
ORDER BY `Event_Id`;