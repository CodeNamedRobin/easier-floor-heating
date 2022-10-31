import React from 'react';
import {TimePickerModal} from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TimePickerProps {
  isStart: boolean;
  day: number;
  updateData: Function;
}

const TimePicker = (props: TimePickerProps) => {
  const isStart = props.isStart;
  const day = props.day;
  const [visible, setVisible] = React.useState(true);
  const onDismiss = () => setVisible(false);

  const storeData = React.useCallback(
    async (value: {
      startHours: number;
      startMinutes: number;
      endHours: number;
      endMinutes: number;
    }) => {
      try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem('@MyStorage:' + day, json);
      } catch (e) {
        // saving error
      }
    },
    [day],
  );

  const getData = React.useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@MyStorage:' + day);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }, [day]);

  // @ts-ignore
  const onConfirm = React.useCallback(
    async (hoursAndMinutes: {hours: number; minutes: number}) => {
      const hours = hoursAndMinutes.hours;
      const minutes = hoursAndMinutes.minutes;
      await getData().then(json => {
        if (json == null) {
          console.log(true);
          json = {
            startHours: null,
            startMinutes: null,
            endHours: null,
            endMinutes: null,
          };
        }
        if (isStart) {
          json.startHours = hours;
          json.startMinutes = minutes;
        } else {
          json.endHours = hours;
          json.endMinutes = minutes;
        }
        storeData(json);
      });
      props.updateData(day);
      setVisible(false);
      //console.log({hours, minutes});
      //getData().then(json => console.log(json));
    },
    [storeData, isStart, props, day, getData],
  );

  return (
    <TimePickerModal
      minutes={41}
      hours={9}
      visible={visible}
      onDismiss={onDismiss}
      onConfirm={onConfirm}
    />
  );
};

export default TimePicker;
