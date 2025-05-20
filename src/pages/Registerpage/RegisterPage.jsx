import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={registerSubmit}
      >
        <Form>
          <Field type="text" id="name" name="name" placeholder="name" />
          <Field type="email" id="email" name="email" placeholder="email" />
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          <button type="submit">Kayıt ol</button>
        </Form>
      </Formik>

      <Link to="/" >Ana Sayfa</Link>
      <Link to="/login" >Giriş yap</Link>
    </div>
  );
}
