import { Link } from 'react-router-dom';
import { NavContainer } from '../styled-components/Navbar.styled';

function Navbar() {

  return (
    <>
      <NavContainer>
        <h2>Navbar <span>Responsive</span></h2>
        <div>
          <Link classname = "links" to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/private/users">Usuarios</Link>
        </div>
      </NavContainer>
    </>
  )
}

export default Navbar;