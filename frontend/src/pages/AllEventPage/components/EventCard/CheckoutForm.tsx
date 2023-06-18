import {
  Button, FormControl, FormErrorMessage, FormLabel,
} from '@chakra-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import React, { FC } from 'react';

import useApplicationToast from '../../../../hooks/useApplicationToast';
import { usePayWithStripeMutation } from '../../../../redux/event/eventsApi';

interface CheckoutFormProps {
  eventId?: string;
  userId?: string | null;
  closeStripeModal: () => void;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ eventId, userId, closeStripeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [payWithStripe, { isLoading: isPaymentLoading }] =
    usePayWithStripeMutation();
  const { toastError, toastSuccess } = useApplicationToast();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async () => {
    if (!stripe || !elements || !userId || !eventId) return;
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return;


    try {
      const { token } = await stripe.createToken(
        cardNumberElement,
      );
      if (!token) return;
      await payWithStripe({
        userId,
        eventId,
        stripeToken: token.id,
      }).unwrap();
      closeStripeModal();
      toastSuccess({
        title: 'Zapłacono',
        description: 'Kupiłeś bilet',
      });
    } catch (error: any) {
      toastError({
        title: 'Wystąpił błąd',
        description: 'Sproboj ponownie później',
      });
    }
  };

  if (!eventId || !userId) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <FormControl id='card' isInvalid={!!errors.card}>
          <FormLabel>Numer carty</FormLabel>
          <CardNumberElement />
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore*/}
          <FormErrorMessage>{errors.card?.message}</FormErrorMessage>
        </FormControl>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <FormControl id='date' isInvalid={!!errors.date}>
          <FormLabel>Data ważności: </FormLabel>
          <CardExpiryElement />
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore*/}
          <FormErrorMessage>{errors.card?.date}</FormErrorMessage>
        </FormControl>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <FormControl id='cvc' isInvalid={!!errors.cvc}>
          <FormLabel>CVC: </FormLabel>
          <CardCvcElement />
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore*/}
          <FormErrorMessage>{errors.card?.cvc}</FormErrorMessage>
        </FormControl>
        <Button type='submit' disabled={!stripe || isPaymentLoading} isLoading={isPaymentLoading}>
          Zapłać
        </Button>
      </form>
    </>
  );
};

export default CheckoutForm;
