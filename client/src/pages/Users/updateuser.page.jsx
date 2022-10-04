import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useUserContext } from '../../context/UserProvider.Context';
import { Formik } from 'formik'
import { Input, StyleForm } from '../../styled-components/register.styled';

const UpdateSchema = Yup.object().shape({
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
    .max(200, 'Muy largo')
    .required('Escriba su contraseña'),
});

function UpdateUser() {

  const { getUser, updateUser } = useUserContext();
  const [ users, setUsers ] = useState({
    id_user:"",
    cc:"",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      if(params.id){
        const users = await getUser(params.id);
        setUsers({
          id_user: users.id_user,
          cc: users.cc,
          name: users.name,
          lastname: users.lastname,
          phone: users.phone,
          email: users.email,
          password: users.password,
        });
      };
    };
    loadUser();
  }, []);

  return (
    <div>
      <h1>{"Actualizar Usuario"}</h1>
      <Formik
        initialValues={users}
        enableReinitialize={true}
        validationSchema={UpdateSchema}
        onSubmit={ async (values) => {
          console.log(users)
          await updateUser(params.id, values);
          navigate("/private/users");
          setUsers({
            id_user: params.id,
            cc:params.cc,
            name: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
          });
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

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Actualizar"}
            </button>
        
          </StyleForm>
        )}
      </Formik>
    </div>
  )
}

export default UpdateUser