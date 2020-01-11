import React, { Component } from "react";
import { Row } from "reactstrap";




class TimetableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           

        };
    }


    render() {
        const DAYS = this.props.days;
        const STARTHOUR = this.props.starthour;
        const COLSETTING = this.props.colSetting;
        console.log("COLSETTING:")
        console.log(COLSETTING);


        const BackgroundRow = ({ even, row_i }) => {
            //console.log("BackgroundRow: " + even + " " + row_i);
            const evenStr = even ? "even" : "odd";
            const hour = (STARTHOUR + row_i).toString().padStart(2, "0");
            return (
                <Row className={"bg-" + evenStr + " hour-row"}>{hour + ":00"}</Row>
            );
        }

        const BackgroundRows = ({ num }) => {
            //console.log("BackgroundRows: " + num);
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
            //console.log("BackgroundCol: ");
            return (
                <div key={dayName + "_" + day_i} className={COLSETTING +" col-days"+ (day_i ? "" : " col-firstday")}>
                    <Row className="day-row">{dayName}</Row>
                    <BackgroundRows num={10} />
                </div>
            );
        }

        const BackgroundCols = (num) => DAYS.map((dayName, i) => {
            console.log("BackgroundCols " + dayName + " " + i);
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