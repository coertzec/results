import React from "react";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import {EventTable, EventRow} from './components/EventsList'
import {EventDetailsTable, EventDetailsRow} from './components/EventDetails'

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { event_data: '', show_events: false, show_event_details: false, event_id: 0, event_details: '' };

    this.getMtbEvents = this.getMtbEvents.bind(this);
  }

  displayEvents(data) {
    this.setState({ event_data: data, show_events: true, show_event_details: false });

  }

  displayEventDetails(event_details) {
    this.setState({show_events: false, show_event_details: true, event_details: event_details})
  }

  getMtbEvents() {
    fetch('/api/mtb_events')
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        this.displayEvents(data);
      }.bind(this));
  }

  getEventDetails(event_id) {
    fetch("/api/event_details/" + event_id)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        this.displayEventDetails(data);
      }.bind(this));
  }

  render() {

    const show_event_details = this.state.show_event_details
    const show_events = this.state.show_events

    let events = null;
    if (show_events) {
      events =  <EventTable data={this.state.event_data} 
              getEventDetails={this.getEventDetails.bind(this)} />;
    }
    if (show_event_details) {
      events =  <EventDetailsTable event_details={this.state.event_details} />;
    }

    return (
      <div>
        <div>
          <Button raised onClick={this.getMtbEvents.bind(this)}>
            Event Results
          </Button>
          <Button raised color="primary"  >
            New Results
          </Button>
          <Button raised color="primary" secondary={true} >
            Profile
          </Button>
          <Button raised color="accent" disabled >
            Disabled
          </Button> 
        </div>
          {events}
      </div>

    )
  }
}

