import { Box, Button, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { FC, useState } from 'react';


import SideBarForAdmin from '../../components/SideBar/SideBarForAdmin';
import EventRow from './components/EventRow/EventRow';
import AddEventModal from './components/AddEventModal';
import { useDeleteEventMutation, useGetAdminEventsQuery } from '../../redux/event/eventsApi';


const AdminEventEditor: FC = () => {
  const { data: events, isLoading: isEventLoading, isSuccess, refetch } = useGetAdminEventsQuery();
  const [deleteEvent, { isLoading: isDeleteLoading }] = useDeleteEventMutation();


  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleDeleteEvent = (eventId: string) => {
    console.log(eventId);
    deleteEvent(eventId);
  };

  return (
    <SideBarForAdmin>
      <Box p={4} overflowX='auto'>
        <Button colorScheme='green' onClick={handleOpenModal} mb={4}>
          Dodaj wydarzenie
        </Button>

        <AddEventModal isOpen={isOpen} onClose={handleCloseModal} />

        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Tytuł</Th>
              <Th>Opis</Th>
              <Th>Obraz</Th>
              <Th>Data rozpoczęcia</Th>
              <Th>Data zakończenia</Th>
              <Th>Lokalizacja</Th>
              <Th>Kategoria</Th>
              <Th>Dostępne bilety</Th>
              <Th>Cena biletu</Th>
              <Th>Akcje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(events || []).map((event) => (
              <EventRow
                key={event.eventId}
                event={event}
                onDelete={() => handleDeleteEvent(event.eventId as string)}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </SideBarForAdmin>
  );
};

export default AdminEventEditor;
