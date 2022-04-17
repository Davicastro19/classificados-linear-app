import * as React from 'react';
import { Box, CheckIcon, FlatList, Divider, VStack, Text, Spacer, Center, NativeBaseProvider,Select } from "native-base";
import { Picker } from '@react-native-picker/picker'
import { Dropdown } from 'sharingan-rn-modal-dropdown';
const TimeStrategy = (props) => {
  if (props.time === "M1"){
    return (
      <Dropdown
            label="Estratégia"
            data={[{label:"TODOS" ,value:"TODOS"} ,{label:"MELHOR DE 3" ,value:"MELHOR DE 3" } ,{label:"MILHÃO MAIORIA" ,value:"MILHAO MAIORIA" } ,{label:"MILHÃO MINORIA" ,value:"MILHAO MINORIA" } ,{label:"MHI MAIORIA" ,value:"MHI MAIORIA" } ,{label:"MHI" ,value:"MHI" } ,{label:"MHI 2" ,value:"MHI 2" } ,{label:"MHI 3" ,value:"MHI 3" } ,{label:"TORRES GÊMEAS" ,value:"TORRES GEMEAS" } ,{label:"PADRÃO 23" ,value:"PADRAO 23" } ,{label:"5º ELEMENTO" ,value:"5 ELEMENTO" } ,{label:"PADRÃO 3 X 1" ,value:"PADRAO 3 X 1" } ,{label:"3 VIZINHOS" ,value:"3 VIZINHOS" } ,{label:"3 MOSQUETEIROS" ,value:"3 MOSQUETEIROS" }]}
            enableSearch
            value={props.pair}
            onChange={props.setPairOptionFunction}
          />
    )}
  if (props.time === "M5"){
    return (
      <Dropdown
      label="Estratégia"
      data={[{label:"TODOS" ,value:"TODOS" } ,{label:"MHI" ,value:"MHI" } ,{label:"FORÇA MENOR 15" ,value:"FORCA MENOR 15" } ,{label:"TORRES GÊMEAS" ,value:"TORRES GEMEAS" } ,{label:"NÃO TRIPLICAÇÃO" ,value:"NAO TRIPLICACAO" } ,{label:"3 VIZINHOS" ,value:"3 VIZINHOS" } ,{label:"TRIPLICAÇÃO" ,value:"TRIPLICACAO" } ,{label:"MILHÃO MAIORIA" ,value:"MILHAO MAIORIA" } ,{label:"MILHÃO MINORIA" ,value:"MILHAO MINORIA" }]}
      enableSearch
      value={props.pair}
      onChange={props.setPairOptionFunction}
    />
   )}
}

export default TimeStrategy