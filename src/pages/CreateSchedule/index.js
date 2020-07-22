import React, { useState } from 'react';

import Background from '../../components/Background';
import ParamBarSchedule from '../../components/ParamBarSchedule';
import Separator from '../../components/Separator';
import CalendarSchedule from '../../components/CalendarSchedule';
import { Container } from './styles';

function CreateSchedule() {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [serviceTime, setServiceTime] = useState('60');
  const [loadingCalendar, setLoadingCalendar] = useState(false);

  return (
    <Background>
      <Container>
        <ParamBarSchedule
          dateStart={dateStart}
          setDateStart={setDateStart}
          dateEnd={dateEnd}
          setDateEnd={setDateEnd}
          serviceTime={serviceTime}
          setServiceTime={setServiceTime}
          setLoadingCalendar={setLoadingCalendar}
        />
        <Separator />
        <CalendarSchedule
          dateStart={dateStart}
          dateEnd={dateEnd}
          serviceTime={serviceTime}
          loadingCalendar={loadingCalendar}
          setLoadingCalendar={setLoadingCalendar}
        />
      </Container>
    </Background>
  );
};

export default CreateSchedule;
