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
    this.state = { data: '', greeting: "Blah" };

    // This binding is necessary to make `this` work in the callback    
    this.getMtbEvents = this.getMtbEvents.bind(this);


  }

  displayEvents(data) {
    this.setState({ greeting: "Results:", data: data });

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
          {<FlatButton label="Default" onClick={this.getMtbEvents} />}
          <FlatButton label="Primary" primary={true} />
          <FlatButton label="Secondary" secondary={true} />
          <FlatButton label="Disabled" disabled={true} />
        </div>
          {<EventTable data />}
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
      <tr>
        <td>{date}</td>
        <td>{name}</td>
      </tr>
    );
  }
}

class EventTable extends React.Component {

  render() {
    const rows = [];

    alert(this.props)
    console.log("Data Start")
    console.log(this.props.data)
      //   this.state.data.forEach(function (entry) {
      //     rows.push(
      //   <EventRow
      //     date={entry['date']}
      //     name={entry['name']}
      //   />
      // );
      //  });


    // this.p
    // this.props.data.forEach((entry) => {
    //   rows.push(
    //     <EventRow
    //       date={date}
    //       name={name}
    //     />
    //   );
    // });

    return (
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}