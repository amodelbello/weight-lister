export interface User {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export function emptyUserObject() {
  const emptyUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    isActive: false,
  }

  return emptyUser;
}