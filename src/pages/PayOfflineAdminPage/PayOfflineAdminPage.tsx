import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SideBarForAdmin from '../../components/SideBar/SideBarForAdmin';
import useApplicationToast from '../../hooks/useApplicationToast';
import { usePayOfflineTicketMutation } from '../../redux/event/eventsApi';
import { useGetAllUsersEventsQuery } from '../../redux/user/userApi';
import { UserWithEvents } from '../../types/UserWithEventsResponse';
import { PayOfflineAdminRecord } from './components/PayOfflineAdminRecord';

const PayOfflineAdminPage = () => {
  const {
    data: usersWithEvents,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersEventsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const nonAdminUsers = usersWithEvents?.filter(
    (user) => user.role !== 'ADMIN',
  );
  const filteredUsers = nonAdminUsers?.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const [offlineTicket] = usePayOfflineTicketMutation();
  const { toastError, toastSuccess } = useApplicationToast();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOfflinePayment = async (eventId: string, userId: string) => {
    try {
      const response = await offlineTicket({ eventId, userId }).unwrap();
      console.log(response);
      if (response) {
        toastSuccess({
          title: 'Status',
          description: 'Płatność wykonana pomyślnie',
        });
        refetch();
      }
    } catch (error: any) {
      toastError({
        title: 'Błąd logowania',
        description: error.data.message ?? 'Bład nieznany',
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error has occurred...</p>;

  return (
    <SideBarForAdmin>
      <Box
        w='100%'
        maxW='600px'
        p={4}
        borderWidth={1}
        borderRadius='md'
        bg='white'
        shadow='md'
        mb={5}
      >
        <InputGroup size='lg'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Wyszukaj użytkownika'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            focusBorderColor='teal.500'
          />
        </InputGroup>
      </Box>
      {filteredUsers?.map((user: UserWithEvents) => (
        <PayOfflineAdminRecord
          key={user.userId}
          user={user}
          handleOfflinePayment={handleOfflinePayment}
        />
      ))}
    </SideBarForAdmin>
  );
};

export default PayOfflineAdminPage;
