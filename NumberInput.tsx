import React from 'react';
import {
  IconButton,
  Provider as PaperProvider,
  Text,
  TextInput,
} from 'react-native-paper';
import {View} from 'react-native';

interface NumberInputProperties {
  setPower: Function;
  number: number;
}

const NumberInput = (props: NumberInputProperties) => {
  const height = 50;
  const [number, changeNumber] = React.useState(props.number);

  const add = (value: number) => {
    const newValue = value + 1;
    console.log(newValue);
    props.setPower(newValue);
    changeNumber(newValue);
  };
  const subtract = (value: number) => {
    const newValue = value - 1;
    props.setPower(newValue);
    changeNumber(newValue);
  };
  return (
    <PaperProvider>
      <View
        style={{
          flexDirection: 'row',
          width: 120,
          height: height,
          flex: 1,
          justifyContent: 'space-around',
          position: 'relative',
          top: 20,
          left: 10,
        }}>
        <IconButton
          style={{
            flex: 1,
            width: 20,
            height: height,
            borderRadius: 0,
            margin: 0,
            padding: 0,
          }}
          mode="outlined"
          icon="plus"
          onPress={() => {
            add(number);
          }}
        />
        <TextInput
          style={{width: 60}}
          mode="flat"
          disabled
          textAlign={'center'}>
          <Text style={{fontSize: 15}}>{number}</Text>
        </TextInput>
        <IconButton
          style={{
            flex: 1,
            width: 20,
            height: height,
            borderRadius: 0,
            margin: 0,
            padding: 0,
          }}
          mode="outlined"
          icon="minus"
          onPress={() => {
            subtract(number);
          }}
        />
      </View>
    </PaperProvider>
  );
};

export default NumberInput;
