import { renderDOM} from '../../../utils/renderDOM';
import { screen } from '@testing-library/react';
import UserProfileEdit from '../AccountSettings';


describe('UserProfileEdit', () => {
  beforeEach(() => {
    renderDOM(<UserProfileEdit />);
  });

  it('powinien poprawnie wyrenderować UserProfileEdit', () => {
    expect(screen.getByText('Edytuj swój profil')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Potwierdź hasło')).toBeInTheDocument();
    expect(screen.getByLabelText('Stare Hasło')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Zapisz/i })).toBeInTheDocument();
  });
});