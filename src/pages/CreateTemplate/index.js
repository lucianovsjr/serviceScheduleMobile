import React, { useState, useEffect } from 'react';

import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import Background from '../../components/Background';

import { Container, MyTemplateList, ButtonCardTemplate, Title, AddTemplate } from './styles';

export default function MyTemplate({navigation}) {
  const [myTemplates, setMyTemplates] = useState([]);

  useEffect(() => {
    async function loadingMyTemplate() {
      const response = await api.get('templates');

      if (response.status === 200) {
        setMyTemplates(
          response.data.map((template) => ({
            id: parseInt(template.id),
            time: template.service_time.toString(),
            office_hours_start: template.office_hours_start,
            office_hours_end: template.office_hours_end,
            date_start: format(parseISO(template.office_hours_start), 'dd/MM/yyyy HH:mm'),
            date_end: format(parseISO(template.office_hours_end), 'dd/MM/yyyy HH:mm'),
          }))
        );
      }
    }

    loadingMyTemplate();
  }, []);

  return (
    <Background>
      <Container>
        <AddTemplate
          onPress={() => {navigation.navigate('CreateSchedule', { template: null })}}
        />
        <MyTemplateList
          data={myTemplates}
          keyExtractor={item => item.time}
          renderItem={({item}) => (
            <ButtonCardTemplate
              key={item.id.toString()}
              onPress={() => {navigation.navigate('CreateSchedule', { template: item })}}
            >
              <Title>{item.date_start}</Title>
              <Title>{item.date_end}</Title>
            </ButtonCardTemplate>
          )}
        />
      </Container>
    </Background>
  );
}
