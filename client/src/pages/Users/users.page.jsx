import { useEffect } from 'react';
import UserCard from '../../components/UserCard.jsx';
import { Fields1 } from '../../styled-components/register.styled';
import { useUserContext } from '../../context/UserProvider.Context';

function UsersPage() {

  const { users, loadUsers } = useUserContext();

  useEffect(() => {
    loadUsers();
  }, []);

  function renderMain () {
    if (users.length === 0) return <h1>No hay usuarios registrados</h1>

    return users.map((user) =>
      <UserCard user = { user } key = { user.id_user }/>
    );
  };

  return (
    <div>
      <h1>Usuarios registrados</h1>
      <table className="linea">
        <thead>
          <tr>
            <Fields1 scope="col">ID</Fields1>
            <Fields1 scope="col">Rol</Fields1>
            <Fields1 scope="col">Nombre</Fields1>
            <Fields1 scope="col">Apellido</Fields1>
            <Fields1 scope="col">Cedula</Fields1>
            <Fields1 scope="col">Telefono</Fields1>
            <Fields1 scope="col">Correo</Fields1>
          </tr>
        </thead>
      </table>
      {renderMain()}
    </div>
  )
}

export default UsersPage