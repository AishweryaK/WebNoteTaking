import { useState } from 'react';
import {
  // GoogleAuthProvider,
  // UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useReduxDispatch, useReduxSelector } from '../Store';
import { clearUserData, saveUser } from '../Store/User';
import { PROVIDER, TITLE } from '../Shared/Constants';
import { handleAuthError, handleSignUpError } from '../Shared/authError';
import { SignInProps, SignUpProps } from './user-hook';
import { addDocumentsForUser } from '../Shared/firebaseUtils';
import { auth, provider } from '../utils';

export default function useAuthentication() {
  const dispatch = useReduxDispatch();
  const myProvider = useReduxSelector((state) => state.user.provider);
  // const {displayName, uid, email} = useReduxSelector(
  //   state => state.user,
  // );
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

  const googleSignInCall = async () => {
    // signInWithPopup(auth, provider)
    //   .then((result: UserCredential) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential?.accessToken;
    //     const { user } = result;
    //     console.log(user, token, 'USERr');
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // const { email } = error.customData;
    //     // const credential = GoogleAuthProvider.credentialFromError(error);
    //     console.log(errorMessage);
    //   });
    try {
      await signInWithPopup(auth, provider);
      console.log('google');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    signInCall,
    signUpCall,
    signOutCall,
    //   uploadImageToFirebase,
    //   deletePhoto,
    googleSignInCall,
  };
}
