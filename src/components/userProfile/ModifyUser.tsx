import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { MyAppText } from '@/ui/MyAppText';
import Boton from '@/ui/Boton';

const InputComponent = ({ text, icon }: { text: string, icon: number }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <TouchableOpacity style={{ borderWidth: 1, borderColor: '#8D6A9F', borderRadius: 10, justifyContent: 'center', width: '80%', alignSelf: 'center', marginTop: 30, height: 60 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon === 0 ? (
            <Feather name="edit-2" size={24} color="#09A4B7" style={{ marginLeft: 10 }} />
          ) : icon === 1 ? (
            <FontAwesome name="calendar-o" size={24} color="#09A4B7" style={{ marginLeft: 10 }} />
          ) : (
            <FontAwesome name="genderless" size={30} color="#09A4B7" style={{ marginLeft: 10 }} />
          )}
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={{ flex: 1, marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
      <MyAppText children={text} style={{ marginLeft: 50, color: '#646F77', fontWeight: '100' }} />
    </>
  );
};

export const ModifyUser = ({ onToggleScreen }) => {

  const handleToggleScreen = useCallback(() => {
    onToggleScreen();
  }, [onToggleScreen]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <InputComponent text='Edita aqui tu nombre de perfil' icon={0} />
        <InputComponent text='Edita tu edad' icon={1} />
        <InputComponent text='Edita tu genero' icon={2} />
      </View>
      <Boton title='Guardar' onPress={() => handleToggleScreen()} textStyles={{ fontSize: 20 }} styles={{ width: '35%', height: '10%', alignSelf: 'center', position: 'absolute', bottom: 10 }} />
    </View>
  );
};
