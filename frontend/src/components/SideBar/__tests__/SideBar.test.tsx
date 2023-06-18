import { screen } from '@testing-library/react';
import SideBar from '../SideBar';
import { renderDOM } from '../../../utils/renderDOM';
import userEvent from '@testing-library/user-event';

describe('SideBar', () => {
  it('WHEN add children THEN display correctly', () => {

    //WHEN
    renderDOM(<SideBar>Test</SideBar>);

    //THEN
    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
  });

});