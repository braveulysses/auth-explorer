import React, {Component} from 'react';
import { Message, Icon } from 'semantic-ui-react';

class Hint extends Component {
  render() {
    return (
        <Message icon info className="Hint">
          <Icon name="info circle"/>
          <Message.Content>
            <Message.Header>Suggested action</Message.Header>
            <p>{this.props.children}</p>
          </Message.Content>
        </Message>
    );
  }
}

export default Hint;