export type UserT = {
  id: number;
  name: string;
  email: string;
};

export interface UsersState {
  newUsers: UserT;
  accessToken: string;
}
