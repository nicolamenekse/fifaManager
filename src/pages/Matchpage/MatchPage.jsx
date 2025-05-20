import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/match/matchSelectors";
import {addMatch, deleteMatch} from '../../redux/match/matchOperations'
import { fetchAllMatch } from "../../redux/match/matchOperations";
import { logout } from "../../redux/auth/authOperations";
export default function MatchPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems)
  
  const initialValues = {
    teamA: "",
    teamB:"",
    number: "",
  };
  const handleAddMatch = (values) => {
    const combined={
      name:`${values.teamA} vs ${values.teamB}`,
      number:values.number,
    }

    dispatch(addMatch(combined));
    console.log(combined)
  };

  useEffect(()=>{
    dispatch(fetchAllMatch())
  },[dispatch])

  const exitClick = ()=>{
    dispatch(logout())
  }

  const deleteClick = (id)=>{
    dispatch(deleteMatch(id))
  }
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleAddMatch} >
        <Form>
          <Field
            type="text"
            id="teamA"
            name="teamA"
            placeholder="Kim vs Kim ? "
          />
          <Field type="text" id="teamB" name="teamB" placeholder="teamB" />
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
        items.map((item)=>{
          return(
            <ul>
              <li key={item.id}  > {item.name} / {item.number}  </li>
               <button onClick={()=>deleteClick(item.id)} >Delete</button>
    </ul>
          )
        })
      }
      <button onClick={exitClick} >Cıkıs yap</button>
    </div>
  );
}
