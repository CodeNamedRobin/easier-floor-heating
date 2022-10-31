import {Card, Paragraph, Title} from 'react-native-paper';
import React, {Component, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {TimePickerModal} from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimePicker from './TimePicker';

interface ScheduleCardProps {
  toggle: Function;
  reason: number;
  isOn: boolean;
}

const ScheduleCard = (props: ScheduleCardProps) => {
  const initialDataState = [
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
    {startHours: null, startMinutes: null, endHours: null, endMinutes: null},
  ];
  const [data, setData] = React.useState(initialDataState);
  const [components, setComponents] = React.useState<JSX.Element[]>([]);
  const [, updateState] = React.useState();
  const [count, setCount] = React.useState(0);
  const onToggleSwitch = props.toggle;

  useEffect(() => {
    const timer = () => {
      setCount(count + 1);
    };
    const date = new Date();
    const currDay = date.getDay() == 0 ? 6 : date.getDay() - 1;
    const currHour = date.getHours();
    const currMin = date.getMinutes();
    //console.log(data[currDay]);
    //console.log(props.isOn);
    let shouldBeTurnedOn = false;
    if (
      data[currDay].startHours != null &&
      data[currDay].startMinutes != null &&
      data[currDay].endHours != null &&
      data[currDay].endMinutes != null
    ) {
      // @ts-ignore
      // @ts-ignore
      if (
        currHour > data[currDay].startHours &&
        currHour < data[currDay].endHours
      ) {
        shouldBeTurnedOn = true;
      } else if (
        currHour == data[currDay].startHours &&
        currMin >= data[currDay].startMinutes &&
        currHour < data[currDay].endHours
      ) {
        shouldBeTurnedOn = true;
      } else if (
        currHour > data[currDay].startHours &&
        currHour == data[currDay].endHours &&
        currMin < data[currDay].endMinutes
      ) {
        shouldBeTurnedOn = true;
      } else if (
        currHour == data[currDay].startHours &&
        currMin >= data[currDay].startMinutes &&
        currHour == data[currDay].endHours &&
        currMin < data[currDay].endMinutes
      ) {
        shouldBeTurnedOn = true;
      } else {
        shouldBeTurnedOn = false;
      }
    }
    console.log(shouldBeTurnedOn, props.reason, props.isOn);
    if (shouldBeTurnedOn && !props.isOn) {
      console.log('user is: 1');
      onToggleSwitch(1);
    } else if (!shouldBeTurnedOn && props.reason !== 0 && props.isOn) {
      console.log(shouldBeTurnedOn);
      onToggleSwitch(0);
    }
    // if you want it to finish at some point
    //console.log(currDay, currHour, currMin);
    const id = setInterval(timer, 3000);
    return () => clearInterval(id);
  }, [count, data, onToggleSwitch, props.isOn, props.reason]);
  // @ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function addComponent(component: JSX.Element) {
    const newList = [...components, component];
    setComponents(newList);
  }

  function updateData(day: number) {
    let newData = data;
    getData(day)
      .then(value => (newData[day] = value))
      .then(() => {
        setData(newData);
        console.log(data);
        forceUpdate();
      });
  }

  const getData = React.useCallback(async (day: number) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@MyStorage:' + day);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }, []);

  return (
    <>
      <Card
        style={{
          width: '98%',
          height: '100%',
        }}>
        <Card.Content>
          <Title>Weekly Schedule</Title>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <Paragraph style={{height: '10%'}}>
              Monday Start: {data[0].startHours}:{data[0].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={0}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[0].endHours}:{data[0].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={0}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Tuesday Start: {data[1].startHours}:{data[1].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={1}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[1].endHours}:{data[1].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={1}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Wednesday Start: {data[2].startHours}:{data[2].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={2}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[2].endHours}:{data[2].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={2}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Thursday Start: {data[3].startHours}:{data[3].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={3}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[3].endHours}:{data[3].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={3}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Friday Start: {data[4].startHours}:{data[4].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={4}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[4].endHours}:{data[4].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={4}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Saturday Start: {data[5].startHours}:{data[5].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={5}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[5].endHours}:{data[5].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={5}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
            <Paragraph style={{height: '10%'}}>
              Sunday Start: {data[6].startHours}:{data[6].startMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={true}
                      day={6}
                      updateData={updateData}
                    />,
                  );
                }}
              />{' '}
              / End: {data[6].endHours}:{data[6].endMinutes}{' '}
              <Icon
                name={'pencil'}
                size={20}
                color="#900"
                onPress={() => {
                  addComponent(
                    <TimePicker
                      isStart={false}
                      day={6}
                      updateData={updateData}
                    />,
                  );
                }}
              />
              {'\n'}
            </Paragraph>
          </View>
          {components.map((item, i) => item)}
        </Card.Content>
      </Card>
    </>
  );
};

export default ScheduleCard;
