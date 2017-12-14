import React from "react";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

export class EventRow extends React.Component {


  render() {
    const date = this.props.entry['date'];
    const name = this.props.entry['title'];
    const id = this.props.entry['id'];

    return (
      <TableRow id={id} onClick={() => this.props.getEventDetails(id)} style={{cursor:'pointer'}}>
        <TableCell>{date}</TableCell>
        <TableCell>{name}</TableCell>
      </TableRow>
    );
  }
}

export class EventTable extends React.Component {


  
  constructor(props) {
    super(props);
    this.state = { table_data: '' };

  }

  render() {

    const styles = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
    });

    const rows = [];
    let getEventDetails = this.props.getEventDetails
    if (this.props.data) {
      this.props.data.forEach(function (entry) {
        rows.push(
          <EventRow
            entry={entry} 
            getEventDetails={getEventDetails}
          />
        );
      });
    }


    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event Name</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Paper>
    );
  }
}
