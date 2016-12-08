import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import IdentityAuthenticatorStatus from './IdentityAuthenticatorStatus';
import DocumentationLink from './DocumentationLink';
import UsernamePasswordForm from './UsernamePasswordForm';
import TotpForm from './TotpForm';
import EmailDeliveredCodeForm from './EmailDeliveredCodeForm';
import TelephonyDeliveredCodeForm from './TelephonyDeliveredCodeForm';
import AccountLookupForm from './AccountLookupForm';
import RecaptchaForm from './RecaptchaForm';
import RegistrationForm from './RegistrationForm';
import './IdentityAuthenticator.css';

import { BROKER } from '../Config';
import {
    USERNAME_PASSWORD_AUTHENTICATOR_URN,
    USERNAME_PASSWORD_AUTHENTICATOR_DESCRIPTION,
    TOTP_AUTHENTICATOR_URN,
    TOTP_AUTHENTICATOR_DESCRIPTION,
    EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN,
    EMAIL_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION,
    TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN,
    TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION,
    ACCOUNT_LOOKUP_AUTHENTICATOR_URN,
    ACCOUNT_LOOKUP_AUTHENTICATOR_DESCRIPTION,
    EXTERNAL_IDENTITY_AUTHENTICATOR_URN,
    EXTERNAL_IDENTITY_AUTHENTICATOR_DESCRIPTION,
    RECAPTCHA_AUTHENTICATOR_URN,
    RECAPTCHA_AUTHENTICATOR_DESCRIPTION,
    REGISTRATION_AUTHENTICATOR_URN,
    REGISTRATION_AUTHENTICATOR_DESCRIPTION,
    THIRD_PARTY_AUTHENTICATOR_DESCRIPTION
} from '../Constants';

class IdentityAuthenticator extends Component {
  constructor(props) {
    super(props);
    this.state = IdentityAuthenticator.attrsFromUrn(this.props.authenticator.urn);
    this.remove = this.remove.bind(this);
  }

  static docUrl(slug) {
    return `https://developer.unboundid.com/${BROKER.currentVersion}/broker/api/auth/${slug}/`;
  }

  static attrsFromUrn(urn) {
    switch(urn) {
      case ACCOUNT_LOOKUP_AUTHENTICATOR_URN:
        return {
          name: 'Account Lookup',
          description: ACCOUNT_LOOKUP_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('account-lookup')
        };
      case EXTERNAL_IDENTITY_AUTHENTICATOR_URN:
        return {
          name: 'External Identity',
          description: EXTERNAL_IDENTITY_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('external-identity')
        };
      case RECAPTCHA_AUTHENTICATOR_URN:
        return {
          name: 'reCAPTCHA',
          description: RECAPTCHA_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('recaptcha')
        };
      case REGISTRATION_AUTHENTICATOR_URN:
        return {
          name: 'Registration',
          description: REGISTRATION_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('registration')
        };
      case TOTP_AUTHENTICATOR_URN:
        return {
          name: 'TOTP',
          description: TOTP_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('totp')
        };
      case EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN:
        return {
          name: 'Email Delivered Code',
          description: EMAIL_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('email-code')
        };
      case TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN:
        return {
          name: 'Telephony Delivered Code',
          description: TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('telephony-code')
        };
      case USERNAME_PASSWORD_AUTHENTICATOR_URN:
        return {
          name: 'Username Password',
          description: USERNAME_PASSWORD_AUTHENTICATOR_DESCRIPTION,
          docUrl: IdentityAuthenticator.docUrl('username-password')
        };
      default:
        return {
          name: 'Third-party authenticator',
          description: THIRD_PARTY_AUTHENTICATOR_DESCRIPTION
        }
    }
  }

  remove() {
    this.props.removeAuthenticator(this.props.authenticator.urn);
  }

  renderForm() {
    switch(this.props.authenticator.urn) {
      case USERNAME_PASSWORD_AUTHENTICATOR_URN:
        return (
            <UsernamePasswordForm
                username={this.props.data[USERNAME_PASSWORD_AUTHENTICATOR_URN].username}
                setUsernamePassword={this.props.data[USERNAME_PASSWORD_AUTHENTICATOR_URN].setUsernamePassword}
                setNewPassword={this.props.data[USERNAME_PASSWORD_AUTHENTICATOR_URN].setNewPassword}
            />
        );
      case TOTP_AUTHENTICATOR_URN:
        return (
            <TotpForm
                setTotp={this.props.data[TOTP_AUTHENTICATOR_URN].setTotp}
            />
        );
      case EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN:
        return (
            <EmailDeliveredCodeForm
                setSendEmailRequest={this.props.data[EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN].setSendEmailRequest}
                setEmailVerifyCode={this.props.data[EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN].setEmailVerifyCode}
            />
        );
      case TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN:
        return (
            <TelephonyDeliveredCodeForm
                setSendTelephonyRequest={this.props.data[TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN].setSendTelephonyRequest}
                setTelephonyVerifyCode={this.props.data[TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN].setTelephonyVerifyCode}
            />
        );
      case ACCOUNT_LOOKUP_AUTHENTICATOR_URN:
        return (
            <AccountLookupForm
                lookupParameters={this.props.data[ACCOUNT_LOOKUP_AUTHENTICATOR_URN].lookupParameters}
                setLookupParameters={this.props.data[ACCOUNT_LOOKUP_AUTHENTICATOR_URN].setLookupParameters}
            />
        );
      case RECAPTCHA_AUTHENTICATOR_URN:
        return (
            <RecaptchaForm
                recaptchaKey={this.props.data[RECAPTCHA_AUTHENTICATOR_URN].recaptchaKey}
                setRecaptchaResponse={this.props.data[RECAPTCHA_AUTHENTICATOR_URN].setRecaptchaResponse}
            />
        );
      case REGISTRATION_AUTHENTICATOR_URN:
        return (
            <RegistrationForm
                registrableAttributes={this.props.data[REGISTRATION_AUTHENTICATOR_URN].registrableAttributes}
                register={this.props.data[REGISTRATION_AUTHENTICATOR_URN].register}
            />
        );
      default:
        return '';
    }
  }

  render() {
    return (
      <Card
          key={this.props.authenticator.urn}
          fluid
          className="IdentityAuthenticator"
      >
        <Card.Content>
          <Card.Header>
            {this.state.name} &nbsp;
            <DocumentationLink url={this.state.docUrl}/>
            <IdentityAuthenticatorStatus status={this.props.authenticator.status}/>
          </Card.Header>
          <Card.Meta>
            {this.props.urn}
          </Card.Meta>
          <Card.Description>
            {this.state.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          { this.renderForm() }
          <div className="ui buttons">
            <Button
                negative
                content="Remove"
                size="small"
                icon="remove"
                labelPosition="left"
                onClick={this.remove}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

IdentityAuthenticator.propTypes = {
  authenticator: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  removeAuthenticator: React.PropTypes.func.isRequired
};

export default IdentityAuthenticator;
