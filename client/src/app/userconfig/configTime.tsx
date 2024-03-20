import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Boton from '@/ui/Boton';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';
import { AgregarHorarios } from '@/components/settingsComponent/AgregarHorarios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import useHorariosStore from '@/storages/horariosstore';
import { guardarHorariosUsuario } from '@/services/TimesServices';

const ConfigTime = () => {
  const [isSelected, setSelection] = useState(false);
  const setOnboarding = useOnboarding((state) => state.setOnboarding);
  const router = useRouter();

  const { selectedDays, selectedStartTime, selectedEndTime, setSelectedDays, setSelectedStartTime, setSelectedEndTime } = useHorariosStore();

  const handleNext = async () => {
    router.push('./configNots');

    if (selectedDays && selectedDays.length > 0 && selectedStartTime && selectedStartTime.trim() !== '' && selectedEndTime && selectedEndTime.trim() !== '') {

      await guardarHorariosUsuario(selectedDays, selectedStartTime, selectedEndTime);

      setSelectedDays([]);
      setSelectedStartTime('');
      setSelectedEndTime('');
    }
  };
  const handleSkip = () => {
    router.replace('homeScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 60 }}>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#09A4B7',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
        </View>
        <Text style={styles.text}> </Text>
        <Text style={styles.title}>Cuales son tus horarios frente a la pantalla?</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 14 }}>
          <AgregarHorarios />
        </View>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={22}
            fillColor="#102B3F"
            unfillColor="white"
            text="Tengo horarios distintos"
            iconStyle={{ borderColor: '#102B3F', borderRadius: 4 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            textStyle={{
              fontFamily: 'montserrat_regular',
              textDecorationLine: 'none',
              color: 'black',
            }}
            onPress={(isChecked) => setSelection(isChecked)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Boton onPress={handleNext} title="Siguiente" styles={styles.button1} />
        <Boton
          onPress={handleSkip}
          title="Saltar"
          styles={{ backgroundColor: 'transparent', right: 18.3, top: 52.6 }}
          textStyles={{ color: '#2E698C', fontSize: 13 }}
        />
      </View>
    </>
  );
};

export default ConfigTime;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },

  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: 'montserrat_semibold',
    marginBottom: 60,
    textAlign: 'center',
    color: '#102B3F',
  },
  text: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
  },
  text1: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
    color: 'white',
  },
  button1: {
    position: 'absolute',
    top: '-2%',
    right: '9.3%',
  },

  checkboxContainer: {
    marginTop: 70,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
