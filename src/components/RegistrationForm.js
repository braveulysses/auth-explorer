import React, {Component} from 'react';
import { Form, Button, Input, Divider } from 'semantic-ui-react';
import { COMPLEX_ATTRIBUTES } from '../Config';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    let registrableAttributes = [];
    this.props.registrableAttributes.forEach(attribute => {
      if (COMPLEX_ATTRIBUTES[attribute]) {
        COMPLEX_ATTRIBUTES[attribute].forEach(subAttribute => {
          registrableAttributes.push(`${attribute}.${subAttribute}`);
        })
      } else {
        registrableAttributes.push(attribute);
      }
    });
    this.state = {
      registrableAttributes: registrableAttributes,
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

  buildRegisterResourceAttributes(attributes) {
    let attributesToRegister = {};
    Object.keys(attributes).forEach(attributeName => {
      let paths = attributeName.split('.');
      if (Object.keys(COMPLEX_ATTRIBUTES).includes(paths[0])) {
        if (!Object.keys(attributesToRegister).includes(paths[0])) {
          attributesToRegister[paths[0]] = {};
        }
        attributesToRegister[paths[0]][paths[1]] = attributes[attributeName];
      } else {
        attributesToRegister[attributeName] = attributes[attributeName];
      }
    });
    return attributesToRegister;
  }

  register(event) {
    this.props.register(this.buildRegisterResourceAttributes(this.state.attributes));
    event.preventDefault();
  }

  render() {
    if (this.props.registrableAttributes) {
      return (
          <Form>
            {this.state.registrableAttributes.map(attribute => {
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
      return null;
    }
  }
}

RegistrationForm.propTypes = {
  registrableAttributes: React.PropTypes.array.isRequired
};

export default RegistrationForm;
