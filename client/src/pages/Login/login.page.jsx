import { Formik } from 'formik';
import { useLoginContext } from '../../context/LoginProvider.Context'

function LoginPage() {
  const { createLogin } = useLoginContext();
  console.log(createLogin);

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default LoginPage;