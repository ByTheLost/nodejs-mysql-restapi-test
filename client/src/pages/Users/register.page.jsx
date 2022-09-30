import { Formik } from 'formik'
import * as Yup from 'yup';
import { Input, StyleForm } from '../../styled-components/register.styled';
import { useUserContext } from '../../context/UserProvider.Context';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Muy corto')
    .max(50, 'Muy largo')
    .required('El campo es requerido'),
  lastname: Yup.string()
    .min(3, 'Muy corto!')
    .max(50, 'Muy largo!')
    .required('El campo es requerido'),
  cc: Yup.string().matches(/^[0-9]+$/, "Solo numeros")
    .min(7, 'Minimo 7 digitos')
    .max(10, 'Maximo 10 digitos')
    .required('El campo es requerido'),
  phone: Yup.string().matches(/^[0-9]+$/, "Solo numeros")
    .min(10, 'Escriba 10 digitos')
    .max(10, 'Escriba 10 digitos')
    .required('El campo es requerido'),
  email: Yup.string()
    .email('Correo electronico invalido')
    .required('El campo es requerido'),
  password: Yup.string()
    .min(5, 'Muy corto')
    .max(50, 'Muy largo')
    .required('Escriba su contraseña'),
  confirmPassword: Yup.string()
    .min(5)
    .max(50)
    .required('El campo es requerido')
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
});

function RegisterPage() {

  const { createUser } = useUserContext();

  return (
    <div>
      <h1>{"Nuevo Usuario"}</h1>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          cc: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={ async (values, actions) => {
          createUser(values);
          actions.resetForm();
        }}
      >
        {({handleChange, handleSubmit, isSubmitting, values, errors, touched}) => (
          <StyleForm onSubmit={handleSubmit}>

            <Input type="text" placeholder="Nombres" name="name" onChange={handleChange} value={values.name}/> {
              errors.name && touched.name ? ( 
                <div>{errors.name}</div>
              ) : null
            } <br/>

            <Input type="text" placeholder="Apellidos" name="lastname" onChange={handleChange} value={values.lastname}/> {
              errors.lastname && touched.lastname ? (
                <div>{errors.lastname}</div>
              ) : null
            } <br/>

            <Input type="text" max="10" placeholder="Cedula" name="cc" onChange={handleChange} value={values.cc}/> {
              errors.cc && touched.cc ? (
                <div>{errors.cc}</div>
              ) : null
            } <br/>

            <Input type="text" placeholder="Numero de telefono" name="phone" onChange={handleChange} value={values.phone}/> {
              errors.phone && touched.phone ? (
                <div>{errors.phone}</div>
              ) : null
            } <br/>

            <Input type="text" placeholder="Correo electronico" name="email" onChange={handleChange} value={values.email}/> {
              errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null
            } <br/>

            <Input type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={values.password}/> {
              errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null
            } <br/>

            <Input type="password" placeholder="Confirmar contraseña" name="confirmPassword" onChange={handleChange} value={values.confirmPassword}/> {
              errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null
            } <br/>

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Registar"}
            </button>
        
          </StyleForm>
        )}
      </Formik>
    </div>
  )
}

export default RegisterPage