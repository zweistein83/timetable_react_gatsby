import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Timetable from "./timetable";
import { Row } from "reactstrap";



export default () =>
    <div>
        <div className="container">
            <Row>
                <Timetable />
            </Row>
        </div>
    </div>
