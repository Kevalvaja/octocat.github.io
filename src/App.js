import { useFormik } from 'formik';
import './App.css';
import * as yup from "yup"
import axios from "axios"
import api from './utils/api';
import { useEffect, useState } from 'react';
import UserDetails from './userDetails';

function App() {
  const [userData, setUserData] = useState([])
  const [message, setMessage] = useState("")
  const formik = useFormik({
    initialValues: {
      git_username: "",
    },
    validationSchema: yup.object({
      git_username: yup.string().required("Git-hub username is required")
    }),
    onSubmit: async () => {
      try {
        const { git_username } = formik?.values
        const res = await api.get(`/users/${git_username}`)
        console.log(res?.data)
        console.log(res?.status)
        if (res?.status === 200) {
          setUserData(res?.data)
        }
      } catch (error) {
        console.log(error?.response?.data?.message)
        if (error?.response?.status === 404) {
          setMessage(error?.response?.data?.message)
        }
      }
    }
  })

  useEffect(() => {
    if (formik?.values?.git_username == "") {
      setMessage("")
    }
  }, [formik?.values?.git_username])
  if (userData?.length != 0) {
    return (
      <>
        <UserDetails userData={userData} setUserData={setUserData} formik={formik} />
      </>
    )
  } else {
    return (
      <>
        <div className="px-2 py-2">
          <label className="input">
            <input type="search" name='git_username' className="grow" placeholder="Enter Git-hub Username" onChange={formik?.handleChange} onBlur={formik?.handleBlur} />
          </label>
          <button className="btn btn-primary mx-2 my-2 sm:text-center" onClick={formik?.handleSubmit}>Search</button>
          {formik?.errors?.git_username && formik?.touched?.git_username &&
            <div className='text-sm text-red-500'>{formik?.errors?.git_username}</div>
          }
          {message != "" ? <div className='font-bold text-red-500'>{formik?.values?.git_username}&nbsp;{message}</div> : ""}
        </div>
      </>
    );
  }
}

export default App;
