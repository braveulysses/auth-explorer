import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Form, Button, Input } from 'semantic-ui-react';
import { USERNAME_PASSWORD_AUTHENTICATOR_URN } from '../Constants';

class UsernamePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: 'password',
      newPassword: ''
    };
    this.setCredentials = this.setCredentials.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  setCredentials(event) {
    this.props.setUsernamePassword(this.state.username, this.state.password);
    event.preventDefault();
  }

  setNewPassword(event) {
    this.props.setNewPassword(USERNAME_PASSWORD_AUTHENTICATOR_URN, this.state.newPassword);
    event.preventDefault();
  }

  render() {
    return (
        <Container>
          <Header size="tiny">Log in</Header>
          <Form>
            <Form.Group>
              <Form.Field>
                <Input
                    size="mini"
                    label="Username"
                    name="username"
                    defaultValue={this.state.username}
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                    size="mini"
                    label="Password"
                    name="password"
                    defaultValue="password"
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Button
                  id="buttonSetUsernamePassword"
                  compact primary
                  size="mini"
                  onClick={this.setCredentials}>
                Set
              </Button>
            </Form.Group>
          </Form>
          <Header size="tiny">Set new password</Header>
          <Form>
            <Form.Group>
              <Form.Field>
                <Input
                    size="mini"
                    label="New password"
                    name="newPassword"
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Button
                  id="buttonSetNewPassword"
                  compact primary
                  size="mini"
                  onClick={this.setNewPassword}>
                Set
              </Button>
            </Form.Group>
          </Form>
        </Container>
    );
  }
}

UsernamePasswordForm.propTypes = {
  setUsernamePassword: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired
};

export default UsernamePasswordForm;
