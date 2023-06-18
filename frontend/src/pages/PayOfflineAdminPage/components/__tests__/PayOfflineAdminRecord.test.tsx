import { renderDOM } from '../../../../utils/renderDOM';
import { screen } from '@testing-library/react';
import { PayOfflineAdminRecord } from '../PayOfflineAdminRecord';

describe('PayOfflineAdminRecord', () => {
  test('WHEN add props THEN display correctly', () => {
    const userProps = {
      user: {
        role: 'ADMIN',
        userId: '1',
        email: '',
        events: []
      },
      handleOfflinePayment: jest.fn(),
    }
    //WHEN
    renderDOM(<PayOfflineAdminRecord {...userProps}/>);
    const text = screen.getByText('Użytkownik nie posiada biletów oczekujących na płatność offline');
    //THEN
    expect(text).toBeInTheDocument();
  });
});