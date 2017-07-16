import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

class RecaptchaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
    this.handleRecaptchaResponseChange = this.handleRecaptchaResponseChange.bind(this);
    this.setRecaptchaResponse = this.setRecaptchaResponse.bind(this);
  }

  handleRecaptchaResponseChange(response) {
    this.setState({ response: response });
  }

  setRecaptchaResponse(event) {
    this.props.setRecaptchaResponse(this.state.response);
    event.preventDefault();
  }

  render() {
    return (
        <Form>
          <Form.Group>
            <Form.Field>
              <ReCAPTCHA
                  ref="g-recaptcha"
                  sitekey={this.props.recaptchaKey}
                  onChange={this.handleRecaptchaResponseChange}
              />
            </Form.Field>
            <Button
                compact primary
                size="mini"
                onClick={this.setRecaptchaResponse}>
              Set
            </Button>
          </Form.Group>
        </Form>
    );
  }
}

RecaptchaForm.propTypes = {
  recaptchaKey: PropTypes.string.isRequired,
  setRecaptchaResponse: PropTypes.func.isRequired
};

export default RecaptchaForm;
