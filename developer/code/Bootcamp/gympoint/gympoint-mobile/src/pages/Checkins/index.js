import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import { /* signOut, */ signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';

import {
  Container,
  CheckInButton,
  CheckinCell,
  DivButton,
  CheckTitle,
  CheckTime,
  List,
} from './styles';

function Checkins() {
  const dispatch = useDispatch();
  const [checkins, setCheckins] = useState([]);
  const studentid = useSelector(state => state.auth.studentid);

  /*
  function handleLogout() {
    dispatch(signOut());
  }
  handleLogout();
  */

  const loadCheckIns = useCallback(async () => {
    let response = await api.get(`students/${studentid}/checkins`);
    response = response.data.map(checkin => {
      const retorno = {
        ...checkin,
        formattedTime: formatRelative(
          parseISO(checkin.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      };

      return retorno;
    });

    setCheckins(response);
  }, [studentid]);

  useEffect(() => {
    loadCheckIns();
  }, [loadCheckIns, studentid]);

  async function newCheckIn() {
    await dispatch(signInRequest(studentid));
    loadCheckIns();
  }

  return (
    <Background>
      <Container>
        <DivButton>
          <CheckInButton onPress={newCheckIn}>Novo check-in</CheckInButton>
        </DivButton>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <CheckinCell>
              <CheckTitle>Check-in #{item.id}</CheckTitle>
              <CheckTime>{item.formattedTime}</CheckTime>
            </CheckinCell>
          )}
        />
      </Container>
    </Background>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Checkins);
