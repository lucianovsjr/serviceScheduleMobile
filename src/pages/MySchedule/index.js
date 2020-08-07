import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';

import { Container, MyHourList, ButtonCardHour, Title } from './styles';

function MySchedule() {
  const [myHours, setMyHours] = useState([]);

  useEffect(() => {
    async function loadingMyHours() {
      const response = await api.get('my-appointments');

      if (response.status === 200) {
        setMyHours(
          response.data.map((hour) => ({
            id: hour.id,
            time: format(parseISO(hour.date), 'dd/MM/yyyy HH:mm'),
          }))
        );
      }
    }

    loadingMyHours();
  }, []);

  return (
    <Background>
      <Container>
        <MyHourList
          data={myHours}
          keyExtractor={item => item.time}
          renderItem={({item}) => (
            <ButtonCardHour>
              <Title>{item.date}{item.time}</Title>
            </ButtonCardHour>
          )}
        />
      </Container>
    </Background>
  );
}

export default MySchedule;
