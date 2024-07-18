import { useState } from 'react';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useReduxDispatch, useReduxSelector } from '../Store';
import { clearUserData, saveName, saveUser } from '../Store/User';
import { ERR_MSG, ERR_TITLE, PROVIDER, TITLE } from '../Shared/Constants';
import { handleAuthError, handleSignUpError } from '../Shared/authError';
import { SignInProps, SignUpProps } from './user-hook';
import { addDocumentsForUser } from '../Shared/firebaseUtils';
import { auth, provider } from '../utils';
import { showAlert } from '../Shared/alert';
import { FormValues } from '../Views/Account/NameChange';

export default function useAuthentication() {
  const dispatch = useReduxDispatch();
  const myProvider = useReduxSelector((state) => state.user.provider);
  const { displayName } = useReduxSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInCall = async ({ email, password }: SignInProps) => {
    setIsLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        dispatch(
          saveUser({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            provider: PROVIDER.EMAIL,
          })
        );
      }
    } catch (e) {
      const context = TITLE.LOGIN;
      handleAuthError(e, context);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpCall = async ({
    email,
    password,
    firstName,
    lastName, //   imageUri,
  }: SignUpProps) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const photoURL = null;
      // if (imageUri) {
      //   photoURL = await uploadImageToFirebase({imageUri, userId: user.uid});
      // }

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        // photoURL: photoURL,
      });

      if (email)
        dispatch(
          saveUser({
            displayName: `${firstName} ${lastName}`,
            uid: user.uid,
            email: user.email,
            photoURL,
            provider: PROVIDER.EMAIL,
          })
        );
      await addDocumentsForUser(user.uid);
    } catch (err) {
      handleSignUpError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const uploadImageToFirebase = async ({
  //   imageUri,
  //   userId,
  // }: UploadImageProps) => {
  //   const storageRef = storage().ref(`profile_images/${userId}.jpg`);
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  //   await storageRef.put(blob);
  //   const downloadURL = await storageRef.getDownloadURL();
  //   return downloadURL;
  // };

  // const deletePhoto = async () => {
  //   setIsLoading(true);
  //   try {
  //     const storageRef = storage().ref(`profile_images/${uid}.jpg`);
  //     await storageRef.delete();
  //     await auth().currentUser?.updateProfile({photoURL: null});
  //     dispatch(
  //       saveUser({
  //         displayName,
  //         uid,
  //         email,
  //         photoURL: '',
  //         provider: myProvider,
  //       }),
  //     );
  //   } catch (error) {
  //     console.error(ERR_CONSOLE.DELETE_PHOTOS, error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const signOutCall = async () => {
    setIsLoading(true);
    try {
      if (myProvider === PROVIDER.GOOGLE) {
        //   await GoogleSignin.signOut();
      } else {
        await signOut(auth);
      }
      dispatch(clearUserData());
    } catch (err) {
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = async (values: FormValues, onClose: () => void) => {
    if (values.firstName.trim() === '' || values.lastName.trim() === '') {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.FILL_ALL_FIELDS);
      return;
    }
    if (
      `${values.firstName.trim()} ${values.lastName.trim()}` === displayName
    ) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.SAME_USERNAME);
      return;
    }
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      await updateProfile(user as User, {
        displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
      });

      dispatch(
        saveName({
          displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
        })
      );
      onClose();
      showAlert(ERR_TITLE.SUCCESS, ERR_MSG.USERNAME_CHANGED);
    } catch (error: any) {
      console.error('Error', error);
      showAlert(ERR_TITLE.ERROR, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignInCall = async () => {
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // const { email } = error.customData;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage);
      });
    // try {
    //   await signInWithPopup(auth, provider);
    //   console.log('google');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return {
    isLoading,
    signInCall,
    signUpCall,
    signOutCall,
    //   uploadImageToFirebase,
    //   deletePhoto,
    googleSignInCall,
    handleNameChange,
  };
}
