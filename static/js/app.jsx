import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EventsTable from "./events";

export default class App extends React.Component {
     render () {
        return (
            <div>
                <MuiThemeProvider>
                    <EventsTable name='Caspertest' />
                </MuiThemeProvider>
            </div>
        );
    }
}
