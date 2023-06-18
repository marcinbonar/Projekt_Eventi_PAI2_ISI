import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import React, { FC } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51N48GjIsbYzyASTLCnvqhAqfb85hsbG7OU7kuWsXXOi8lH7dPfRZ8j1yGqev2pl9PMFAh4FPEFoJOCaif0qAPE5v00Fsvil10c',
);

const StripeModal: FC<any> = ({ isModalVisible, eventId, userId, closeModal }) => {
  return <Modal isOpen={isModalVisible} onClose={closeModal}><Elements stripe={stripePromise}>
    <ModalOverlay /><ModalContent>
    <ModalHeader>Płatność</ModalHeader>
    <ModalCloseButton />
    <ModalBody> <CheckoutForm eventId={eventId} userId={userId} closeStripeModal={closeModal} /></ModalBody>
    <ModalFooter></ModalFooter>
  </ModalContent>
  </Elements></Modal>;
};

export default StripeModal;