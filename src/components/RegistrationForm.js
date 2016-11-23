import React, {Component} from 'react';
import { Form, Button, Input, Divider } from 'semantic-ui-react';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrableAttributes: [],
      attributes: {}
    };
    this.register = this.register.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(event) {
    let paramName = event.target.name;
    let paramValue = event.target.value;
    let attributes = this.state.attributes;
    attributes[paramName] = paramValue;
    this.setState({ attributes: attributes });
  }

  register(event) {
    this.props.register(this.state.attributes);
    event.preventDefault();
  }

  render() {
    if (this.props.registrableAttributes) {
      return (
          <Form>
            {this.props.registrableAttributes.map(attribute => {
              return (
                  <Form.Field key={attribute}>
                    <Input
                        size="mini"
                        key={attribute}
                        name={attribute}
                        label={attribute}
                        onChange={this.handleAttributeChange}
                    />
                  </Form.Field>
              )
            })}
            <Button
                compact primary
                size="mini"
                onClick={this.register}>
              Set
            </Button>
            <Divider hidden/>
          </Form>
      );
    } else {
      return (
          <span/>
      );
    }
  }
}

export default RegistrationForm;
