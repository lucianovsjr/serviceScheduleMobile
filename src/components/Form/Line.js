import React from 'react';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

import FormDoubleInputDateTime from '../DoubleInputDateTime'
import InputDateTime from '../InputDateTime'
import LineWeek from '../LineWeek';

const LineRow = styled.View.attrs({
  borderBottomWidth: 1,
  borderBottomColor: '#eee'
})`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  height: ${(props) => props.heightLine ? props.heightLine : '65'}px;

  padding: 0 10px;

  ${(props) => props.titleColor && 'background-color: #fafafa;'}
`;

const LineInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
`;

const ButtonAllDay = styled(RectButton)`
  width: 70px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.selected ? '#a1a1a1' : '#efefef'};

  justify-content: center;
  align-items: center;
`;

const TextAllDay = styled.Text`
  font-size: 14px;
`;

const TextTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const LineDefault = React.forwardRef((props, ref) => {
  const {
    icon,
    date=false,
    oneDate=false,
    week=false,
    selectedWeek,
    setSelectedWeek,
    buttonAllDay,
    value3,
    setValue3,
    notEditable,
    ...rest
  } = props;

  return (
    <LineRow pointerEvents={notEditable ? "none" : 'auto'}>
      <Icon name={icon} size={30} color="#4289cb"/>
      {date && <FormDoubleInputDateTime {...rest} />}
      {week && <LineWeek selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />}
      {oneDate && <InputDateTime {...rest} />}
      {(!date && !week && !oneDate) && <LineInput {...rest} ref={ref}/>}
      {buttonAllDay
        &&
          <ButtonAllDay onPress={() => setValue3(!value3)} selected={value3}>
            <TextAllDay> Dia todo </TextAllDay>
          </ButtonAllDay>
      }
    </LineRow>
  );
});

function xLineDefault({
  icon,
  date=false,
  oneDate=false,
  week=false,
  selectedWeek,
  setSelectedWeek,
  buttonAllDay,
  value3,
  setValue3,
  ...rest }) {
  return (
    <LineRow>
      <Icon name={icon} size={30} color="#4289cb"/>
      {date && <FormDoubleInputDateTime {...rest} />}
      {week && <LineWeek selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />}
      {oneDate && <InputDateTime {...rest} />}
      {(!date && !week && !oneDate) && <LineInput {...rest} />}
      {buttonAllDay
        &&
          <ButtonAllDay onPress={() => setValue3(!value3)} selected={value3}>
            <TextAllDay> Dia todo </TextAllDay>
          </ButtonAllDay>
      }
    </LineRow>
  );
}

export function LineTitle({ name }) {
  return (
    <LineRow heightLine={30} titleColor>
      <TextTitle> {name} </TextTitle>
    </LineRow>
  )
}
