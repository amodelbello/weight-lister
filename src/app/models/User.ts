export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export function emptyUserObject(): User {
  const emptyUser: User = {
    firstName: '',
    lastName: '',
    isActive: false,
  }

  return emptyUser;
}

export interface AuthUser {
  uid: string;
  email: string;
  password: string;
}

export function emptyAuthUserObject(): AuthUser {
  const emptyAuthUser: AuthUser = {
    uid: '',
    email: '',
    password: '',
  }

  return emptyAuthUser;
}