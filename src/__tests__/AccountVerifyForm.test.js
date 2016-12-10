import React from 'react';

import AccountVerifyForm from '../components/AccountVerifyForm';

describe('The AccountVerifyForm component', () => {
  it('can handle a boolean verify attribute', () => {
    expect(AccountVerifyForm.typed('true')).toBe(true);
    expect(AccountVerifyForm.typed('false')).toBe(false);
  });

  it('can handle a numeric verify attribute', () => {
    expect(AccountVerifyForm.typed('1')).toBe(1);
  });

  it('can handle a string verify attribute', () => {
    expect(AccountVerifyForm.typed('string')).toBe('string');
  });
});