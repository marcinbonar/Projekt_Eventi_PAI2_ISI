import { renderDOM } from '../../../utils/renderDOM';
import StatisticsSolidTickets from '../index';

describe('StatiscticsSolidTicket', () => {
    test('renders without error', () => {
        renderDOM(<StatisticsSolidTickets />);
    });
});