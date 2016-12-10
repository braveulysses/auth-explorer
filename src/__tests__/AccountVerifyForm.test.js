import React from 'react';
import { shallow } from 'enzyme';
import { event } from '../Helpers';

import AccountVerifyForm from '../components/AccountVerifyForm';
import { ACCOUNT_VERIFY_ATTRIBUTES } from '../Config';

describe('The AccountVerifyForm component', () => {
  it('defaults its account verify attributes correctly', () => {
    const setAccountVerifyAttributes = jest.fn();
    const wrapper = shallow(
        <AccountVerifyForm
            setAccountVerifyAttributes={setAccountVerifyAttributes}
        />
    );

    Object.keys(ACCOUNT_VERIFY_ATTRIBUTES).map(attributeKey => {
      expect(wrapper.find(`Input[name="${attributeKey}"]`).length).toEqual(1);
      expect(wrapper.find(`Input[name="${attributeKey}"]`).prop('defaultValue')).toEqual(ACCOUNT_VERIFY_ATTRIBUTES[attributeKey]);
    });
  });

  it('sets its account verify attributes after a form change', () => {
    const setAccountVerifyAttributes = jest.fn();
    const accountVerifyAttributes = {
      verified: true
    };
    const wrapper = shallow(
        <AccountVerifyForm
            accountVerifyAttributes={accountVerifyAttributes}
            setAccountVerifyAttributes={setAccountVerifyAttributes}
        />
    );

    wrapper.find('Input[name="verified"]').simulate('change', event('verified', 'false'));
    wrapper.find('Button').simulate('click', event(null, null));

    expect(wrapper.state('accountVerifyAttributes')['verified']).toBe(false);
  });
});

describe('The typed() static method', () => {
  it('can recognize a boolean verify attribute', () => {
    expect(AccountVerifyForm.typed('true')).toBe(true);
    expect(AccountVerifyForm.typed('false')).toBe(false);
  });

  it('can recognize a numeric verify attribute', () => {
    expect(AccountVerifyForm.typed('1')).toBe(1);
  });

  it('can recognize a string verify attribute', () => {
    expect(AccountVerifyForm.typed('string')).toBe('string');
  });
});