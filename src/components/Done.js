import React, {Component} from 'react';
import { Header, Table, Input } from 'semantic-ui-react';
import Helpers from '../Helpers';
import './Done.css';

class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: Helpers.parseParamsFromUrl(this.props.url)
    };
  }

  render() {
    return (
        <div className="Done">
          <Header as="h2">OAuth 2 response</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>param</Table.HeaderCell>
                <Table.HeaderCell>value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.params).map(key => {
                return (
                    <Table.Row key={key}>
                      <Table.Cell>{key}</Table.Cell>
                      {
                        key === 'access_token'
                        || key === 'id_token'
                        || key === 'refresh_token'
                            ? (
                                <Table.Cell>
                                  <Input
                                      transparent
                                      fluid
                                      defaultValue={this.state.params[key]}
                                  />
                                </Table.Cell>
                        )
                            : (<Table.Cell>{this.state.params[key]}</Table.Cell>)
                      }
                    </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
    );
  }
}

export default Done;