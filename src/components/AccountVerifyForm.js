import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Divider, Header, Input, Button } from 'semantic-ui-react';
import { ACCOUNT_VERIFY_UI_DESCRIPTION} from '../Constants';
import { ACCOUNT_VERIFY_ATTRIBUTES } from '../Config';

class AccountVerifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountVerifyAttributes: this.props.accountVerifyAttributes
    };
    this.setAccountVerifyAttributes = this.setAccountVerifyAttributes.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(event) {
    let attributeName = event.target.name;
    let attributeValue = event.target.value;
    let attributes = this.state.accountVerifyAttributes;
    attributes[attributeName] = AccountVerifyForm.typed(attributeValue);
    this.setState({ accountVerifyAttributes: attributes });
  }

  // Returns value as a boolean, a number, or, failing those, a string.
  // The boolean conversion does NOT understand truthiness or falsiness,
  // by design.
  static typed(value) {
    if (String(value).toLowerCase() === 'true') {
      return true;
    }
    if (String(value).toLowerCase() === 'false') {
      return false;
    }
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    return value;
  }

  setAccountVerifyAttributes(event) {
    let attributesToSet = {};
    Object.keys(this.state.accountVerifyAttributes).forEach(attributeKey => {
      attributesToSet[attributeKey] =
          AccountVerifyForm.typed(this.state.accountVerifyAttributes[attributeKey]);
    });
    this.props.setAccountVerifyAttributes(attributesToSet);
    event.preventDefault();
  }

  render() {
    const accountVerifyAttributes = this.props.accountVerifyAttributes;
    if (Object.keys(accountVerifyAttributes).length > 0) {
      return (
          <Container className="AccountVerify">
            <Header as="h2">
              Verify account
            </Header>
            <Container>
              { ACCOUNT_VERIFY_UI_DESCRIPTION }
            </Container>
            <Divider hidden/>
            <Form>
              <Form.Group>
                {Object.keys(accountVerifyAttributes).map(attributeKey => {
                  return (
                      <Form.Field key={attributeKey}>
                        <Input
                            size="mini"
                            key={attributeKey}
                            name={attributeKey}
                            label={attributeKey}
                            defaultValue={accountVerifyAttributes[attributeKey]}
                            onChange={this.handleAttributeChange}
                        />
                      </Form.Field>
                  );
                })}
                <Button
                    compact primary
                    size="mini"
                    onClick={this.setAccountVerifyAttributes}>
                  Set
                </Button>
              </Form.Group>
            </Form>
          </Container>
      );
    } else {
      return null;
    }
  }
}

AccountVerifyForm.propTypes = {
  accountVerifyAttributes: PropTypes.object,
  setAccountVerifyAttributes: PropTypes.func.isRequired
};

AccountVerifyForm.defaultProps = {
  accountVerifyAttributes: ACCOUNT_VERIFY_ATTRIBUTES
};

export default AccountVerifyForm;