import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Background from '../../components/Background';
import { TitleMonth, RowMonth } from '../../components/TimeLine';

import { Container, AppointmentList } from './styles';

export default function SelectAppointmentMonth({ route }) {
  const [appointments, setAppointments] = useState([]);

  const { providerId, yearMonth } = route.params;
  const year = yearMonth.substring(0, 4);
  const month = yearMonth.substring(4, 6);

  useEffect(() => {
    async function loading() {
      const response = await api.get('select-appointments-month', { params: { providerId, year, month } });
      const draftEnd = {};
      var draftAppointment = {};
      var draftDate = null;

      if (response.status === 200) {
        draftAppointment = response.data.map((appointment) => {
            let isTitle = draftDate !== appointment.dateFormat;

            if (isTitle) draftDate = appointment.dateFormat;
            draftEnd[draftDate] = appointment.id;

            return {
              ...appointment,
              type: isTitle ? 'title' : 'row',
            }
        });

        setAppointments(draftAppointment.map((appointment) => {
          return {
            ...appointment,
            isEnd: draftEnd[appointment.dateFormat] === appointment.id,
          };
        }));
      }
    }

    loading();
  }, []);

  return (
    <Background>
      <Container>
        <AppointmentList
          data={appointments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <>
            { item.type === 'title' && <TitleMonth title={item.timeDistance} dateFormat={item.dateFormat} />}

            <RowMonth key={item.id} id={item.id} hour={item.hourFormat} status={item.status} isEnd={item.isEnd} />
            </>
          )}
        />
      </Container>
    </Background>
  )
}
