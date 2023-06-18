import { renderDOM } from '../../../utils/renderDOM';
import { screen } from '@testing-library/react';
import SideBarForAdmin from '../SideBarForAdmin';

describe('SideBarForAdmin', () => {
  it('WHEN add children THEN display correctly', () => {

    //WHEN
    renderDOM(<SideBarForAdmin>Test</SideBarForAdmin>);

    //THEN
    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
  });
});