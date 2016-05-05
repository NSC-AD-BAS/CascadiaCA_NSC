USE cascadia_climate_action;


/*Creates a List containing all event types */
CREATE OR REPLACE VIEW event_type_list AS ( 
SELECT 
	DISTINCT event_type AS `Event Type`
    FROM event_type
    
);

/*Creates list of number of events by event type id*/
CREATE OR REPLACE VIEW event_type_summary AS (
SELECT COUNT(*), event_type FROM event
	/*JOIN event_type ON event.event_type = event_type.event_type_id*/
	GROUP BY event_type
    );

/*Creates a view listing all event topics*/
CREATE OR REPLACE VIEW event_topic_list AS (
SELECT event_topic_id AS `Topic Id`,
	event_topic AS `Event Topic`
    FROM event_topic
);

/*Creates a view that lists the event ids and 
	their sponsors (captures multiple sponsors)*/



/*Creates a view that shows event overviews:
	Title, Start Time, End Time, Description
    Main Topic, Type, 
    Location (Building, Street Address, City, State, Zip)
*/

CREATE OR REPLACE VIEW event_detail AS
(
SELECT e.event_title AS `Title`, e.start_date_time AS `Start Time`, 
	e.end_date_time AS `End Time`, e.event_description AS `Description`, 
    etopic.event_topic AS `Main Topic`,
    etype.event_type AS `Type`,
    a.building_name AS `Building`, a.street_address AS `Street Address`,
    a.city AS `City`, a.state AS `State`, a.zip AS `Zip`
	FROM event e
    JOIN event_topic etopic ON e.main_topic_id = etopic.event_topic_id
    JOIN event_type etype ON e.event_type = etype.event_type_id
    JOIN address a ON e.address_id = a.address_id

);      
        