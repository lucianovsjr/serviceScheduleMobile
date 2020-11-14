import React, { useState, useMemo, useEffect, forwardRef } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

import DatePicker from './DatePicker';
import { Container, TInput, Hours, Text } from './styles';

function DoubleInputDateTime({ style, icon, calendar, value1, value2, setValue1, setValue2, ...rest }) {
  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);

  const dateInput1Format = useMemo(() => format(value1, (calendar ? 'dd/MM/yyyy' : 'HH:mm')), [value1]);
  const dateInput2Format = useMemo(() => format(value2, (calendar ? 'dd/MM/yyyy' : 'HH:mm')), [value2]);

  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={25} color="rgba(255, 255, 255, 0.6)" />}

      <Hours onPress={() => setShowInput1(!showInput1)}>
        <Text>{dateInput1Format}</Text>
      </Hours>
      <DatePicker
        name="start"
        show={showInput1}
        setShow={setShowInput1}
        date={value1}
        setDate={setValue1}
        calendar={calendar}
      />

      <Text>até</Text>

      <Hours onPress={() => setShowInput2(!showInput2)}>
        <Text>{dateInput2Format}</Text>
      </Hours>
      <DatePicker
        name="end"
        show={showInput2}
        setShow={setShowInput2}
        date={value2}
        setDate={setValue2}
        calendar={calendar}
      />

    </Container>
  );
}

export default forwardRef(DoubleInputDateTime);
