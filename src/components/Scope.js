import React, {Component} from 'react';
import { Card, Checkbox } from 'semantic-ui-react';
import ScopeStatus from './ScopeStatus';

class Scope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approveOptionalScope: false
    };
    this.toggleApproveOptionalScope = this.toggleApproveOptionalScope.bind(this);
  }

  toggleApproveOptionalScope(event) {
    const granted = !this.state.approveOptionalScope;
    this.setState({ approveOptionalScope: granted });
    this.props.setOptionalScope(this.props.name, granted);
  }

  render() {
    return (
        <Card key={this.props.name} fluid className="Scope">
          <Card.Content>
            <Card.Header>
              {this.props.name} &nbsp;
              <ScopeStatus granted={this.props.granted}/>
            </Card.Header>
            <Card.Meta>
              {this.props.consentPromptText}
            </Card.Meta>
            <Card.Description>
              {this.props.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            { this.props.optional &&
                <div className="ui buttons">
                  <Checkbox
                      label="Grant optional scope"
                      onChange={this.toggleApproveOptionalScope}
                  />
                </div>
            }
          </Card.Content>
        </Card>
    );
  }
}

Scope.propTypes = {
  name: React.PropTypes.string.isRequired,
  consentPromptText: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  granted: React.PropTypes.bool.isRequired,
  optional: React.PropTypes.bool.isRequired,
  setOptionalScope: React.PropTypes.func
};

export default Scope;