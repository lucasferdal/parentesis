import { create } from 'zustand';
import React, { useEffect } from 'react';

import { Firestore_Db } from '@/components/auth/FirebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

import { UserData } from '@/services/UserData';

interface State {
  user: any; 
  medals: any; 
  fetchUserData: () => Promise<void>; 
}

export const useStore = create<State>((set, get) => ({
  user: null,
  medals: null,

  fetchUserData: () => {
    return new Promise<void>((resolve) => {
      const fetchData = async () => {
        const querySnapshot = await UserData();
        const userIds = querySnapshot.docs.map((doc) => doc.id);
        const userId = userIds[0];
    
        const unsubscribe = onSnapshot(doc(Firestore_Db, "users", userId), (doc) => {
          set({ user: doc?.data() });
        });
  
        resolve(); 
      };
      
      fetchData();
    });
  },
}));
//   fetchUserMedals: async () => {
//     try {
//       const userMedals = await fetchUserMedalsFromBackend();

//       set({ medals: userMedals });
//     } catch (error) {
//       console.error('Error al cargar las medallas del usuario:', error);
//     }
//   },

//   updateUser: async (newUserData) => {
//     try {
//       await updateUserInBackend(newUserData);

//       await get().fetchUserData();
//     } catch (error) {
//       console.error('Error al actualizar los datos del usuario:', error);
//     }
//   },
// }));

