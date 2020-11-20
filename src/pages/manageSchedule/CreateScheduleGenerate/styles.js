import styled from 'styled-components';

import Input from '../../../components/Input';
import DoubleInputDateTime from '../../../components/DoubleInputDateTime';

import {
  SaveButton,
  CancelButton,
  DeleteButton,
} from '../../../components/Form';

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

export const Delete = styled(DeleteButton)`
  margin-top: 20px;
`;
