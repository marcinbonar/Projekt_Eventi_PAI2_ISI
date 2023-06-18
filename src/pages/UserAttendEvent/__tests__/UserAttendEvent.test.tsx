import { render, screen } from '@testing-library/react';
import UserAttendEvent from '../UserAttendEvent';
import { renderDOM } from '../../../utils/renderDOM';

test('renders UserAttendEvent component', () => {
  renderDOM(<UserAttendEvent />);
});
