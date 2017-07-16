import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'semantic-ui-react';

class TotpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
    this.setCredentials = this.setCredentials.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  setCredentials(event) {
    this.props.setTotp(this.state.password);
    event.preventDefault();
  }

  render() {
    return (
        <Form>
          <Form.Group>
            <Form.Field>
              <Input
                  size="mini"
                  label="Password"
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

TotpForm.propTypes = {
  setTotp: PropTypes.func.isRequired
};

export default TotpForm;
