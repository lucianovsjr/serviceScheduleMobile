import React from 'react';

import { Container, DayButton, DayText } from './styles';

export default function LineWeek({ selectedWeek, setSelectedWeek }) {
  function handleSelected(position) {
    const draft = [...selectedWeek];

    draft[position] = !draft[position];

    setSelectedWeek(draft);
  }

  return (
    <Container>
      <DayButton selected={selectedWeek[0]} onPress={() => handleSelected(0)}>
        <DayText>Dom</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[1]} onPress={() => handleSelected(1)}>
        <DayText>Seg</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[2]} onPress={() => handleSelected(2)}>
        <DayText>Ter</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[3]} onPress={() => handleSelected(3)}>
        <DayText>Qua</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[4]} onPress={() => handleSelected(4)}>
        <DayText>Qui</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[5]} onPress={() => handleSelected(5)}>
        <DayText>Sex</DayText>
      </DayButton>
      <DayButton selected={selectedWeek[6]} onPress={() => handleSelected(6)}>
        <DayText>Sáb</DayText>
      </DayButton>
    </Container>
  );
}
