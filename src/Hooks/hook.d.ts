export interface SignInProps {
    email: string;
    password: string;
  }
  
  export interface UserProps {
    displayName: string;
    uid: string;
    email: string;
    photoURL: string;
    provider: string;
  }
  
  export interface SignUpProps {
    firstName: string;
    lastName: string;
    // imageUri: string;
    password: string;
    email: string;
  }
  
  export interface UploadImageProps {
    imageUri: string;
    userId: string;
  }
