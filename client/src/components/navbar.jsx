import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>

      <h1>Trasmi con Node, React y MySQL</h1>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/private/users">Usuarios</Link>
        </li>
      </ul>

    </div>
  )
}

export default Navbar