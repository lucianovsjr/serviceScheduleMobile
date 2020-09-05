import React, { useState, useMemo, useEffect, forwardRef } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

import DatePicker from '../DoubleInputDateTime/DatePicker';
import { Container, Hours, Text } from './styles';

function InputDateTime({ style, icon, calendar, value, setValue, ...rest }) {
  const [showInput, setShowInput] = useState(false);

  const dateInput1Format = useMemo(() => {
    if (value.getFullYear() === 1969) return '  /  /  ';

    return format(value, (calendar ? 'dd/MM/yyyy' : 'HH:mm'));
  },[value]);

  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={25} color="rgba(255, 255, 255, 0.6)" />}

      <Hours onPress={() => setShowInput(!showInput)}>
        <Text>{dateInput1Format}</Text>
      </Hours>
      <DatePicker
        name="start"
        show={showInput}
        setShow={setShowInput}
        date={value.getFullYear() === 1969 ? new Date() : value}
        setDate={setValue}
        calendar={calendar}
      />
    </Container>
  );
}

export default forwardRef(InputDateTime);
