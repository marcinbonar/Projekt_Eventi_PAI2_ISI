import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue, useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import useApplicationToast from '../../../../hooks/useApplicationToast';
import { useSignUpToEventMutation } from '../../../../redux/event/eventsApi';
import { RootState } from '../../../../redux/store';
import { EventCardProps } from './types';
import StripeModal from './StripeModal';

const EventCard: FC<EventCardProps> = ({ event }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const [signUpToEvent, { isLoading: isLoadingSignUpEvent }] =
    useSignUpToEventMutation();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { toastError, toastSuccess } = useApplicationToast();
  const noTicketsLeft = event.availableTickets === 0;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    title,
    description,
    image,
    startDate,
    endDate,
    location,
    category,
    ticketPrice,
    eventId,
  } = event;

  const handleSignUpToEvent = async () => {
    try {
      if (userId && eventId) {
        const response = await signUpToEvent({ userId, eventId }).unwrap();
        toastSuccess({
          title: 'Status',
          description: response.message,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.data?.message ||
        'Wystąpił błąd podczas rejestracji na wydarzenie.';
      toastError({
        title: 'Błąd',
        description: errorMessage,
      });
    }
  };

  return (
    <Box
      maxW='md'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='lg'
      bg={bgColor}
      position='relative'
      filter={noTicketsLeft ? 'grayscale(1)' : 'none'}
      pointerEvents={noTicketsLeft ? 'none' : 'auto'}
    >
      {noTicketsLeft && (
        <Text
          color='white'
          fontWeight='bold'
          fontSize='3xl'
          bg='red.500'
          p={2}
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%) rotate(-45deg)'
        >
          Brak biletów
        </Text>
      )}
      <Image src={image} alt={title} />
      <Box p='6'>
        <Stack spacing={2}>
          <HStack>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              {category}
            </Badge>
            <Text>{location}</Text>
          </HStack>
          <Text fontSize='xl' fontWeight='bold'>
            {title}
          </Text>
          <Text>{description}</Text>
          <VStack align='start'>
            <Text>Start: {startDate}</Text>
            <Text>Koniec: {endDate}</Text>
          </VStack>
          <Text fontSize='lg' fontWeight='bold'>
            Cena biletu: {ticketPrice} $
          </Text>
        </Stack>
        <Button
          mr={3}
          mt='2'
          colorScheme='teal'
          variant='solid'
          size='sm'
          onClick={onOpen}
        >
          Kup bilet teraz
        </Button>
        <StripeModal isModalVisible={isOpen} eventId={eventId} userId={userId} closeModal={onClose} />
        <Button
          mt='2'
          colorScheme='teal'
          variant='outline'
          size='sm'
          isDisabled={!userId}
          isLoading={isLoadingSignUpEvent}
          onClick={handleSignUpToEvent}
        >
          Zapisz się i zapłać na miejscu
        </Button>
      </Box>
    </Box>
  );
};

export default EventCard;
