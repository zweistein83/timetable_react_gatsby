import React, { Component } from "react";
import { Row } from "reactstrap";
import "./timetable/timetable.css";


class Timetable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }






    render() {
        const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const STARTHOUR = 7;


        const BackgroundRow = ({ even, row_i }) => {
            console.log("BackgroundRow: " + even + " " + row_i);
            const evenStr = even ? "even" : "odd";
            const hour = (STARTHOUR + row_i).toString().padStart(2, "0");
            return (
                <Row className={"bg-" + evenStr + " hour-row"}>{hour + ":00"}</Row>
            );
        }

        const BackgroundRows = ({ num }) => {
            console.log("BackgroundRows: " + num);
            var rows = [];
            for (let i = 0; i < num; i++) {

                rows.push(
                    <BackgroundRow key={i} row_i={i} even={i % 2 === 0} />
                );


            }
            return (
                <React.Fragment>{rows}</React.Fragment>
            );

        }

        const BackgroundCol = ({ dayName, day_i }) => {
            console.log("BackgroundCol: ");
            return (
                <div key={dayName} className={"col-12 col-xs-2 col-sm-4 col-lg-2 col-days " + (day_i ? "" : "col-firstday")}>
                    <div className="row day-row">{dayName}</div>
                    <BackgroundRows num={10} />
                </div>
            );
        }

        const BackgroundCols = (num) => DAYS.map((dayName, i) => {
            console.log("BackgroundCols " + dayName + " " + i);
            return (
                <React.Fragment>
                    <BackgroundCol day_i={i} dayName={dayName} />
                </React.Fragment>
            );


        });
        /*<this.BackgroundCol/>*/
        return (

            <div className="container">
                <Row>
                    <BackgroundCols />
                </Row>
            </div>

        );
    }
}
export default Timetable;