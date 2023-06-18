import { VStack } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SideBar from '../../components/SideBar/SideBar';
import { RootState } from '../../redux/store';
import { useGetUserSignedUpEventsQuery } from '../../redux/user/userApi';
import EventCard from './components/EventCard/EventCard';

const UserAttendEvent: FC = () => {
  const userId = useSelector((state: RootState) => state.user.userId);

  const {
    data: events,
    isLoading,
    isError,
    refetch,
  } = useGetUserSignedUpEventsQuery(userId ?? '');

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !events) {
    return <div>Error loading events</div>;
  }

  return (
    <SideBar>
      <VStack spacing={4} p={4}>
        {events.length ? (
          events.map((event) => <EventCard key={event.eventId} event={event} />)
        ) : (
          <div>Nie zapisałeś się na żadne wydarzenie</div>
        )}
      </VStack>
    </SideBar>
  );
};

export default UserAttendEvent;
