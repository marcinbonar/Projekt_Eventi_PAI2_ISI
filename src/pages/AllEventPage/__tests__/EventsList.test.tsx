import { renderDOM } from '../../../utils/renderDOM';
import EventsList from '../EventsList';

test('renders UserAttendEvent component', () => {
  renderDOM(<EventsList/>);
});
