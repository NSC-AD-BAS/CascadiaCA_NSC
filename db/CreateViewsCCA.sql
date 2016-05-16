USE cascadia_climate_action;


/*Creates a List containing all event types */
CREATE OR REPLACE VIEW event_type_list AS ( 
SELECT 
	DISTINCT event_type AS `type`
    FROM event_type
    
);

/*Creates list of number of events by event type id*/
CREATE OR REPLACE VIEW event_type_summary AS (
SELECT COUNT(*), event_type FROM event
	/*JOIN event_type ON event.event_type = event_type.event_type_id*/
	GROUP BY event_type
    );

/*Creates a view listing all event topics*/
CREATE OR REPLACE VIEW event_topic_list AS 
	SELECT 'Main Topic' AS type, main_topic_id AS `Topic Id`, main_topic AS `Event Topic` 
		FROM main_topic
	UNION
	SELECT 'Subtopic' AS type, subtopic_id AS `Topic Id`, subtopic AS `Event Topic` 
		FROM subtopics;

/*Creates a view that lists all event id/sponsor pairs (captures multiple sponsors)*/
CREATE OR REPLACE VIEW event_sponsor_list AS
SELECT es.event_id AS `Event Id`, es.org_id AS `Organization Id`, 
	org.org_name AS `Organization Name`, 'Additional Sponsor' AS 'Type'
	FROM event_sponsor es
    JOIN organization org ON es.org_id = org.org_id
UNION
SELECT e.event_id, e.event_main_sponsor_id, org.org_name, 'Main Sponsor' AS 'Type'
	FROM event e
    JOIN organization org ON e.event_main_sponsor_id = org.org_id
ORDER BY `Event Id`;


/*Creates a view that shows event overviews:
	Title, Start Time, End Time, Description
    Main Topic, Type, 
    Location (Building, Street Address, City, State, Zip)
*/

CREATE OR REPLACE VIEW event_detail AS
(
SELECT e.event_title AS `Title`, e.start_date_time AS `Start Time`, 
	e.end_date_time AS `End Time`, e.event_description AS `Description`, 
    mt.main_topic AS `Main Topic`,
    etype.event_type AS `Type`,
    a.building_name AS `Building`, a.street_address AS `Street Address`,
    a.city AS `City`, a.state AS `State`, a.zip AS `Zip`,
    o.org_name AS `Main Sponsor`
	FROM event e
    JOIN main_topic mt ON e.event_main_topic_id = mt.main_topic_id
    JOIN event_type etype ON e.event_type = etype.event_type_id
    JOIN address a ON e.address_id = a.address_id
    JOIN organization o ON e.event_main_sponsor_id = o.org_id

);      
        