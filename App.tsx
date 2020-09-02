import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import appContext from './src/models/RootStore';
import styled from 'styled-components/native';

const App: React.FC = () => {
  const appCtx = useContext(appContext);
  const [name, setName] = React.useState('');
  const saveName = () => {
    console.log('Save pressed.');
    appCtx.github.setName(name);
  };

  if (appCtx.loading) {
    return (
      <Container>
        <Loading>Loading</Loading>
        <StatusBar style="auto" />
      </Container>
    );
  }

  return (
    <Container>
      <Detail>{`Your github username is ${
        appCtx.github.name ? appCtx.github.name : 'not set.'
      }`}</Detail>
      <Header>Change Username</Header>
      <UserName
        placeholder="Desired Username"
        defaultValue={name}
        numberOfLines={1}
        onChangeText={(text) => setName(text)}
      />
      <SaveWrap onPress={saveName}>
        <Save>Save</Save>
      </SaveWrap>
      <StatusBar style="auto" />
    </Container>
  );
};

const Loading = styled.Text`
  font-size: 25px;
`;

const Container = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

const Detail = styled.Text`
  font-size: 15px;
`;

const Header = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const UserName = styled.TextInput`
  border: 1px solid #666;
  width: 200px;
  height: 30px;
  margin: 10px;
  padding: 5px;
`;

const SaveWrap = styled.TouchableOpacity`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

const Save = styled.Text`
  background: green;
  font-weight: bold;
  color: #fff;
  width: 100px;
  height: 30px;
  padding: 5px;
  text-align: center;
`;

export default observer(App);
