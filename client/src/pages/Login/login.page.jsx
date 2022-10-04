import { Formik } from 'formik';
import { useLoginContext } from '../../context/LoginProvider.Context'
import { StyleForm, Input } from '../../styled-components/register.styled';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electronico invalido')
});

function LoginPage() {
  const { createLogin } = useLoginContext();

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={ async (values, actions) => {
          createLogin(values);
          actions.resetForm();
        }}
      >
        {({handleChange, handleSubmit, isSubmitting, values, errors, touched}) => (
          <StyleForm onSubmit={handleSubmit}>

            <Input type="text" placeholder="Correo electronico" name="email" onChange={handleChange} value={values.email}/> {
              errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null
            } <br/> 

            <Input type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={values.password}/> 

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Entrar"}
            </button>
        
          </StyleForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;