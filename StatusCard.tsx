import {Card, Paragraph, Title} from 'react-native-paper';
import React from 'react';

interface StatusCardProps {
  switchOn: boolean;
  temp: number;
}

function StatusCard(props: StatusCardProps) {
  return (
    <Card
      style={{
        width: '48%',
        height: '100%',
      }}>
      <Card.Content>
        <Title>Current Status</Title>
        <Paragraph>
          The current temperature of the device is {props.temp} {'\xb0c'}
        </Paragraph>
        <Paragraph>The device is {props.switchOn ? 'on' : 'off'}.</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default StatusCard;
