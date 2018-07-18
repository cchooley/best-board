import React, { Component } from "react";
import Calendar from "react-big-calendar";
import { Divider } from 'semantic-ui-react'
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class App extends Component {
    state = {
        events: [
            {
                start: new Date(moment().add(5, "days")),
                end: new Date(moment().add(9, "days")),
                title: "Fundraiser Week"
            },
            {
                start: new Date(moment().add(11, "days")),
                end: new Date(moment().add(11, "days")),
                title: "Board Meeting"
            },
            {
                start: new Date(moment().add(13, "days")),
                end: new Date(moment().add(13, "days")),
                title: "B-O-D Happy Hour"
            }

        ]
    };

    render() {
        return (
            <div className="calendar">
                <header className="App-header">
                    <Divider horizontal>Calendar</Divider>
                </header>
                <Calendar
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    style={{ height: "100vh" }}
                />
            </div>
        );
    }
}

export default App;