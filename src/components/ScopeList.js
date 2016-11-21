import React, {Component} from 'react';
import Scope from './Scope';
import { Container, Divider, Header, Card, Checkbox } from 'semantic-ui-react';
import './ScopeList.css';
import { SCOPES_UI_DESCRIPTION } from '../Constants';

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
    if (this.props.scopes.length > 0) {
      return (
          <Container className="ScopeList">
            <Header as="h2">
              Scopes
            </Header>
            <Container>
              { SCOPES_UI_DESCRIPTION }
            </Container>
            <Divider hidden/>
            <Container>
              <div className="ApprovalControl">
                <Checkbox
                    toggle
                    defaultChecked={this.state.approved}
                    label="Approve scopes"
                    onChange={this.toggleScopesApproval}
                />
              </div>
            </Container>
            <Card.Group>
              {this.props.scopes.map(scope => {
                return (
                    <Scope
                        key={scope.name}
                        name={scope.name}
                        consentPromptText={scope.consentPromptText}
                        description={scope.description}
                        granted={scope.granted}
                        optional={scope.optional}
                        setOptionalScope={this.props.setOptionalScope}
                    />
                );
              })}
            </Card.Group>
          </Container>
      );
    } else {
      return (
          <div/>
      );
    }
  }
}

export default ScopeList;