import React, { Component } from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";
import { timeToHours } from "../../helper_functions/time_conversion";

class EventsComponent extends Component {
    /**
     * Creates a container with a column (1 day) of events.
     */    
    constructor(props) {
        super(props);


    }


    render() {
        //console.log("TIME: " + this.timeToIntArray("20:35"));
        //let that = this; // To make class methods available to methods
        const STARTHOUR = this.props.starthour;
        const EVENTS = this.props.day_events;
        const hour_row_height = this.props.hour_row_height;
        //const STARTHOUR = this.props.starthour;




        /**
         * 
         * @param {*} event_style_custom
         * @param {*} event_color
         * @param {*}  time_start
         * @param {*}  time_end
         * @param {*}  event_name
         */
        function EventBody({ event_style_custom, event_color, time_start, time_end, event_name }) {

            return (
                <React.Fragment>
                    <Card className={"event-card " + event_color} style={event_style_custom}>
                        <CardHeader className="event-header">{event_name}</CardHeader>
                        <CardBody className="event-body">
                            {time_start + "-" + time_end}
                        </CardBody>
                    </Card>
                </React.Fragment>
            );

        }


        /*
            hour_row_height is the height of a row in rem.
            If starthour is 7 0 * hour_row_height places
            the event at 07:00. 1 * hour_row_height at 08:00
            and so on.
        
            TODO: 
        
            - Event height
            - Event name
            - Event starttime (not hour) "HH:MM"
            - Event endtime (not hour)   "HH:MM"
            - Event location
            - Event details
        
            
        
        */

        /**
         * 
         * @param {*} event_details 
         */
        const EventDetails = ({ event_details }) => {
            const time_start = event_details.time_start;
            const time_end = event_details.time_end;
            const event_name = event_details.name;
            const event_color = event_details.color;
            //console.log("time_start: " + time_start);
            //console.log("time_end: " + time_end);
            //console.log(this.timeToHours);
            const start_hour = timeToHours(time_start);
            const end_hour = timeToHours(time_end);

            /**
             * Calculates the top position of an event
             * @param {number} time - time as hours
             * @return {number} - top position
             */
            const start_hour_to_top_pos = (time) => {
                return ((time - STARTHOUR) * hour_row_height) + "rem";
            };

            /**
             * Calculates the height of a event
             * @param {number} time - time as hours
             * @return {number} - height of event
             */
            const end_hour_to_height = (time) => {
                return ((end_hour - start_hour) * hour_row_height) + "rem";
            };


            const event_style_custom = { top: start_hour_to_top_pos(start_hour), height: end_hour_to_height(end_hour) };
            return (
                <React.Fragment>
                    <EventBody event_style_custom=
                        {event_style_custom}
                        event_name={event_name}
                        event_color={event_color}
                        time_start={time_start}
                        time_end={time_end} />
                </React.Fragment>
            );
        }

        

        /**
         * Creates a div with absolute positioning inside a relative positioned div. 
         * This is placed inside each "day column". 
         */
        const EventsContainer = () => {

            /*
                            <EventDetails key={0} hour_row_height={hour_row_height} time_start={"14:15"} time_end={"15:52"} />
                            <EventDetails key={1} hour_row_height={hour_row_height} time_start={"07:00"} time_end={"12:28"} />
            */

            return (
                <div className="overlay-wrapper">
                    <div className="overlay">
                        <Col className="col-12">
                            {Object.keys(EVENTS).map((event_id) => <EventDetails key={event_id} event_details={EVENTS[event_id]} />)}
                        </Col>
                    </div>
                </div>)
        }

        /*
            TODO:
            - Make object with event_details. Pass object between elements.
         */




        return (
            <React.Fragment>
                <EventsContainer hour_row_height={this.props.hour_row_height} />
            </React.Fragment>

        );

    }


}

export default EventsComponent;