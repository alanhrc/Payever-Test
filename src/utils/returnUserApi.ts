import axios from 'axios';

export interface IUserApiProps {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export async function ReturnUserApi(user_id: number) {
  try {
    const response = await axios<IUserApiProps>({
      baseURL: `https://reqres.in/api/users/${user_id}`,
      method: 'GET',
    });

    return response.data;
  } catch {
    console.error('User not found!');
  }
}
