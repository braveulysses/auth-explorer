import React, {Component} from 'react';
import Scope from './Scope';
import { Container, Header, Card, Checkbox } from 'semantic-ui-react';
import './ScopeList.css';

class ScopeList extends Component {
  constructor(props) {
    super(props);
    this.state = { approved: this.props.approved };
    this.toggleScopesApproval = this.toggleScopesApproval.bind(this);
  }

  toggleScopesApproval(event) {
    const approved = !this.state.approved;
    this.setState({ approved: approved });
    this.props.setScopesApproved(approved);
  }

  render() {
    return (
        <Container className="ScopeList">
        <Header as="h2">
          { this.props.scopes.length > 0 ? 'Scopes' : '' }
        </Header>
          <Container>
            { this.props.scopes.length > 0 ? (
                <div className="ApprovalControl">
                  <Checkbox
                      toggle
                      defaultChecked={this.state.approved}
                      label="Approve scopes"
                      onChange={this.toggleScopesApproval}
                  />
                </div>
            ) : ''}
          </Container>
          <Card.Group>
            {this.props.scopes.map(scope => {
              return (
                  <Scope
                      key={scope.name}
                      name={scope.name}
                      consentPromptText={scope.consentPromptText}
                      description={scope.description}
                      granted={scope.approveOptionalScope}
                      optional={scope.optional}
                      setOptionalScope={this.props.setOptionalScope}
                  />
              );
            })}
          </Card.Group>
        </Container>
    );
  }
}

export default ScopeList;