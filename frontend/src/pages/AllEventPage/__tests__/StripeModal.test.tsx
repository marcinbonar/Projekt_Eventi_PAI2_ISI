import React from 'react';
import { renderDOM } from '../../../utils/renderDOM';
import StripeModal from '../components/EventCard/StripeModal';

describe('StripeModal', () => {
  it('renders without crashing', () => {
    const closeModal = jest.fn();
    renderDOM(
      <StripeModal
        isModalVisible={false}
        eventId="sample-event-id"
        userId="sample-user-id"
        closeModal={closeModal}
      />
    );
  });
});