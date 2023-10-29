import React from 'react'
import './Login.css'
import { auth } from '../../utils/firebase.tsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login(props: any) {

  const loggedIn = props.loggedIn
  const setLoggedIn = props.setLoggedIn

  const hasAccount = props.hasAccount
  const setHasAccount = props.setHasAccount

  const setStripeCustomerId = props.setStripeCustomerId
  const setStripeCustomerInfo = props.setStripeCustomerInfo

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, you can set your isLoggedIn state to true or perform any other actions.
      setLoggedIn(true);
      fetch(`https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/getStripeCustomerId?email=${user.email}`)
          .then((response) => response.json())
          .then((data) => {
            setStripeCustomerId(data.id); // Adjust this according to your response structure
          })
          .catch((error) => {
            console.error('Error getting Stripe customer ID:', error);
          });
    } else {
      // User is signed out.
      setLoggedIn(false);
      setStripeCustomerId(null);
      setStripeCustomerInfo(null)
    }
  });

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
      })

      const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }))
      }

      const handleHasAccount = (e: any) => {
        setHasAccount((prevState: any) => !prevState)
        e.stopPropagation();
        localStorage.setItem('hasAccount', JSON.stringify(!hasAccount))
      }
      
      const createUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      

      const handleAuthentication = () => {
        if (hasAccount) {
          signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(() => {
          //const user = userCredential.user
          setLoggedIn(true)
          localStorage.setItem('hasAccount', JSON.stringify(hasAccount))
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error(errorCode, errorMessage)
        })} else {
          createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then(() => {
            //const user = userCredential.user;
            setLoggedIn(true)
            fetch('https://us-central1-ecommerce-site-584f2.cloudfunctions.net/api/createCustomer', {
              method: 'POST', // Change the method to POST
              body: JSON.stringify({ email: loginData.email }), // Send the user's email
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then(() => {
                //console.log('Stripe customer created:', data);
              })
              .catch((error) => {
                console.error('Error creating Stripe customer:', error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
      });}}

        handleAuthentication()

      }
    


    return (
        <>
            <div className="d-flex justify-content-center align-items-center text-center flex-column">
                <form onSubmit={createUser} className="d-flex flex-column m-3">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="email" id="email"/>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="password" id="password"/>
                    <button className="login-register-fade m-1 btn button-color">{hasAccount ? "Login" : "Register"}</button>
                </form>
                <div className="d-flex flex-column m-3 mt-0">
                  <p className="m-0">{hasAccount ? "Need an Account?" : "Already Registered?"}</p>
                  <button onClick={handleHasAccount} className="login-register-fade m-1 btn button-color">{hasAccount ? "Register" : "Login"}</button>
                  <p>{loggedIn ? "Welcome" : ""}</p>
                </div>
            </div>
        </>
        
    )
}