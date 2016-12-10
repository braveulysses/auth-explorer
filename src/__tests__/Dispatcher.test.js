import React from 'react';
import { shallow } from 'enzyme';

import Dispatcher from '../components/Dispatcher';

describe('The Dispatcher component', () => {
  it('correctly sets the step UI when a flow param is present', () => {
    const url = 'http://localhost/?flow=x';
    const wrapper = shallow(
        <Dispatcher
            url={url}
        />
    );

    expect(wrapper.state('step')).toBe('Log in');
  });

  it('correctly sets the step UI when an OAuth error param is present', () => {
    [ '?code=x', '#access_token=x', '#id_token=x', '?error=x', '#error=x' ].map((params) => {
      let url = `http://localhost/${params}`;
      let wrapper = shallow(
          <Dispatcher
              url={url}
          />
      );

      expect(wrapper.state('step')).toBe('Done');
    });
  });
});