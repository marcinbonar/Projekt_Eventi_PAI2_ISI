import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { FiDollarSign } from 'react-icons/fi';

import { Event, UserWithEvents } from '../../../types/UserWithEventsResponse';

interface PayOfflineAdminRecordProps {
  user: UserWithEvents;
  handleOfflinePayment: (userId: string, eventId: string) => void;
}

export const PayOfflineAdminRecord = ({
                                        user,
                                        handleOfflinePayment,
                                      }: PayOfflineAdminRecordProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const backgroundColor = { light: 'white', dark: 'gray.800' };
  const color = { light: 'black', dark: 'gray.200' };

  const pendingOfflinePaymentEvents = user.events.filter(
    (event) => event.paymentStatus === 'PENDING_OFFLINE_PAYMENT',
  );

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      bg={backgroundColor[colorMode]}
      color={color[colorMode]}
      shadow='md'
      my={5}
    >
      <Box p='6'>
        <Heading mb={4} size='lg'>
          {user.email}
        </Heading>
        {pendingOfflinePaymentEvents.length ? (
          pendingOfflinePaymentEvents.map((event: Event) => (
            <Box key={event.eventId}>
              <Stack direction='row' alignItems='center' mb={3}>
                <Heading size='md' flex={1}>
                  {event.title}
                </Heading>
                <Button
                  leftIcon={<FiDollarSign />}
                  colorScheme={isDarkMode ? 'blue' : 'teal'}
                  variant='solid'
                  onClick={() => {
                    handleOfflinePayment(event.eventId, user.userId);
                  }}
                >
                  Zapłać
                </Button>
              </Stack>
              <Text color={color[colorMode]}>
                Status płatności: {event.paymentStatus}
              </Text>
              <Divider my={3} />
            </Box>
          ))
        ) : (
          <Text color={color[colorMode]}>
            Użytkownik nie posiada biletów oczekujących na płatność offline
          </Text>
        )}
      </Box>
    </Box>
  );
};
