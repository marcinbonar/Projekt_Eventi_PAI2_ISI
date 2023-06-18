import { IconType } from 'react-icons';
import { FaHome, FaRegCalendarCheck } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdEvent } from 'react-icons/md';

import { ROUTE_CONSTANTS } from '../../../../constants/routesConstants';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Strona Główna', icon: FaHome, route: ROUTE_CONSTANTS.DASHBOARD },
  { name: 'Wydarzenia', icon: MdEvent, route: ROUTE_CONSTANTS.All_EVENTS },
  {
    name: 'Moje wydarzenia',
    icon: FaRegCalendarCheck,
    route: ROUTE_CONSTANTS.USER_EVENT_CARD,
  },
  {
    name: 'Ustawienia',
    icon: FiSettings,
    route: ROUTE_CONSTANTS.ACCOUNT_SETTINGS,
  },
];
