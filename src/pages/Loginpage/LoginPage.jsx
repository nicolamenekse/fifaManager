import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/auth/authOperations";
import { Link } from "react-router-dom";
import styles from "./Loginpage.module.css";

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
    console.log("giriş başarılı ! ", values);
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label className={styles.label}>Email</label>
            <Field 
              className={styles.input}
              type="email" 
              id="email" 
              name="email" 
              placeholder="email" 
            />
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
            
            <label className={styles.label}>Parola</label>
            <Field
              className={styles.input}
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
            
            <button className={styles.submitButton} type="submit">
              Login !
            </button>
          </Form>
        )}
      </Formik>
      
      <div className={styles.links}>
        <Link className={styles.link} to="/">Ana Sayfa</Link>
        <Link className={styles.link} to="/register">Kayıt Ol</Link>
      </div>
    </div>
  );
}
