import React, { Component } from "react";
import { Row } from "reactstrap";
import  EventsComponent  from "./eventsComponent";




class TimetableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }


    render() {
        const DAY_NAMES = this.props.settings.day_names;
        const STARTHOUR = this.props.settings.starthour;
        const ENDHOUR = this.props.settings.endhour;
        const EVENTS = this.props.events;
        var HOURS_TOTAL = ENDHOUR - STARTHOUR;
        const hour_row_height = this.props.settings.hour_row_height;
        //console.log("COLSETTING:")
        //console.log(COLSETTING);




        const BackgroundRow = ({ even, row_i }) => {
            //console.log("BackgroundRow: " + even + " " + row_i);
            const evenStr = even ? "bg-even" : "bg-odd";
            const hour = (STARTHOUR + row_i).toString().padStart(2, "0");
            const hour_row_height_rem = hour_row_height + "rem"
            return (
                <Row className={evenStr + " hour-row pl-1"} style={{ height: hour_row_height_rem }}>{hour + ":00"} </Row>
            );
        }

        const BackgroundRows = ({ num }) => {
            //console.log("BackgroundRows: " + num);
            var rows = [];
            for (let i = 0; i <= num; i++) {

                rows.push(
                    <BackgroundRow key={i} row_i={i} even={i % 2 === 0} />
                );
            }
            return (
                <React.Fragment>{rows}</React.Fragment>
            );

        }
        /*
            TODO:

            - move num variable to timetable state.
        */
        const BackgroundCol = ({ dayName, day_i }) => {
            console.groupCollapsed("timetableComponent.BackgroundCol "+dayName);
            console.log({dayName, day_i});
            console.log({DAY_NAMES, STARTHOUR, ENDHOUR, hour_row_height});
            console.log(EVENTS);
            console.groupEnd();

            const dayLabel = (day_num) => "day_" + (day_num + 1);
            return (
                <div key={dayName + "_" + day_i}
                    className={"col-12 col-xs-6 col-sm-4 col-lg col-days" + (day_i ? "" : " col-firstday")}>
                    <Row className="day-row">{dayName}</Row>
                    <React.Fragment key="day_i">
                        <EventsComponent day_events={EVENTS[dayLabel(day_i)]} starthour={STARTHOUR} hour_row_height={hour_row_height} />
                    </React.Fragment>
                    <BackgroundRows num={HOURS_TOTAL} />

                </div>
            );
        }

        const BackgroundCols = (num) => DAY_NAMES.map((dayName, i) => {
            //console.log("BackgroundCols " + dayName + " " + i);
            return (
                <React.Fragment key={dayName}>
                    <BackgroundCol day_i={i} dayName={dayName} />
                </React.Fragment>
            );


        });


        return (

            <div className="container">
                <Row>
                    <BackgroundCols />
                </Row>
            </div>

        );
    }
}
export default TimetableComponent;