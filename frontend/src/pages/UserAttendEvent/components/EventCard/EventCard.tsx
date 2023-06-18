import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { STATUS_TYPE, statuses } from './constants';

import { EventCardProps } from './types';
import useGenerateTicket from './useGenerateTicket';

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const { generateTicket } = useGenerateTicket();

  return (
    <Box
      w='90%'
      borderWidth='1px'
      borderRadius='md'
      overflow='hidden'
      boxShadow='lg'
      p={4}
      bg={bgColor}
      my={4}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mb={4}
    >
      <VStack align='start' spacing={3} flex={1}>
        <Heading size='lg'>{event.title}</Heading>
        <Text fontSize='md'>{event.description}</Text>
        <HStack spacing={2}>
          <Icon as={FaCalendarAlt} />
          <Text fontSize='md'>
            {event.startDate} - {event.endDate}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaMapMarkerAlt} />
          <Text fontSize='md'>{event.location}</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaClock} />
          <Text fontSize='md'>{event.category}</Text>
        </HStack>
        {event.paymentStatus &&
          <Badge
            colorScheme={statuses[event.paymentStatus as STATUS_TYPE].paymentStatusColor}
            fontSize='md'
            fontWeight='bold'
            p={2}
            mt={2}
          >
            {statuses[event.paymentStatus as STATUS_TYPE].paymentStatusText}
          </Badge>
        }
        <Button colorScheme='teal' onClick={() => generateTicket(event, 180, 100)}>
          Generuj PDF
        </Button>
      </VStack>
      {event.image && (
        <Box w='40%' h='100%'>
          <img
            src={event.image}
            alt={event.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'cover',
              borderRadius: 'md',
            }}
          />
        </Box>
      )}
    </Box>
  );
};
export default EventCard;
