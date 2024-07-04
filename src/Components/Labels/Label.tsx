import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useReduxSelector } from '../../Store';
import { CollectionItem } from '../../Shared/shared';
import { userDocRef } from '../../Shared/firebaseUtils';

const useLabels = () => {
  const { uid } = useReduxSelector((state) => state.user);
  const [labels, setLabels] = useState<CollectionItem[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef(uid), (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        if (userData && userData.collections) {
          setLabels(userData.collections);
        }
      }
    });

    return () => unsubscribe();
  }, [uid]);

  return labels;
};

export default useLabels;
