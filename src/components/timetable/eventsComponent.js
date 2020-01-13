import React, { Component } from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";

class EventsComponent extends Component {
    constructor(props) {
        super(props);

        this.timeToHours = this.timeToHours.bind(this);
    }


    /*  
        timeToIntarray(time):
        Input: time as "HH:MM"
        Output: time as [H,M] where H and M are integers
    */
    timeToIntArray(time) {
        return time.split(":").map((s) => parseInt(s));
    }

    /*
        timeArrayToHours(timeArr)
        Input: time as [H,M] where H and M are integers
        Output: time in hours as a decimal.
    */
    timeArrayToHours(timeArr) {
        return timeArr[0] + (timeArr[1] / 60)
    }

    timeToHours(time) {
        return this.timeArrayToHours(this.timeToIntArray(time));
    }




    render() {
        //console.log("TIME: " + this.timeToIntArray("20:35"));
        //let that = this; // To make class methods available to methods
        const STARTHOUR = this.props.starthour;
        const EVENTS = this.props.day_events;
        const hour_row_height = this.props.hour_row_height;
        //const STARTHOUR = this.props.starthour;





        function EventBody({ event_style_custom, event_color, time_start, time_end, event_name}) {

            return (
                <React.Fragment>
                    <Card className={"event-card "+ event_color} style={event_style_custom}>
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
        const EventDetails = ({event_details}) => {
            const time_start = event_details.time_start;
            const time_end =  event_details.time_end;
            const event_name= event_details.name;
            const event_color= event_details.color;
            //console.log("time_start: " + time_start);
            //console.log("time_end: " + time_end);
            //console.log(this.timeToHours);
            const start_hour = this.timeToHours(time_start);
            const end_hour = this.timeToHours(time_end);
            const start_hour_to_top_pos = (time) => {
                return ((time - STARTHOUR) * hour_row_height) + "rem";
            };
            const end_hour_to_height = (time) => {
                return ((end_hour - start_hour) * hour_row_height) + "rem";
            };
            const event_style_custom = { top: start_hour_to_top_pos(start_hour), height: end_hour_to_height(end_hour)};
            return (
                <React.Fragment>
                    <EventBody event_style_custom={event_style_custom} event_name={event_name} event_color={event_color} time_start={time_start} time_end={time_end} />
                </React.Fragment>
            );
        }


        const EventsContainer = () => {

            /*
                            <EventDetails key={0} hour_row_height={hour_row_height} time_start={"14:15"} time_end={"15:52"} />
                            <EventDetails key={1} hour_row_height={hour_row_height} time_start={"07:00"} time_end={"12:28"} />
            */

            return (
                <div className="overlay-wrapper">
                    <div className="overlay">
                        <Col className="col-12">
                            {Object.keys(EVENTS).map((event_id)=><EventDetails key={event_id} event_details = {EVENTS[event_id]} />)}
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