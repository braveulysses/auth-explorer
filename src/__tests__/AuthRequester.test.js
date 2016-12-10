import React from 'react';
import { shallow } from 'enzyme';

import * as Constants from '../Constants';
import AuthRequester from '../components/AuthRequester';

function authRequester(body, setDispatcherUrlMock, setActiveStepMock) {
  let setDispatcherUrl = setDispatcherUrlMock || jest.fn();
  let setActiveStep = setActiveStepMock || jest.fn();
  const wrapper = shallow(
      <AuthRequester
          url=""
          setDispatcherUrl={setDispatcherUrl}
          setActiveStep={setActiveStep}
      />
  );
  wrapper.instance().setBodyFromObject(body);
  return wrapper;
}

function actualBody(wrapper) {
  return JSON.parse(wrapper.state('body'));
}

describe('The AuthRequester component', () => {
  it('can remove an identity authenticator', () => {
    const body = {};
    body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN] = {
      status: "ready",
      username: "user.1",
      password: "password"
    };
    body[Constants.TOTP_AUTHENTICATOR_URN] = {
      status: 'ready',
      password: '12345'
    };
    const wrapper = authRequester(body);

    wrapper.instance().removeIdentityAuthenticator(Constants.TOTP_AUTHENTICATOR_URN);

    const actual = actualBody(wrapper);
    expect(actual[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]).toBeDefined();
    expect(actual[Constants.TOTP_AUTHENTICATOR_URN]).not.toBeDefined();
  });

  it('can set a username and password', () => {
    const body = {};
    body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN] = {
      status: "ready"
    };
    const wrapper = authRequester(body);

    wrapper.instance().setUsernamePassword('username', 'password');

    const actual = actualBody(wrapper);
    expect(actual[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]['username']).toBe('username');
    expect(actual[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]['password']).toBe('password');
  });

  it('can set the newPassword field for the Username Password authenticator', () => {
    const body = {};
    body[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN] = {
      status: "ready"
    };
    const wrapper = authRequester(body);

    wrapper.instance().setNewPassword(Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN, 'new-password');

    const actual = actualBody(wrapper);
    expect(actual[Constants.USERNAME_PASSWORD_AUTHENTICATOR_URN]['newPassword']).toBe('new-password');
  });

  it('can set the newPassword field for the Password Recovery flow', () => {
    const body = {};
    body['schemas'] = [
        Constants.PASSWORD_RECOVERY_URN
    ];
    body['meta'] = {
      resourceType: Constants.PASSWORD_RECOVERY_RESOURCE_TYPE
    };
    const wrapper = authRequester(body);

    wrapper.instance().setNewPassword(Constants.PASSWORD_RECOVERY_URN, 'new-password');

    const actual = actualBody(wrapper);
    expect(actual['newPassword']).toBe('new-password');
  });

  it('can set a TOTP authenticator password', () => {
    const body = {};
    body[Constants.TOTP_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setTotp('12345');

    const actual = actualBody(wrapper);
    expect(actual[Constants.TOTP_AUTHENTICATOR_URN]['password']).toBe('12345')
  });

  it('can set an email delivery request', () => {
    const body = {};
    body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setSendEmailRequest('subject', 'text');

    const actual = actualBody(wrapper);
    expect(actual[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['messageSubject']).toBe('subject');
    expect(actual[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['messageText']).toBe('text');
  });

  it('can set an email verify code', () => {
    const body = {};
    body[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setEmailVerifyCode('12345');

    const actual = actualBody(wrapper);
    expect(actual[Constants.EMAIL_DELIVERED_CODE_AUTHENTICATOR_URN]['verifyCode']).toBe('12345');
  });

  it('can set a telephony delivery request', () => {
    const body = {};
    body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setSendTelephonyRequest('message', 'language', 'provider');

    const actual = actualBody(wrapper);
    expect(actual[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['messagingProvider']).toBe('provider');
    expect(actual[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['deliverCode']['message']).toBe('message');
    expect(actual[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['deliverCode']['language']).toBe('language');
  });

  it('can set a telephony verify code', () => {
    const body = {};
    body[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setTelephonyVerifyCode('12345');

    const actual = actualBody(wrapper);
    expect(actual[Constants.TELEPHONY_DELIVERED_CODE_AUTHENTICATOR_URN]['verifyCode']).toBe('12345');
  });

  it('can set lookup parameters', () => {
    const body = {};
    body[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    const lookupParams = {
      one: 1,
      a: "a",
    };
    wrapper.instance().setLookupParameters(lookupParams);

    const actual = actualBody(wrapper);
    expect(actual[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN]['one']).toBe(1);
    expect(actual[Constants.ACCOUNT_LOOKUP_AUTHENTICATOR_URN]['a']).toBe('a');
  });

  it('can set a reCAPTCHA response', () => {
    const body = {};
    body[Constants.RECAPTCHA_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    wrapper.instance().setRecaptchaResponse('12345');

    const actual = actualBody(wrapper);
    expect(actual[Constants.RECAPTCHA_AUTHENTICATOR_URN]['recaptchaResponse']).toBe('12345');
  });

  it('can set registration attributes for a new user', () => {
    const body = {};
    body[Constants.REGISTRATION_AUTHENTICATOR_URN] = {};
    const wrapper = authRequester(body);

    const registrationAttributes = {
      userName: "username",
      password: "password"
    };
    wrapper.instance().register(registrationAttributes);

    const actual = actualBody(wrapper);
    expect(actual[Constants.REGISTRATION_AUTHENTICATOR_URN]['registerResourceAttributes']['userName']).toBe('username');
    expect(actual[Constants.REGISTRATION_AUTHENTICATOR_URN]['registerResourceAttributes']['password']).toBe('password');
  });

  it('can set verification attributes for a user', () => {
    const body = {};
    body['schemas'] = [
      Constants.ACCOUNT_VERIFY_URN
    ];
    body['meta'] = {
      resourceType: Constants.VERIFY_ACCOUNT_RESOURCE_TYPE
    };
    const wrapper = authRequester(body);

    const accountVerifyAttributes = {
      boolean: true,
      string: "string",
      number: 1
    };
    wrapper.instance().setAccountVerifyAttributes(accountVerifyAttributes);

    const actual = actualBody(wrapper);
    expect(actual['accountVerifiedResourceAttributes']['boolean']).toBe(true);
    expect(actual['accountVerifiedResourceAttributes']['string']).toBe('string');
    expect(actual['accountVerifiedResourceAttributes']['number']).toBe(1);
  });

  it('can set scopes as approved', () => {
    const body = {
      approved: false
    };
    body['schemas'] = [
      Constants.CONSENT_HANDLER_URN
    ];
    body['meta'] = {
      resourceType: Constants.CONSENT_RESOURCE_TYPE
    };
    const wrapper = authRequester(body);

    wrapper.instance().setScopesApproved(true);

    const actual = actualBody(wrapper);
    expect(actual['approved']).toBe(true);
  });

  it('can set scopes as approved', () => {
    const body = {
      approved: false
    };
    body['schemas'] = [
      Constants.CONSENT_HANDLER_URN
    ];
    body['meta'] = {
      resourceType: Constants.CONSENT_RESOURCE_TYPE
    };
    const wrapper = authRequester(body);

    wrapper.instance().setOptionalScope('approvedScope1', true);
    let actual = actualBody(wrapper);
    expect(actual['optionalScopes']).toContain('approvedScope1');

    wrapper.instance().setOptionalScope('approvedScope2', true);
    actual = actualBody(wrapper);
    expect(actual['optionalScopes']).toContain('approvedScope1');
    expect(actual['optionalScopes']).toContain('approvedScope2');

    wrapper.instance().setOptionalScope('approvedScope1', false);
    actual = actualBody(wrapper);
    expect(actual['optionalScopes']).not.toContain('approvedScope1');
    expect(actual['optionalScopes']).toContain('approvedScope2');
  });

  it('correctly sets the Log In step', () => {
    const body = {};
    body['schemas'] = [
      Constants.AUTHENTICATION_URN
    ];
    body['meta'] = {
      resourceType: Constants.LOGIN_RESOURCE_TYPE
    };
    const setDispatcherUrl = jest.fn();
    const setActiveStep = jest.fn();
    authRequester(body, setDispatcherUrl, setActiveStep);

    expect(setActiveStep.mock.calls[0]).toContain('Log in');
  });

  it('correctly sets the Second Factor step', () => {
    const body = {};
    body['schemas'] = [
      Constants.AUTHENTICATION_URN
    ];
    body['meta'] = {
      resourceType: Constants.SECOND_FACTOR_RESOURCE_TYPE
    };
    const setDispatcherUrl = jest.fn();
    const setActiveStep = jest.fn();
    authRequester(body, setDispatcherUrl, setActiveStep);

    expect(setActiveStep.mock.calls[0]).toContain('Second factor');
  });

  it('correctly sets the Consent step', () => {
    const body = {
      approved: false
    };
    body['schemas'] = [
      Constants.CONSENT_HANDLER_URN
    ];
    body['meta'] = {
      resourceType: Constants.CONSENT_RESOURCE_TYPE
    };
    const setDispatcherUrl = jest.fn();
    const setActiveStep = jest.fn();
    authRequester(body, setDispatcherUrl, setActiveStep);

    expect(setActiveStep.mock.calls[0]).toContain('Consent');
  });

  it('correctly sets the Account Flow step for a Username Recovery flow', () => {
    const body = {};
    body['schemas'] = [
      Constants.USERNAME_RECOVERY_URN
    ];
    body['meta'] = {
      resourceType: Constants.USERNAME_RECOVERY_RESOURCE_TYPE
    };
    const setDispatcherUrl = jest.fn();
    const setActiveStep = jest.fn();
    authRequester(body, setDispatcherUrl, setActiveStep);

    expect(setActiveStep.mock.calls[0]).toContain('Account flow');
  });

  it('correctly sets the Account Flow step for a Password Recovery flow', () => {
    const body = {};
    body['schemas'] = [
      Constants.PASSWORD_RECOVERY_URN
    ];
    body['meta'] = {
      resourceType: Constants.PASSWORD_RECOVERY_RESOURCE_TYPE
    };
    const setDispatcherUrl = jest.fn();
    const setActiveStep = jest.fn();
    authRequester(body, setDispatcherUrl, setActiveStep);

    expect(setActiveStep.mock.calls[0]).toContain('Account flow');
  });
});