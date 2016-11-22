import React, {Component} from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

class UsernamePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: 'password'
    };
    this.setCredentials = this.setCredentials.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  setCredentials(event) {
    this.props.setUsernamePassword(this.state.username, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
        <Form>
          <Form.Group>
            <Form.Field>
              <Input
                  size="mini"
                  label="Username"
                  defaultValue={this.state.username}
                  onChange={this.handleUsernameChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                  size="mini"
                  label="Password"
                  defaultValue="password"
                  onChange={this.handlePasswordChange}
              />
            </Form.Field>
            <Button
                compact primary
                size="mini"
                onClick={this.setCredentials}>
              Set
            </Button>
          </Form.Group>
        </Form>
    );
  }
}

export default UsernamePasswordForm;
