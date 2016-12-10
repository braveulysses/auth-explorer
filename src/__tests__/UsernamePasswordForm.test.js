import React from 'react';
import { shallow } from 'enzyme';
import { event } from '../Helpers';

import UsernamePasswordForm from '../components/UsernamePasswordForm';

describe('The UsernamePasswordForm component', () => {
  it('sets the username and password correctly after a form change', () => {
    const setUsernamePassword = jest.fn();
    const setNewPassword = jest.fn();
    const wrapper = shallow(
        <UsernamePasswordForm
            setUsernamePassword={setUsernamePassword}
            setNewPassword={setNewPassword}
        />
    );

    wrapper.find('Input[name="username"]').simulate('change', event('username', 'phil'));
    wrapper.find('Input[name="password"]').simulate('change', event('password', 'ubik'));

    expect(wrapper.state('username')).toBe('phil');
    expect(wrapper.state('password')).toBe('ubik');

    wrapper.find('Button#buttonSetUsernamePassword').simulate('click', event(null, null));
    expect(setUsernamePassword.mock.calls[0]).toEqual([ 'phil', 'ubik' ]);
  });

  it('sets a new password correctly after a form change', () => {
    const setUsernamePassword = jest.fn();
    const setNewPassword = jest.fn();
    const wrapper = shallow(
        <UsernamePasswordForm
            setUsernamePassword={setUsernamePassword}
            setNewPassword={setNewPassword}
        />
    );

    wrapper.find('Input[name="newPassword"]').simulate('change', event('newPassword', 'new-password'));

    expect(wrapper.state('newPassword')).toBe('new-password');

    wrapper.find('Button#buttonSetNewPassword').simulate('click', event(null, null));
    expect(setNewPassword.mock.calls[0]).toContain('new-password');
  });
});