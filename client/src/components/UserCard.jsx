import { Fields2 } from '../styled-components/register.styled';
import { useUserContext } from '../context/UserProvider.Context';
import { useNavigate } from 'react-router-dom';

function UserCard({user}) {

  const { deleteUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <div>
      <table className="linea">
          <tbody className="container">
            <tr>
              <Fields2>{user.id_user}</Fields2>
              <Fields2>{user.role}</Fields2>
              <Fields2>{user.name}</Fields2>
              <Fields2>{user.lastname}</Fields2>
              <Fields2>{user.cc}</Fields2>
              <Fields2>{user.phone}</Fields2>
              <Fields2>{user.email}</Fields2>
              <Fields2><button onClick={() => deleteUser(user.id_user)}>Borrar</button></Fields2>
              <Fields2><button onClick={() => navigate(`/private/UpdateUser/${user.id_user}`)}>Actualizar</button></Fields2>
              </tr>
            </tbody>
      </table>
    </div>
  )
}

export default UserCard