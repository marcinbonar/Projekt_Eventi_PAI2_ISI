import { renderDOM } from '../../../utils/renderDOM';
import { screen } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  test('WHEN add props THEN display correctly', () => {

    //WHEN
    renderDOM(<NotFoundPage />);
    const text = screen.getByText('Strona nie została znaleziona');
    //THEN
    expect(text).toBeInTheDocument();
  });
});