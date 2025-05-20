import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/match/matchSelectors";
import {addMatch} from '../../redux/match/matchOperations'
import { fetchAllMatch } from "../../redux/match/matchOperations";
import { logout } from "../../redux/auth/authOperations";
export default function MatchPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems)
  
  const initialValues = {
    name: "",
    number: "",
  };
  const handleAddMatch = (values) => {
    dispatch(addMatch(values));
    console.log(values)
  };

  useEffect(()=>{
    dispatch(fetchAllMatch())
  },[dispatch])

  const exitClick = ()=>{
    dispatch(logout())
  }
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleAddMatch} >
        <Form>
          <Field
            type="text"
            id="name"
            name="name"
            placeholder="Kim vs Kim ? "
          />
          <Field
            type="text"
            id="number"
            name="number"
            placeholder="Kaç x Kaç ?"
          />
          <button type="submit">Kaydet !</button>
        </Form>
      </Formik>

      {
        items.map((item,index)=>{
          return(
            <p key={index}>
              {item.name}
            </p>
          )
        })
      }

      <button onClick={exitClick} >Cıkıs yap</button>
    </div>
  );
}
