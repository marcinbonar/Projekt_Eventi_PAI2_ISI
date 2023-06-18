import { screen, render } from '@testing-library/react';
import UserRow from '../UserRow';
import { Table } from '@chakra-ui/react';

describe('UserRow', () => {
  test('WHEN add props THEN display correctly', () => {
    //GIVEN
    const props = {
      name: 'Test',
      surname: 'Test',
      email: 'Test',
      isBlocked: false,
      onUnblock: jest.fn(),
      onBlock: jest.fn(),
    };

    //WHEN
    render(<Table><UserRow {...props} /></Table>);
    const text = screen.getByText('Zablokuj');
    //THEN
    expect(text).toBeInTheDocument();
  });
});