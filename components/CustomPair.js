import { View, Pressable, Keyboard, RefreshControl } from 'react-native';
import { FAB, Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react'
import userService from '../services/UserService';
import styles from '../style/Strategy'
import { Picker } from '@react-native-picker/picker'
import { Box, CheckIcon, Select, FlatList, Divider, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { Dropdown } from 'sharingan-rn-modal-dropdown';
const PairStrategy = (props) => {
  const payments = [];
  if (props.type === "catalog") {
    props.listPair.map((pair) =>
      payments.push(<Picker.Item color="white" key={pair.id} label={pair.pair.replace('TODOS', 'ABERTOS')} value={pair.pair.replace('TODOS', 'ABERTOS')} />)
    )
  }
  else {
    props.listPair.map((pair) =>
      payments.push(<Picker.Item color="white" key={pair.id} label={pair.pair} value={pair.pair} />)
    )
  }
  return (
    <Picker selectedValue={props.pair} itemStyle={{ fontSize: 15 }}
      style={{ borderRadius: 20, borderWidth: 2, borderColor: 'rgba(42, 42, 42,1)', height: 200, width: 200, backgroundColor: 'black' }}

      onValueChange={itemValue => props.setPairOptionFunction(itemValue)}>
      {payments}
    </Picker>
  )
}
export default PairStrategy