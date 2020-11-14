import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

import Input from '../../components/Input';
import DoubleInputDateTime from '../../components/DoubleInputDateTime';

import { SaveButton, CancelButton } from '../../components/Form';

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const FormDoubleInputDateTime = styled(DoubleInputDateTime)`
  margin-bottom: 10px;
`;

export const Submit = styled(SaveButton)`
  margin-top: 15px;
`;

export const Cancel = styled(CancelButton)`
  margin-top: 5px;
`;
