import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { parseISO, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import { ContainerFullHorizontal } from '../../components/Container';
import List, { Line, LineRow, LineText, LineButton, LineAvatar } from '../../components/List';

import { LineColProvider } from './styles';

function MySchedule() {
  const [myHours, setMyHours] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadingMyHours() {
      const response = await api.get('myappointments/');

      if (response.status === 200) {
        setMyHours(
          response.data.map((hour) => ({
            ...hour,
            id: hour.id,
            dateFormat: format(parseISO(hour.date_time), 'dd/MM/yyyy'),
            timeFormat: format(parseISO(hour.date_time), 'HH:mm'),
          }))
        );
      }
    }

    if (isFocused) loadingMyHours();
    else setMyHours([]);
  }, [isFocused]);

  function handleCancel(id) {
    Alert.alert(
      'Agendamento',
      'Deseja cancelar esse agendamento?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => {
            const response = await api.put(`appointments/status/${id}/`);

            if (response.status === 200)
              setMyHours(myHours.filter((hour) => hour.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <ContainerFullHorizontal>
        <List
          data={myHours}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Line
              key={String(item.id)}
              height={80}
            >
              <LineRow>
                <LineAvatar
                  source={{uri: `https://api.adorable.io/avatars/40/${item.name}.png`}}
                />

                <LineColProvider>
                  <LineText width={180} fontSize={16} bold>
                    {item.provider_name}
                  </LineText>
                  <LineText fontSize={14}>
                    {item.timeFormat}
                  </LineText>
                  <LineText fontSize={12}>
                    {item.dateFormat}
                  </LineText>
                </LineColProvider>
              </LineRow>

              <LineButton color="#ff4d4d" onPress={() => handleCancel(item.id)}>
                <LineText fontSize={16} marginRight={5} fontColor="#fff">
                  Cancelar
                </LineText>
                <Icon name="clear" size={25} color="#fff"/>
              </LineButton>
            </Line>
          )}
        />
      </ContainerFullHorizontal>
    </Background>
  );
}

export default MySchedule;
