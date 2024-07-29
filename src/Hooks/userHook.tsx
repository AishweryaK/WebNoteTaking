import { useState } from 'react';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useReduxDispatch, useReduxSelector } from '../Store';
import { clearUserData, saveName, saveUser } from '../Store/User';
import { ERR_MSG, ERR_TITLE, PROVIDER, TITLE } from '../Shared/Constants';
import { handleAuthError, handleSignUpError } from '../Shared/authError';
import { SignInProps, SignUpProps, UploadImageProps } from './hook';
import { addDocumentsForUser } from '../Shared/firebaseUtils';
import { auth, storage } from '../utils';
import { showAlert } from '../Shared/alert';
import { FormValues } from '../Views/Account/NameChange';
import { setLoading } from '../Store/Loader';
import { googleLogout } from '@react-oauth/google';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function useAuthentication() {
  const dispatch = useReduxDispatch();
  const myProvider = useReduxSelector((state) => state.user.provider);
  const { displayName } = useReduxSelector((state) => state.user);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInCall = async ({ email, password }: SignInProps) => {
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  };

  const signUpCall = async ({
    email,
    password,
    firstName,
    lastName, //   imageUri,
  }: SignUpProps) => {
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  };

  // const uploadImageToFirebase = async ({
  //   imageUri,
  //   userId,
  // }: UploadImageProps) => {
  //   const storageRef = storageRef(`profile_images/${userId}.jpg`);
  //   const response = await fetch(imageUri);
  //   const blob = await response.blob();
  //   await storageRef.put(blob);
  //   const downloadURL = await storageRef.getDownloadURL();
  //   return downloadURL;
  // };

  const uploadImageToFirebase = async ({ imageUri, userId }: UploadImageProps) => {
    try {
      const dateID = new Date().toISOString().replace(/[-:.]/g, '');
      let storageRef = ref(storage, `profile_images/${userId}/${dateID}.jpg`);
        // storageRef = ref(storage, `profile_images/${userId}.jpg`);
      const response = await fetch(imageUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // const deleteImageFromFirebase = async (imageUrl:string) => {
  //   const storageRef = ref(storage, imageUrl);
  //   await deleteObject(storageRef);
  // };

  const deleteImageFromFirebase = async (downloadURL:string) => {
    try {
      const baseURL = "https://firebasestorage.googleapis.com/v0/b/notetakingapp-2cff4.appspot.com/o/";
      const path = decodeURIComponent(downloadURL.split(baseURL)[1].split('?')[0]);

      const fileRef = ref(storage, path);

      await deleteObject(fileRef);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };

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
    dispatch(setLoading(true));
    try {
      if (myProvider === PROVIDER.GOOGLE) {
        //   await GoogleSignin.signOut();
        googleLogout();
      } else {
        await signOut(auth);
      }
      dispatch(clearUserData());
    } catch (err) {
      // console.log(err);
    } finally {
      dispatch(setLoading(false));
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
    dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  };

  // const googleSignInCall = async () => {
  //   // signInWithPopup(auth, provider)
  //   //   .then((result: UserCredential) => {
  //   //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //   //     const token = credential?.accessToken;
  //   //     const { user } = result;
  //   //   })
  //   //   .catch((error) => {
  //   //     // const errorCode = error.code;
  //   //     const errorMessage = error.message;
  //   //     // const { email } = error.customData;
  //   //     // const credential = GoogleAuthProvider.credentialFromError(error);
  //   //     console.error(errorMessage);
  //   //   });
  //   try {
  //     await signInWithPopup(auth, provider);
  //     console.log('google');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const googleSignInCall = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    console.log(idToken)
    try {
      const result = await signInWithCredential(auth, credential);

      if (result.user) {
        dispatch(
          saveUser({
            displayName: result.user.displayName,
            uid: result.user.uid,
            email: result.user.email,
            photoURL: result.user.photoURL,
            provider: PROVIDER.GOOGLE,
          })
        );
      }

      const info = getAdditionalUserInfo(result);
      if (info && info.isNewUser) {
        await addDocumentsForUser(result.user.uid);
      }
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  };

  return {
    signInCall,
    signUpCall,
    signOutCall,
      uploadImageToFirebase,
      deleteImageFromFirebase,
    //   deletePhoto,
    googleSignInCall,
    handleNameChange,
  };
}
