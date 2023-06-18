import { renderDOM } from '../../../utils/renderDOM';
import { screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  test('WHEN add props THEN display correctly', () => {

    //WHEN
    renderDOM(<Dashboard />);
    const text = screen.getByText('Rozpocznij przygodę i otwórz się na wydarzenia wokół siebie');
    //THEN
    expect(text).toBeInTheDocument();
  });
});