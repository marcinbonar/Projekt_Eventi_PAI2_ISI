import AccountSettings from '../pages/AccountSettings/AccountSettings';
import EventsList from '../pages/AllEventPage/EventsList';
import BlockUsers from '../pages/BlockUsers/BlockUsers';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminEventEditor from '../pages/DashboardAdmin/AdminEventEditor';
import LoginPanel from '../pages/Login/LoginPanel';
import PayOfflineAdminPage from '../pages/PayOfflineAdminPage';
import RegistrationPanel from '../pages/Registration/RegistrationPanel';
import StatisticsSolidTickets from '../pages/StatisticsSolidTickets';
import UserAttendEvent from '../pages/UserAttendEvent/UserAttendEvent';
import { ROUTE_CONSTANTS } from './routesConstants';

export const appRoutes = [
  {
    path: ROUTE_CONSTANTS.LOGIN,
    element: <LoginPanel />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.REGISTER,
    element: <RegistrationPanel />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.DASHBOARD,
    element: <Dashboard />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ACCOUNT_SETTINGS,
    element: <AccountSettings />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.All_EVENTS,
    element: <EventsList />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.USER_EVENT_CARD,
    element: <UserAttendEvent />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.DASHBOARD_ADMIN,
    element: <AdminEventEditor />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.BLOCK_USERS,
    element: <BlockUsers />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.ALL_EVENTS_USERS,
    element: <PayOfflineAdminPage />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SOLID_TICKETS_FOR_EVENTS,
    element: <StatisticsSolidTickets />,
    exact: true,
  },
];
