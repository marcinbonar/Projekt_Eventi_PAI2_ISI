import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';

import { useAddEventMutation } from '../../../redux/event/eventsApi';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventModal: FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const [addNewEvent] = useAddEventMutation();

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    availableTickets: 0,
    soldTickets: 0,
    ticketPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async () => {
    addNewEvent(newEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj nowe wydarzenie</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input placeholder="Tytuł" name="title" onChange={handleChange} />
            <Input
              placeholder="Opis"
              name="description"
              onChange={handleChange}
            />
            <Input placeholder="Obraz" name="image" onChange={handleChange} />
            <Input
              placeholder="Data rozpoczęcia"
              name="startDate"
              onChange={handleChange}
            />
            <Input
              placeholder="Data zakończenia"
              name="endDate"
              onChange={handleChange}
            />
            <Input
              placeholder="Lokalizacja"
              name="location"
              onChange={handleChange}
            />
            <Input
              placeholder="Kategoria"
              name="category"
              onChange={handleChange}
            />
            <Input
              placeholder="Dostępne bilety"
              name="availableTickets"
              onChange={handleChange}
            />
            <Input
              placeholder="Sprzedane bilety"
              name="soldTickets"
              onChange={handleChange}
            />
            <Input
              placeholder="Cena biletu"
              name="ticketPrice"
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
            Dodaj
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
