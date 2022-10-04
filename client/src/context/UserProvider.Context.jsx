import { useContext, useState } from 'react';
import { getUsersRequest, deleteUserRequest, createUserRequest, getUserRequest, updateUserRequest  } from '../api/register.api';
import { UserContext } from './User.Context'

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext deberia estar dentro de UserContextProvider");
  };
  return context;
};

export const UserContextProvider = ({ children }) => {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await getUsersRequest();
    setUsers(response.data);
    console.log(response);
  };

  const deleteUser = async (id) => {
    try {
      const response = await deleteUserRequest(id); 
      setUsers(users.filter(user => user.id_user !== id));
    } catch (error) {
      console.log(error);
    };
  };

  const createUser = async (user) => {
    try {
      const response = await createUserRequest(user);
      //console.log(response.data);
      setUsers([...users, response.data]);
    } catch (error) {
      console.log(error); 
    }
  };

  const getUser = async (id) => {
    try {
      const response = await getUserRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, newFields) => {
    try {
      const response = await updateUserRequest(id, newFields);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <UserContext.Provider value = {{ users, loadUsers, deleteUser, createUser, getUser, updateUser }}>
    {children}
  </UserContext.Provider>
  );
};