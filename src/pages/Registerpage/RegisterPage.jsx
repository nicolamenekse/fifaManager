import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./Registerpage.module.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("geçerli mail gir").required("zorunludur"),
    password: Yup.string().min(4, "en az 4 karakterli").required("zorunlu"),
  });

  const registerSubmit = (values) => {
    dispatch(register(values));
    console.log("kayıt basarılır");
  };
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={registerSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field 
              className={styles.input}
              type="text" 
              id="name" 
              name="name" 
              placeholder="name" 
            />
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
            <button className={styles.submitButton} type="submit">Kayıt ol</button>
          </Form>
        )}
      </Formik>

      <div className={styles.links}>
        <Link className={styles.link} to="/">Ana Sayfa</Link>
        <Link className={styles.link} to="/login">Giriş yap</Link>
      </div>
    </div>
  );
}
