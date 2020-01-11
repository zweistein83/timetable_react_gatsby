import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";



function EventBody({ event_style_custom }) {
    
    return (
        <React.Fragment>
            <div className="card event-card" style={event_style_custom}>
                <div className="card-block">
                    <div className="card-header event-header">Testing123</div>
                    <div className="card-body event-body">
                        09:00
                    </div>
                </div>
            </div>
            <div className="card event-card" style={{ top: "16rem", height: "3rem" }}>
                <div className="card-header event-header">Testing123</div>
                <div className="card-body event-body">
                </div>
            </div>
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
    - Event starttime
    - Event endtime
    - Event location
    - Event details

    

*/
function EventDetails({ hour_row_height }) {
    const top_pos = (1* hour_row_height) + "rem"
    const event_style_custom = { top: top_pos, height: "2rem" }
    return (
        <React.Fragment>
            <EventBody event_style_custom={event_style_custom} />
        </React.Fragment>
    );
}


function EventsContainer({ colSetting, hour_row_height }) {
    return (
        <div className="overlay-wrapper">
            <div className="overlay">
                <Col className="col-12">
                    <EventDetails hour_row_height={hour_row_height} />
                </Col>
            </div>
        </div>)
}

export default EventsContainer;