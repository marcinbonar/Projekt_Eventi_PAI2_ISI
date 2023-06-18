import { screen } from '@testing-library/react';
import LoginPanelForm from '../LoginPanelForm';
import { renderDOM } from '../../../../../utils/renderDOM';

jest.mock('gapi-script');

describe('LoginPanelForm', () => {
  beforeEach(() => {
    renderDOM(<LoginPanelForm />);
  });

  it('wyświetla pole do wprowadzenia adresu email', () => {
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('wyświetla pole do wprowadzenia hasła', () => {
    const passwordInput = screen.getByLabelText(/hasło/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('wyświetla przycisk rejestracji', () => {
    const registerButton = screen.getByRole('button', { name: /zarejestruj się/i });
    expect(registerButton).toBeInTheDocument();
  });
});
