export interface UserInfoState {
    displayName: string | null;
    uid: string;
    email: string | null;
    photoURL: string | null;
    // theme: Theme;
    provider: string;
  }

  export interface NetInfoState {
    connection: boolean;
  }