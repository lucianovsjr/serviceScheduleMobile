import React, { useState, useEffect } from 'react';

import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';
import Separator from '../../components/Separator';
import CalendarSchedule from '../../components/CalendarSchedule';

import { Container, ContainerHeader, ContentHeader, Avatar, Title } from './styles';

function SelectAppointment({ route }) {
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  useEffect(() => {
    async function loadingHours() {
      const response = await api.get('/select-appointments', { params: { providerId: provider.id } })

      if (response.status === 200) {
        setHours(response.data.map(
          (hour) => ({
            date: parseISO(hour.date),
            time: format(parseISO(hour.date), 'HH:mm'),
            available: true
          })
        ));
      }
    }
    loadingHours();
  }, []);

  return (
    <Background>
      <Container>

        <ContainerHeader>
          <ContentHeader>
            <Avatar
              source={{uri: `https://api.adorable.io/avatars/40/${provider.name}.png`}}
            />
            <Title> {provider.name} </Title>
          </ContentHeader>
          <Separator />

          <CalendarSchedule
            hours={hours}
          />

        </ContainerHeader>

      </Container>
    </Background>
  );
}

export default SelectAppointment;
