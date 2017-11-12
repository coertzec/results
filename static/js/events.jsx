import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';

export default class EventsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: '' };

    // This binding is necessary to make `this` work in the callback    
    this.getMtbEvents = this.getMtbEvents.bind(this);


  }

  displayEvents(data) {
    this.setState({ data: data });

  }

  getMtbEvents() {
    fetch('/api/mtb_events')
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        data.forEach(function (entry) {
          console.log(entry['date']);
        });
        this.displayEvents(data);
      }.bind(this));
  }


  render() {
    return (
      <div>
        <div>
          {<FlatButton label="Event Results" onClick={this.getMtbEvents} />}
          <FlatButton label="Primary" primary={true} />
          <FlatButton label="Secondary" secondary={true} />
          <FlatButton label="Disabled" disabled={true} />
        </div>
        {<EventTable data={this.state.data} />}
        <div>
          <h1>{this.state.greeting}</h1>
        </div>
      </div>

    )
  }
}

class EventRow extends React.Component {
  render() {
    const date = this.props.date;
    const name = this.props.name;
    <span style={{ color: 'red' }}>
      {date}
    </span>;

    return (
      <TableRow>
        <TableRowColumn>{date}</TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
      </TableRow>
    );
  }
}

class EventTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { casperdata: [{ date: "hello", name: "world" }, { date: "hello2", name: "world2" }], data: this.props.data }


  }

  render() {
    const rows = [];

    if (this.props.data) {
      this.props.data.forEach(function (entry) {
        console.log(entry['name']);
        rows.push(
          <EventRow
            date={entry['date']}
            name={entry['title']}
          />
        );
      });
    }


    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Event Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  }
}
