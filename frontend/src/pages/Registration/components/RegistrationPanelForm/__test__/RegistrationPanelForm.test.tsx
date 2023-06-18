import { render, screen } from '@testing-library/react';
import { renderDOM } from '../../../../../utils/renderDOM';
import { RegistrationPanelForm } from '../../index';


test('renders registration form', () => {
  renderDOM(<RegistrationPanelForm />);

  const registerButtons = screen.queryAllByText('Zarejestruj się');
  expect(registerButtons.length).toBe(2);
});