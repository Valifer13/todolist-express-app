// This file is for test purpose only

export interface User {
  username: string,
  email: string,
  password: string,
}

export let userDB: User[] = [];
export let refreshTokenDB: string[] = [];