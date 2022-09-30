import style from 'styled-components'
import { Form, Field } from 'formik'

export const Input = style(Field)`
  text-align: left;
  background-color: #C0A2FF;
  padding: 0.60em 0.6em;
  margin: 0.35em;
  border-radius: 0.5em;
  box-shadow: 0 5px 4px rgba(0 0 0 / 0.35);
`

export const StyleForm = style(Form)`
  width: 100%;
  padding: 2em;
  max-width: 190px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #CDCDCD;
  border-radius: 2em;
`

export const Fields1 = style.th`
  padding-bottom: 1em;
  width: 9em;
`

export const Fields2 = style.th`
  width: 9em;
  font-weight: normal;
`