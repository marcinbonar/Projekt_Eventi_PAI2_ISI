import { screen } from '@testing-library/react';
import BlockUsers from '../BlockUsers';
import { renderDOM } from '../../../utils/renderDOM';

describe('BlockUsers', () => {
  test('WHEN add props THEN display correctly', () => {

    //WHEN
    renderDOM(<BlockUsers />);
    const text = screen.getByText('Ładowanie...');
    //THEN
    expect(text).toBeInTheDocument();
  });
});