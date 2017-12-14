import React from "react";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';



export class EventDetailsSelection extends React.Component {


  render() {
    const list = [];
    const category_stage_list = [];
    const event_stage_list = [];
    const categories = this.props.event_details.categories;
    const category_stages = this.props.event_details.category_stages;
    const event_stages = this.props.event_details.event_stages;
    let showResults = this.props.showResults

    if (categories) {
      categories.forEach(function (category, i) {
        list.push(
          <TableCell>
            <Button raised color="primary" id={category.category_name} onClick={() => showResults('categories', i)}>
              {category.category_name}
           </Button>
          </TableCell>
        );
      });
    }
    if (category_stages) {
      category_stages.forEach(function (category_stage, i) {
        category_stage_list.push(
          <TableCell>
            <Button raised color="accent" id={category_stage.category_stage_name} onClick={() => showResults('category_stages', i)}>
              {category_stage.category_stage_name}
            </Button>
          </TableCell>
        );
      });
    }
    if (event_stages) {
      event_stages.forEach(function (event_stage, i) {
        list.push(
          <TableCell>
            <Button raised color="primary" id={event_stage.event_stage_name} onClick={() => showResults('event_stages', i)}>
              {event_stage.event_stage_name}
            </Button>
          </TableCell>
        );
      });
    }

  return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {list}
            </TableRow>
              {category_stage_list}
          </TableHead>
        </Table>
      </Paper>
    );
  }

}

export class EventDetailsRow extends React.Component {


  render() {
    const result = this.props.children;

    return (
      <TableRow >
        <TableCell>{result.position}</TableCell>
        <TableCell>{result.time}</TableCell>
        <TableCell>{result.first_name}</TableCell>
        <TableCell>{result.last_name}</TableCell>
        <TableCell>{result.gender}</TableCell>
        <TableCell>{result.gender_position}</TableCell>
      </TableRow>
    );
  }
}

export class EventDetailsTable extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = { event_details: this.props.event_details, table_data: null, display_results: null };

    this.showResults = this.showResults.bind(this);
  }


  showResults(type, index) {
    var data =  this.state.event_details[type][index].data;
    console.log(data);
    this.setState({table_data: data, event_details: this.state.event_details});
  }

  render() {
    const rows = [];

    if (this.state.table_data) {
      this.state.table_data.forEach (function (entry) {
        rows.push(
          <EventDetailsRow>
            {entry}
          </EventDetailsRow>
        );
      });

    }

    return (
      <Paper>
        <EventDetailsSelection event_details={this.state.event_details} showResults={this.showResults} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Gender Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    );
  }
}
