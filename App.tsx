import React, {useEffect, useState} from 'react';
import {
  Card,
  Paragraph,
  Provider as PaperProvider,
  Switch,
  Text,
} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import ScheduleCard from './ScheduleCard';
import WeatherCard from './WeatherCard';
import {View} from 'react-native';
import StatusCard from './StatusCard';
import NumberInput from './NumberInput';

const HelloWorldApp = () => {
  const [switchOn, toggleSwitch] = React.useState(false);
  const [reason, setReason] = React.useState(0);
  const [power, setPower] = React.useState(100);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        fetch('http://192.168.16.61/temp')
          .then(response => {
            if (response.status === 200) {
              return response.text();
            } else {
              console.log('error');
            }
          })
          .then(html => {
            setTemp(parseFloat(html));
          })
          .catch(error => {
            console.log('network temp error: ' + error);
          }),
      2000,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  const onToggleSwitch = (user: number) => {
    console.log('switch activated', user);
    if (!switchOn) {
      setReason(user);
    } else {
      setReason(user);
    }
    toggleSwitch(!switchOn);
    fetch('http://192.168.16.61/relay?power=' + power.toString())
      .then(response => {
        if (response.status === 200) {
          return response.text();
        } else {
          console.log('power error');
        }
      })
      .then(html => {
        console.log(html);
      })
      .catch(error => {
        console.log('network power error: ' + error);
      });
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Easier Floor Heating" />
      </Appbar.Header>
      <Card
        style={{
          height: '20%',
        }}>
        <Card.Title title="Control Device" />
        <Card.Content>
          <Paragraph>
            Turn on/off
            <Switch
              value={switchOn}
              onValueChange={() => onToggleSwitch(0)}
            />{' '}
            {'\n'}
          </Paragraph>
          <Paragraph>
            <Text>Power (%):</Text>
            <NumberInput number={100} setPower={setPower} />
          </Paragraph>
        </Card.Content>
      </Card>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-evenly',
          marginTop: '1%',
          height: '40%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            marginTop: '1%',
            height: '30%',
          }}>
          <WeatherCard />
          <StatusCard switchOn={switchOn} temp={temp} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
            marginTop: '1%',
            height: '40%',
          }}>
          <ScheduleCard
            toggle={onToggleSwitch}
            reason={reason}
            isOn={switchOn}
          />
        </View>
      </View>
    </PaperProvider>
  );
};
export default HelloWorldApp;
