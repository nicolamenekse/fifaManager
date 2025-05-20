import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/authOperations";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Geçerli değil").required("zorunlu"),
    password: Yup.string()
      .min(4, "en az 4 karakterli olmalıdır")
      .required("zorunlu"),
  });

  const loginSubmit = (values) => {
    dispatch(login(values));
    console.log("giriş başarılı ! ",values);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginSubmit}
      >
        <Form>
          <Field type="email" id="email" name="email" placeholder="email" />
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <button type="submit">Login !</button>
        </Form>
      </Formik>
      <Link to="/" >Ana Sayfa</Link>
       <Link to="/register" >Kayıt Ol</Link>
    </div>
  );
}
