import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import { signOut, signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';

import {
  Container,
  HelpOrderContainer,
  HelpOrderButton,
  HelpOrderTitle,
  DivButton,
  HelpOrderStatus,
  HelpOrderStatusText,
  HelpOrderTime,
  HelpOrderQuestion,
  HelpOrderQuestionText,
  List,
} from './styles';

function HelpOrders() {
  const dispatch = useDispatch();
  const [helpOrders, setHelpOrders] = useState([]);
  const studentid = useSelector(state => state.auth.studentid);

  /*
  function handleLogout() {
    dispatch(signOut());
  }
  handleLogout();
  */

  const formatStatus = useCallback(helporder => {
    let responseStatus = 'Sem resposta';
    if (helporder.answer !== null) {
      responseStatus = 'Respondido';
    }
    return responseStatus;
  }, []);

  const loadHelpOrders = useCallback(async () => {
    const response = await api.get(`students/${studentid}/help-orders`);
    const helpordersArray = response.data.map(helporder => {
      const helpOrderFormatted = {
        ...helporder,
        formattedStatus: formatStatus(helporder),
        formattedTime: formatRelative(
          parseISO(helporder.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      };

      return helpOrderFormatted;
    });

    setHelpOrders(helpordersArray);
  }, [formatStatus, studentid]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders, studentid]);

  async function newHelpOrder() {
    await dispatch(newHelpOrder(studentid));
    loadHelpOrders();
  }

  return (
    <Background>
      <Container>
        <DivButton>
          <HelpOrderButton onPress={newHelpOrder}>
            Novo pedido de auxílio
          </HelpOrderButton>
        </DivButton>
        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <HelpOrderContainer>
              <HelpOrderTitle>
                <HelpOrderStatus answered={!!item.answer}>
                  <Icon
                    name="check-circle"
                    size={20}
                    color={item.answer ? '#42cb59' : '#999'}
                  />
                  <HelpOrderStatusText>
                    {item.formattedStatus}
                  </HelpOrderStatusText>
                </HelpOrderStatus>
                <HelpOrderTime>{item.formattedTime}</HelpOrderTime>
              </HelpOrderTitle>
              <HelpOrderQuestion>
                <HelpOrderQuestionText>{item.question}</HelpOrderQuestionText>
              </HelpOrderQuestion>
            </HelpOrderContainer>
          )}
        />
      </Container>
    </Background>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(HelpOrders);
