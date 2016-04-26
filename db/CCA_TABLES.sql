use CCA;

CREATE TABLE NEW_EVENT (EVENT_ID varchar(45), EVENT_NAME varchar(45), TITLE varchar(45), 
                    DATE_TIME varchar(45), STATE_TIME varchar(45), SHORT_TEXT varchar(50), 
                    LONG_TEXT varchar(100), URL varchar(75), CONTACT varchar(75));

CREATE TABLE LOCATION (LOCATION_ID varchar(45), ADDRESS varchar(45), CITY varchar(45), 
                       STATE varchar(45), COORDINATES varchar(14), ZIP varchar(5), SPONSOR varchar(20));
                       


CREATE TABLE EVENT_TOPIC ( carbon varchar(45), fossil_fuel varchar(45), electric_cars varchar(45));


CREATE TABLE EVENT_TYPE( FORUM varchar(45), SPEAKER varchar(45), RALLY varchar(45), AUCTION varchar(45));
                      
CREATE TABLE CONTACT ( FIRST_NAME varchar(45), LAST_NAME varchar(45), EMAIL varchar(45), PHONE int(9));

CREATE TABLE ORG ( ORGANIZATION_NAME varchar(45), ORG_URL varchar(45));
