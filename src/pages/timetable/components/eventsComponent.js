import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

function EventsContainer({ colSetting }) {
    return (
        <div className="overlay-wrapper">
            <div className="overlay">
                <Container>
                    <Row>
                        <div className={colSetting}>
                            <div className="row day-row hidden">

                            </div>
                            
                                <div className="card event-card">
                                    <div className="card-header event-header">Testing123</div>
                                    <div className="card-body event-body">
                                    </div>
                                </div>
                            

                        </div>

                    </Row>
                </Container>
            </div>

        </div>)
}

export default EventsContainer;

/*

<div class="overlay-wrapper">
        <div class="overlay">
            <div class="container">
                <div class="row">

                <div class="col-6 col-md-2">
                        <div class="row day-row hidden">
                            <!--push events down-->
                        </div>
                        <div class="card event-card ml-4">
                            <div class="card-header event-header">Test</div>
                            <div class="card-body event-body">
                            </div>
                        </div>

                    </div>

*/