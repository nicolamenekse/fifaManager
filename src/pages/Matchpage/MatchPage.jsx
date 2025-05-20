import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/match/matchSelectors";
import {addMatch, deleteMatch} from '../../redux/match/matchOperations'
import { fetchAllMatch } from "../../redux/match/matchOperations";
import { logout } from "../../redux/auth/authOperations";
import styles from "./MatchPage.module.css";

export default function MatchPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems)
  
  const initialValues = {
    player: "",
    team:"",
    number: "",
  };
  const handleAddMatch = (values) => {
    const combined={
      name:`${values.player} / ${values.team}`,
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
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleAddMatch} >
        <Form className={styles.form}>
          <Field
            className={styles.input}
            type="text"
            id="player"
            name="player"
            placeholder="Kim vs Kim ? "
          />
          <Field 
            className={styles.input}
            type="text" 
            id="team" 
            name="team" 
            placeholder="Takımları yaz" 
          />
          <Field
            className={styles.input}
            type="text"
            id="number"
            name="number"
            placeholder="Kaç x Kaç ?"
          />
          <button className={styles.submitButton} type="submit">Kaydet !</button>
        </Form>
      </Formik>
      
      <div className={styles.matchList}>
        {items.map((item) => (
          <div key={item.id} className={styles.matchItem}>
            <span className={styles.matchInfo}>{item.name} / {item.number}</span>
            <button 
              className={styles.deleteButton}
              onClick={() => deleteClick(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <button className={styles.exitButton} onClick={exitClick}>
        Çıkış yap
      </button>
    </div>
  );
}
