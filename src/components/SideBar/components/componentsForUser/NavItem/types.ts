import { FlexProps } from '@chakra-ui/react';
import { ReactText } from 'react';
import { IconType } from 'react-icons';

export interface Types extends FlexProps {
  icon: IconType;
  children: ReactText;
  route: string;
}
