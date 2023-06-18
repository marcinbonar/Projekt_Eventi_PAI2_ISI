import { render, screen } from '@testing-library/react';
import MainBackground from '../MainBackground';

describe('MainBackground', () => {
  it('powinien poprawnie wyrenderować dzieci', () => {
    // Kiedy
    render(<MainBackground>Testowy tekst</MainBackground>);

    // Wtedy
    const text = screen.getByText('Testowy tekst');
    expect(text).toBeInTheDocument();
  });


});