import { IEvent } from '../../../../types/event';

export interface EventRowProps {
  event: IEvent;
  onDelete: () => void;
}
