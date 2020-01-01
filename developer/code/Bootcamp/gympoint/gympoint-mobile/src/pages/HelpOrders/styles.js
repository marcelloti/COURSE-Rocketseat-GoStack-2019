import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HelpOrderContainer = styled.View`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
`;

export const HelpOrderTitle = styled.View`
  flex-direction: row;
`;
export const HelpOrderStatus = styled.View`
  flex: 1;
  align-items: flex-start;

  /*
  flex-direction: column;
  align-items: flex-start;
  justify-content: center
  */
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  font-weight: bold;
  font-size: 14px;
`;

export const HelpOrderStatusText = styled.Text``;

export const HelpOrderTime = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const DivButton = styled.View`
  padding: 20px 20px 0 20px;
`;

export const HelpOrderButton = styled(Button)``;

export const HelpOrderButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const HelpOrderQuestion = styled.View`
  margin: 10px;
`;

export const HelpOrderQuestionText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #666 !important;
`;
