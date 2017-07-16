import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Label, Dropdown, Checkbox, Container, Divider } from 'semantic-ui-react';
import NumberedHeader from './NumberedHeader';
import {
  TELEPHONY_DELIVERED_CODE_MESSAGES,
  TELEPHONY_MESSAGING_PROVIDERS
} from '../Config';

class TelephonyDeliveredCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeRequested: false,
      language: TELEPHONY_DELIVERED_CODE_MESSAGES.language,
      verifyCode: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCodeRequested = this.toggleCodeRequested.bind(this);
    this.handleMessagingProviderChange = this.handleMessagingProviderChange.bind(this);
    this.setSendTelephonyRequest = this.setSendTelephonyRequest.bind(this);
    this.setTelephonyVerifyCode = this.setTelephonyVerifyCode.bind(this);
  }

  static toDropdownOptions(optionNames) {
    return optionNames.map(optionName => {
      return {
        value: optionName,
        text: optionName
      };
    });
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

  handleMessagingProviderChange(event) {
    this.setState({
      messagingProvider: event.target.textContent
    });
  }

  setSendTelephonyRequest(event) {
    this.props.setSendTelephonyRequest(this.state.codeRequested,
        this.state.language, this.state.messagingProvider);
    event.preventDefault();
  }

  setTelephonyVerifyCode(event) {
    this.props.setTelephonyVerifyCode(this.state.verifyCode);
    event.preventDefault();
  }

  render() {
    const messagingProviderOptions =
        TelephonyDeliveredCodeForm.toDropdownOptions(TELEPHONY_MESSAGING_PROVIDERS);
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
                    defaultChecked={this.state.codeRequested}
                    onChange={this.toggleCodeRequested}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field inline>
                <Input
                    size="mini"
                    label="Language"
                    name="language"
                    defaultValue={this.state.language}
                    onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field inline>
                <Label>Messaging provider</Label>
                <Dropdown
                    size="mini"
                    name="messagingProvider"
                    selection
                    options={messagingProviderOptions}
                    defaultValue={this.state.messagingProvider}
                    onChange={this.handleMessagingProviderChange}
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

TelephonyDeliveredCodeForm.propTypes = {
  setSendTelephonyRequest: PropTypes.func.isRequired,
  setTelephonyVerifyCode: PropTypes.func.isRequired
};

export default TelephonyDeliveredCodeForm;
