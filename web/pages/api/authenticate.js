import instance from 'axios';

export const login = (credentials) => instance.post('http://127.0.0.1:8000/api/user/login', credentials)