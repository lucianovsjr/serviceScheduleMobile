import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Background from '../../components/Background';

import { Container, ProviderList, ButtonCardProvider, Avatar, Title } from './styles';

function SelectProvider({navigation}) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadingProviders() {
      const response = await api.get('/providers');

      if (response.status === 200) {
        setProviders(response.data.map((provider) =>
          ({
            ...provider,
            id: String(provider.id),
          })
        ));
      }
    }
    loadingProviders();
  }, [])

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ButtonCardProvider key={item.id} onPress={() => navigation.navigate('SelectAppointment', { provider: item })}>
              <Avatar
                source={{uri: `https://api.adorable.io/avatars/40/${item.name}.png`}}
              />
              <Title> {item.name} </Title>
            </ButtonCardProvider>
          )}
        />
      </Container>
    </Background>
  );
}

export default SelectProvider;
