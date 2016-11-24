import React, {Component} from 'react';
import { Form, Button, Input, Container, Header, Divider } from 'semantic-ui-react';
import { EMAIL_DELIVERED_CODE_MESSAGES } from '../Config';

class EmailDeliveredCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageSubject: EMAIL_DELIVERED_CODE_MESSAGES.messageSubject,
      messageText: EMAIL_DELIVERED_CODE_MESSAGES.messageText,
      verifyCode: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSendEmailRequest = this.setSendEmailRequest.bind(this);
    this.setEmailVerifyCode = this.setEmailVerifyCode.bind(this);
  }

  handleInputChange(event) {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  setSendEmailRequest(event) {
    this.props.setSendEmailRequest(this.state.messageSubject,
        this.state.messageText);
    event.preventDefault();
  }

  setEmailVerifyCode(event) {
    this.props.setEmailVerifyCode(this.state.verifyCode);
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
                    label="Subject"
                    name="messageSubject"
                    defaultValue={this.state.messageSubject}
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field width="eight">
                <Input
                    size="mini"
                    label="Text"
                    name="messageText"
                    defaultValue={this.state.messageText}
                    onChange={this.handleInputChange}
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
  setSendEmailRequest: React.PropTypes.func.isRequired
};

export default EmailDeliveredCodeForm;
