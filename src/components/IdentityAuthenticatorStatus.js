import React, {Component} from 'react';
import { Label } from 'semantic-ui-react';

class IdentityAuthenticatorStatus extends Component {
  render() {
    if (this.props.status) {
      switch(this.props.status) {
        case 'success':
          return (
              <Label color="green" horizontal size="tiny">{this.props.status}</Label>
          );
        case 'ready':
          return (
              <Label color="orange" horizontal size="tiny">{this.props.status}</Label>
          );
        default:
          return (
              <Label color="red" horizontal size="tiny">{this.props.status}</Label>
          );
      }
    } else {
      return (
          <span/>
      );
    }
  }
}

IdentityAuthenticatorStatus.propTypes = {
  status: React.PropTypes.string.isRequired
};

export default IdentityAuthenticatorStatus;