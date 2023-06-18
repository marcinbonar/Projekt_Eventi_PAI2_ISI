import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import { EventRowProps } from './types';

const EventRow: FC<EventRowProps> = ({ event, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={event.eventId}>
        <Td
          maxW='150px'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {event.title}
        </Td>
        <Td
          maxW='200px'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {event.description}
        </Td>
        <Td
          maxW='150px'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {event.image}
        </Td>
        <Td>{event.startDate}</Td>
        <Td>{event.endDate}</Td>
        <Td
          maxW='100px'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {event.location}
        </Td>
        <Td
          maxW='100px'
          overflow='hidden'
          textOverflow='ellipsis'
          whiteSpace='nowrap'
        >
          {event.category}
        </Td>
        <Td>{event.availableTickets}</Td>
        <Td>{event.ticketPrice}</Td>
        <Td>
          <ButtonGroup>
            <Button size='sm' colorScheme='red' onClick={onDelete}>
              Usuń
            </Button>
            <Button size='sm' colorScheme='teal' onClick={onOpen}>
              Szczegóły
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Szczegóły wydarzenia</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align='start' spacing={3}>
              <Box>
                <Text fontWeight='bold'>Tytuł:</Text>
                <Text>{event.title}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Opis:</Text>
                <Text>{event.description}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Obraz:</Text>
                <Text>{event.image}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Data rozpoczęcia:</Text>
                <Text>{event.startDate}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Data zakończenia:</Text>
                <Text>{event.endDate}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Lokalizacja:</Text>
                <Text>{event.location}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Kategoria:</Text>
                <Text>{event.category}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Dostępne bilety:</Text>
                <Text>{event.availableTickets}</Text>
              </Box>
              <Box>
                <Text fontWeight='bold'>Cena biletu:</Text>
                <Text>{event.ticketPrice}</Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventRow;
