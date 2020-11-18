import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default List = styled.FlatList.attrs({
  numColumns: 1,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 0;
`;

export const ListHorizontal = styled.FlatList.attrs({
  horizontal: true,
  numColumns: 1,
  showsHorizontalScrollIndicator: false,
})`
  padding: 0 0;
  flex-grow: 0;
  ${(props) => props.height && `height: ${props.height}px;`}
`;

export const Line = styled.View.attrs({
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${(props) => (props.height ? `height: ${props.height}` : 'height: 65')}px;

  padding: 0 10px;
`;

export const LineCol = styled.View`
  flex-direction: column;
  ${(props) => props.height && `height: ${props.height}px;`}
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  align-items: ${(props) => (props.hStart ? 'flex-start' : 'center')};
`;

export const LineRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const LineText = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  ${(props) =>
    props.fontSize ? `font-size: ${props.fontSize}` : 'font-size: 16'}px;
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`}
  ${(props) => props.fontColor && `color: ${props.fontColor};`}
  ${(props) => props.bold && 'font-weight: bold;'}
  ${(props) => props.width && `width: ${props.width}px;`}
`;

export const LineButton = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.8,
  shadowRadius: 2,

  elevation: 6,
})`
  width: 120px;
  height: 56px;

  ${(props) => props.color && `background: ${props.color};`}
  border-radius: 1px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`}
`;

export const LineAvatar = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 4.5px;
`;

export const LineIconTwoText = ({ iconName, text1, text2 }) => {
  return (
    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
      <Icon
        name={iconName}
        size={30}
        style={{ marginTop: 4, marginRight: 5 }}
        color="#4289cb"
      />
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontSize: 14 }}>{text1}</Text>
        <Text style={{ fontSize: 14 }}>{text2}</Text>
      </View>
    </View>
  );
};

export const LineIconText = ({ iconName, text }) => {
  return (
    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
      <Icon
        name={iconName}
        size={30}
        color="#4289cb"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 14, marginTop: 2 }}>{text}</Text>
    </View>
  );
};
