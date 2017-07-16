import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Divider, Header, Form, Button, Input } from 'semantic-ui-react';
import { PASSWORD_RECOVERY_URN, PASSWORD_RECOVERY_UI_DESCRIPTION } from '../Constants';

class PasswordRecoveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: ''
    };
    this.setNewPassword = this.setNewPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  setNewPassword(event) {
    this.props.setNewPassword(PASSWORD_RECOVERY_URN, this.state.newPassword);
    event.preventDefault();
  }

  render() {
    return (
        <Container className="PasswordRecovery">
          <Header as="h2">
            Password recovery
          </Header>
          <Container>
            { PASSWORD_RECOVERY_UI_DESCRIPTION }
          </Container>
          <Divider hidden/>
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

PasswordRecoveryForm.propTypes = {
  setNewPassword: PropTypes.func.isRequired
};

export default PasswordRecoveryForm;
