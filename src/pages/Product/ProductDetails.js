import React, { Component } from 'react';
import styled from 'styled-components/native';
import Tabs, { Tab } from '../../components/Tabs';

const Container = styled.ScrollView`
  flex: 1;
  background: #F2F2F2;
`;

const Top = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  background: #FFFFFF;
  margin-bottom: 10;
`;

const HighlightSection = styled.View`
  align-items: center;
  margin-bottom: 30;
`;

const InterstSection = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 15;
`;

const InterstLabel = styled.Text`
  font-size: 12;
  margin-bottom: 5;
  margin-right: 10;
  color: #BBBBBB;
`;

const InterstValue = styled.Text`
  font-size: 26;
  font-weight: bold;
  color: #CDA469;
`;

const Labels = styled.View`
  flex-direction: row;
`;

const Label = styled.View`
  border-width: 1;
  border-color: rgba(205, 164, 105, 0.7);
  justify-content: center;
  align-items: center;
  height: 15;
  width: 50;
  margin-left: 5;
  margin-right: 5;
`;

const LabelValue = styled.Text`
  font-size: 11;
  color: rgba(205, 164, 105, 0.7);
`;

const MetricSection = styled.View`
  flex-direction: row;
`;

const Metric = styled.View`
  flex: 1;
  align-items: center;
`;

const MetricValue = styled.Text`
  font-size: 16;
  color: #333333;
  margin-bottom: 5;
`;

const MetricName = styled.Text`
  font-size: 12;
  color: #BBBBBB;
`;

const Bottom = styled.View`
  background: #FFFFFF;
`;

const Pane = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 30;
  padding-right: 30;
`;

const Section = styled.View``;

const Title = styled.Text`
  font-size: 14;
  color: #333333;
  margin-bottom: 5;
`;

const Description = styled.Text`
  font-size: 12;
  line-height: 19;
  color: #999999;
`;

const TYPES = {
  DETAILS: 'DETAILS',
  SECURITY: 'SECURITY',
};

class ProductDetails extends Component {
  state = {
    type: TYPES.DETAILS,
  }

  onDetailsTabPress = () => {
    this.setState({ type: TYPES.DETAILS });
  }

  onSecurityTabPress = () => {
    this.setState({ type: TYPES.SECURITY });
  }

  render() {
    const {
      interest, numberOfPeople, totalAmount, quota, description, security,
    } = this.props;
    const { type } = this.state;

    return (
      <Container>
        <Top>
          <HighlightSection>
            <InterstSection>
              <InterstLabel>预期年化收益</InterstLabel>
              <InterstValue>{ `${(interest * 100).toFixed(2)}%` }</InterstValue>
            </InterstSection>
            <Labels>
              <Label>
                <LabelValue>低风险</LabelValue>
              </Label>
              <Label>
                <LabelValue>高收益</LabelValue>
              </Label>
            </Labels>
          </HighlightSection>
          <MetricSection>
            <Metric>
              <MetricValue>{ numberOfPeople }</MetricValue>
              <MetricName>累计申购人数</MetricName>
            </Metric>
            <Metric>
              <MetricValue>{ totalAmount }</MetricValue>
              <MetricName>累计申购金额</MetricName>
            </Metric>
            <Metric>
              <MetricValue>{ `${(quota * 100).toFixed(2)}%` }</MetricValue>
              <MetricName>今日额度</MetricName>
            </Metric>
          </MetricSection>
        </Top>
        <Bottom>
          <Tabs>
            <Tab title="产品详情" active={type === TYPES.DETAILS} onPress={this.onDetailsTabPress} />
            <Tab title="安全保障" active={type === TYPES.SECURITY} onPress={this.onSecurityTabPress} />
          </Tabs>
          {
            type === TYPES.DETAILS &&
              <Pane>
                {
                  description.map(content => (
                    <Section key={content.title}>
                      <Title>{ content.title }</Title>
                      <Description>{ content.description }</Description>
                    </Section>
                  ))
                }
              </Pane>
          }
          {
            type === TYPES.SECURITY &&
              <Pane>
                {
                  security.map(content => (
                    <Section key={content.title}>
                      <Title>{ content.title }</Title>
                      <Description>{ content.description }</Description>
                    </Section>
                  ))
                }
              </Pane>
          }
        </Bottom>
      </Container>
    );
  }
}

export default ProductDetails;
