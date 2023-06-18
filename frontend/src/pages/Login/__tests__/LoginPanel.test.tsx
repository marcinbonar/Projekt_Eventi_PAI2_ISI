import React from 'react';
import LoginPanel from '../LoginPanel';
import { renderDOM } from '../../../utils/renderDOM';

jest.mock('gapi-script');

test('renders LoginPanel component', () => {
      renderDOM(<LoginPanel />);
});