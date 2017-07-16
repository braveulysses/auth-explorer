import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Checkbox, Container, Divider } from 'semantic-ui-react';
import NumberedHeader from './NumberedHeader';

class EmailDeliveredCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeRequested: false,
      verifyCode: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCodeRequested = this.toggleCodeRequested.bind(this);
    this.setSendEmailRequest = this.setSendEmailRequest.bind(this);
    this.setEmailVerifyCode = this.setEmailVerifyCode.bind(this);
  }

  handleInputChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  toggleCodeRequested(event) {
    const codeRequested = !this.state.codeRequested;
    this.setState({ codeRequested: codeRequested });
  }

  setSendEmailRequest(event) {
    this.props.setSendEmailRequest(this.state.codeRequested);
    event.preventDefault();
  }

  setEmailVerifyCode(event) {
    this.props.setEmailVerifyCode(this.state.verifyCode);
    event.preventDefault();
  }

  render() {
    return (
        <Container>
          <NumberedHeader size="tiny" number="1">Deliver code</NumberedHeader>
          <Form>
            <Form.Group>
              <Form.Field inline>
                <Checkbox
                    size="mini"
                    label="Code requested"
                    name="codeRequested"
                    checked={this.state.codeRequested}
                    onChange={this.toggleCodeRequested}
                />
              </Form.Field>
              <Form.Field>
                <Button
                    compact primary
                    size="mini"
                    onClick={this.setSendEmailRequest}>
                  Set
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
          <Divider/>
          <NumberedHeader size="tiny" number="2">Submit code</NumberedHeader>
          <Form>
            <Form.Group>
              <Form.Field>
                <Input
                    size="mini"
                    label="Code"
                    name="verifyCode"
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <Button
                    compact primary
                    size="mini"
                    onClick={this.setEmailVerifyCode}>
                  Set
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </Container>
    );
  }
}

EmailDeliveredCodeForm.propTypes = {
  setSendEmailRequest: PropTypes.func.isRequired
};

export default EmailDeliveredCodeForm;
