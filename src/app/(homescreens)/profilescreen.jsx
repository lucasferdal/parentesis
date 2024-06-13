import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { editpic } from '@/assets';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Octicons,
} from '@expo/vector-icons';
import Boton from '@/ui/Boton';
import { UserInformation } from '@/services/UserData';

import { ModifyUser } from '@/components/userProfile'
import { useSignOut } from 'react-firebase-hooks/auth';
import { useRouter } from 'expo-router';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { Shadow } from 'react-native-shadow-2';

export default function ProfilePage() {

  const [signOut] = useSignOut(Firebase_Auth);
  const router = useRouter();
  const [whichScreen, setWhichScreen] = useState(true);

  const [userData, setUserData] = useState({
    username: '...',
    email: '...',
    age: 0
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await UserInformation();
      const { name, email, edad } = user;
      const spaceIndex = name?.indexOf(' ');

      const username = spaceIndex !== -1 ? name?.substring(0, spaceIndex) : name;
      setUserData({
        username: username,
        email: email,
        age: edad
      })

    }
    fetchUser();
  }, []);

  const ProfileComponentLog = ({
    text = 'Cerrar Sesión',
    onClick = () => {
      signOut
      router.replace('loginscreen');
    },
  }) => {
    return (
      <View style={{ marginTop: 60, width: '80%', alignSelf: 'center' }}>
        <Shadow distance={10} startColor={'#d0d0d0'} endColor={'#ffffff'} offset={[0, 3]} >
          <TouchableOpacity
            onPress={onClick}
            style={styles.profileComponentContainer}
          >
            <Feather name="log-out" size={20} color="#67397E" />
            <Text style={styles.profileComponentText}>{text}</Text>
            <View style={{ flex: 1 }}>
              <MaterialIcons name="arrow-forward-ios" size={30} color="#67397E" style={{ width: 30, left: '90%' }} />
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.textgreet}>Mi Perfil</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Image source={editpic} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.textprof}>{userData?.username}, {userData?.age || 'Edad sin Definir'}</Text>
          <Text style={styles.textemail}>{userData.email}</Text>
        </View>
      </View>

      {whichScreen ? (
        <View>

          <ProfileComponent text="Editar Mi Perfil" onClick={() => setWhichScreen(!whichScreen)} />
          <View style={styles.divider}></View>
          <View style={styles.textcontainers}>
            <Text style={styles.textsupp}>Soporte</Text>
          </View>
          <ProfileComponent
            icon="terms"
            text="Términos y Condiciones"
            onClick={() => setModalVisible(!modalVisible)}
          />
          <ProfileComponent icon="info" text="Acerca de Nosotros" />
          <View style={styles.profileComponentLogContainer}>
            <ProfileComponentLog />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <ScrollView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.textgreet}>Términos y Condiciones</Text>
                  <Text style={styles.modalText}>
                    Al usar esta aplicación, aceptas nuestros términos. La app está diseñada para pausas
                    activas y hábitos saludables, pero no reemplaza el asesoramiento médico. Úsala bajo
                    tu responsabilidad y consulta a un profesional de la salud antes de cambiar tu
                    rutina. El contenido puede cambiar sin previo aviso.
                  </Text>
                  <Text style={styles.modalText}>
                    ¡Gracias por tu comprensión y disfruta de una vida más activa y saludable con
                    nuestra aplicación!
                  </Text>
                </View>
                <Boton title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </Modal>

        </View>
      ) : (
        <ModifyUser onToggleScreen={() => setWhichScreen(!whichScreen)} />)}
    </View>
  );
}

const ProfileComponent = ({
  text = 'Vacio',
  icon = 'edit',
  onClick = () => {
    console.log('nada');
  },
}) => {
  return (
    <View style={{ marginTop: 20, width: '80%', alignSelf: 'center' }}>
      <Shadow distance={10} startColor={'#d0d0d0'} endColor={'#ffffff'} offset={[0, 3]} >
        <TouchableOpacity
          onPress={onClick}
          style={styles.profileComponentContainer}
        >
          {icon == 'edit' && <Octicons name="pencil" size={20} color="#09A4B7" />}
          {icon == 'terms' && (
            <MaterialCommunityIcons name="file-document-multiple-outline" size={20} color="#09A4B7" />
          )}
          {icon == 'info' && <Feather name="lock" size={20} color="#09A4B7" />}

          <Text style={styles.profileComponentText}>{text}</Text>
          <View style={{ flex: 1 }}>
            <MaterialIcons name="arrow-forward-ios" size={30} color="#67397E" style={{ width: 30, left: '90%' }} />
          </View>
        </TouchableOpacity>
      </Shadow>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  textcontainer: {
    marginBottom: 37,
  },
  textcontainers: {
    display: 'flex',
  },
  textgreet: {
    // fontFamily: 'montserrat_semibold',
    fontSize: 20,
    color: '#102B3F',
  },
  textsupp: {
    paddingLeft: 25,
    // fontFamily: 'montserrat_semibold',
    fontSize: 16,
    color: '#102B3F',
  },
  textprof: {
    // fontFamily: 'montserrat_semibold',
    fontSize: 20,
    color: '#102B3F',
  },
  textemail: {
    // fontFamily: 'montserrat_semibold',
    fontSize: 12,
    color: '#102B3F',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  profileImageContainer: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: '#C1ECDB',
  },
  editButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#09A4B7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 70,
    left: 80,
  },
  editIcon: {
    height: 14,
    width: 14,
    backgroundColor: '#09A4B7',
  },
  profileTextContainer: {
    display: 'flex',
    gap: 20,
  },
  profileComponentContainer: {
    marginTop: 20,
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    backgroundColor: 'blue',
  },
  profileComponentText: {
    color: '#646F77',
    // fontFamily: 'montserrat_semibold',
    fontSize: 12,
  },
  profileComponentLogContainer: {
    display: 'flex',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(193, 236, 219, .8)',
    marginTop: 25,
    marginBottom: 25,
  },
  modalContainer: {
    height: '30%',
    marginTop: '100%',
    backgroundColor: '#D7DDFF',
    paddingVertical: 21,
    paddingHorizontal: 16,
    borderTopEndRadius: 45,
    borderTopStartRadius: 45,
  },
  modalContent: {
    marginBottom: 30,
  },
  modalText: {
    marginTop: 30,
    // fontFamily: 'montserrat_regular',
    fontSize: 14,
    textAlign: 'justify',
  },
});
