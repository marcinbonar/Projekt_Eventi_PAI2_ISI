export interface UserRowProps {
  name: string;
  surname: string;
  email: string;
  isBlocked: boolean;
  onBlock: () => void;
  onUnblock: () => void;
}
