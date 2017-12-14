import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from "./main";


export default class App extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Main />
                </MuiThemeProvider>
            </div>
        );
    }
}
