import React, {Component} from 'react';
import { Form, Button, Input, Container, Header, Divider } from 'semantic-ui-react';

class TelephonyDeliveredCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeValue: '', // E.g., phone number
      message: 'Your one-time password code is: %code%',
      language: 'en-US',
      verifyCode: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSendTelephonyRequest = this.setSendTelephonyRequest.bind(this);
    this.setTelephonyVerifyCode = this.setTelephonyVerifyCode.bind(this);
  }

  handleInputChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  setSendTelephonyRequest(event) {
    this.props.setSendTelephonyRequest(this.state.attributeValue,
        this.state.message, this.state.language);
    event.preventDefault();
  }

  setTelephonyVerifyCode(event) {
    this.props.setTelephonyVerifyCode(this.state.verifyCode);
    event.preventDefault();
  }

  render() {
    return (
        <Container>
          <Header size="tiny">Deliver code</Header>
          <Form>
            <Form.Group>
              <Form.Field width="six">
                <Input
                    size="mini"
                    label="Message"
                    name="message"
                    defaultValue={this.state.message}
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field width="eight">
                <Input
                    size="mini"
                    label="Language"
                    name="Language"
                    defaultValue={this.state.language}
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <Button
                    compact primary
                    size="mini"
                    onClick={this.setSendTelephonyRequest}>
                  Set
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
          <Divider/>
          <Header size="tiny">Submit code</Header>
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
                    onClick={this.setTelephonyVerifyCode}>
                  Set
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </Container>
    );
  }
}

export default TelephonyDeliveredCodeForm;
