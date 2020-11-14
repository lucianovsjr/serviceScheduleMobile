import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import api, { BASE_URL } from '../../services/api';
import { PrimaryColor } from '../../styleGuide';

import Background from '../../components/Background';
import Container from '../../components/Container';
import List from '../../components/List';
import { ButtonCard, CardAvatar, CardTitle1, CardText1 } from '../../components/Card';

import { CardColumnProvider } from './styles';

function SelectProvider({navigation}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadingProviders() {
      const response = await api.get('/providers/');

      if (response.status === 200) {
        setProviders(response.data.map((provider) =>
          ({
            ...provider,
            id: String(provider.id),
            fantasyName: provider.fantasy_name
          })
        ));
      }
      setLoading(false);
    }

    if (isFocused) loadingProviders();
    else {
      setProviders([]);
      setLoading(true);
    }
  }, [isFocused])

  return (
    <Background>
      <Container>
        {
          loading && isFocused ?
            <ActivityIndicator size="large" color={PrimaryColor} />
          :
            <>
              <List
                data={providers}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <ButtonCard key={item.id} onPress={
                      () => navigation.navigate('SelectProviderMonth',
                        {
                          providerId: item.id,
                          name: item.name,
                          imageName: item.image_name
                        }
                      )
                    }>
                    <CardAvatar
                      source={{uri: item.image_name}}
                    />
                    <CardColumnProvider>
                      <CardTitle1>{item.fantasyName}</CardTitle1>
                      <CardText1>{item.profession}</CardText1>
                    </CardColumnProvider>
                  </ButtonCard>
                )}
              />
            </>
        }
      </Container>
    </Background>
  );
}

export default SelectProvider;
