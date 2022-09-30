import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserProvider.Context';
import { Formik } from 'formik'
import { Input, StyleForm } from '../../styled-components/register.styled';

function UpdateUser() {

  const { getUser, updateUser } = useUserContext();
  const [ users, setUsers ] = useState({
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
        console.log(users);
        setUsers({
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
        onSubmit={ async (values, actions) => {
          await updateUser(params.id, values);
          navigate("/private/users");
          setUsers({
            name: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
          });
        }}
      >
        {({handleChange, handleSubmit, isSubmitting, values}) => (
          <StyleForm onSubmit={handleSubmit}>

            <Input type="text" placeholder="Nombres" name="name" onChange={handleChange} value={values.name}/> 

            <Input type="text" placeholder="Apellidos" name="lastname" onChange={handleChange} value={values.lastname}/> 

            <Input type="text" placeholder="Numero de telefono" name="phone" onChange={handleChange} value={values.phone}/>

            <Input type="text" placeholder="Correo electronico" name="email" onChange={handleChange} value={values.email}/>

            <Input type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={values.password}/>

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