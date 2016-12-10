import React, {Component} from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

class AccountLookupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookupParameters: {}
    };
    this.setLookupParameters = this.setLookupParameters.bind(this);
    this.handleLookupParameterChange = this.handleLookupParameterChange.bind(this);
  }

  handleLookupParameterChange(event) {
    let paramName = event.target.name;
    let paramValue = event.target.value;
    let lookupParameters = this.state.lookupParameters;
    lookupParameters[paramName] = paramValue;
    this.setState({ lookupParameters: lookupParameters });
  }

  setLookupParameters(event) {
    this.props.setLookupParameters(this.state.lookupParameters);
    event.preventDefault();
  }

  render() {
    if (this.props.lookupParameters) {
      return (
          <Form>
            <Form.Group>
              {this.props.lookupParameters.map(lookupParameter => {
                return (
                    <Form.Field key={lookupParameter}>
                      <Input
                          size="mini"
                          key={lookupParameter}
                          name={lookupParameter}
                          label={lookupParameter}
                          onChange={this.handleLookupParameterChange}
                      />
                    </Form.Field>
                )
              })}
              <Button
                  compact primary
                  size="mini"
                  onClick={this.setLookupParameters}>
                Set
              </Button>
            </Form.Group>
          </Form>
      );
    } else {
      return null;
    }
  }
}

AccountLookupForm.propTypes = {
  lookupParameters: React.PropTypes.array.isRequired,
  setLookupParameters: React.PropTypes.func.isRequired
};

export default AccountLookupForm;
