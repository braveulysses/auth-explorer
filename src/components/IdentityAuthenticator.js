import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react';

class IdentityAuthenticator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.nameFromUrn(this.props.urn)
    };
    this.remove = this.remove.bind(this);
  }

  nameFromUrn(urn) {
    switch(urn) {
      case 'urn:pingidentity:scim:api:messages:2.0:AccountLookupRequest':
        return 'Account Lookup';
      case 'urn:pingidentity:scim:api:messages:2.0:ExternalIdentityAuthenticationRequest':
        return 'External Identity';
      case 'urn:pingidentity:scim:api:messages:2.0:RecaptchaAuthenticationRequest':
        return 'reCAPTCHA';
      case 'urn:pingidentity:scim:api:messages:2.0:RegistrationAuthenticationRequest':
        return 'Registration';
      case 'urn:pingidentity:scim:api:messages:2.0:TOTPAuthenticationRequest':
        return 'TOTP';
      case 'urn:pingidentity:scim:api:messages:2.0:EmailDeliveredCodeAuthenticationRequest':
        return 'Email Delivered Code';
      case 'urn:pingidentity:scim:api:messages:2.0:TelephonyDeliveredCodeAuthenticationRequest':
        return 'Telephony Delivered Code';
      case 'urn:pingidentity:scim:api:messages:2.0:UsernamePasswordAuthenticationRequest':
        return 'Username Password';
      default:
        return 'Unrecognized authenticator'
    }
  }

  remove() {
    console.log("remove " + this.state.name);
    this.props.removeAuthenticator(this.props.urn);
  }

  render() {
    return (
      <div>
        <Icon name="square" size="small"/> &nbsp;
        {this.state.name} &nbsp;
        <Icon
            name="remove"
            color="red"
            size="small"
            onClick={this.remove}
        />
      </div>
    );
  }
}

export default IdentityAuthenticator;
