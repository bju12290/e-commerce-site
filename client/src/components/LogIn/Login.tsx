import React from 'react'
import './Login.css'
import { auth } from '../../utils/firebase.tsx'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login(props: any) {

  const loggedIn = props.loggedIn
  const setLoggedIn = props.setLoggedIn

  const hasAccount = props.hasAccount
  const setHasAccount = props.setHasAccount

  const stripeCustomerId = props.stripeCustomerId
  const setStripeCustomerId = props.setStripeCustomerId

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, you can set your isLoggedIn state to true or perform any other actions.
      setLoggedIn(true);
      fetch(`https://localhost:3000/getStripeCustomerId?email=${user.email}`)
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
        console.log(hasAccount)
        e.stopPropagation();
      }
      
      const createUser = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      

      const handleAuthentication = () => {
        if (hasAccount) {
          signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then((userCredential) => {
          const user = userCredential.user
          console.log("Signed In")
          setLoggedIn(true)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })} else {
          createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Account Created")
            setLoggedIn(true)
            fetch('https://localhost:3000/createCustomer', {
              method: 'POST', // Change the method to POST
              body: JSON.stringify({ email: loginData.email }), // Send the user's email
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Stripe customer created:', data);
              })
              .catch((error) => {
                console.error('Error creating Stripe customer:', error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Didn't work")
      });}}

        handleAuthentication()

      }
    


    return (
        <>
            <div className="login--container d-flex justify-content-center align-items-center text-center flex-column">
                <form onSubmit={createUser} className="d-flex flex-column m-3">
                    <label htmlFor="email">Email:</label>
                    <input name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="email" id="email"/>
                    <label htmlFor="password">Password:</label>
                    <input name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="password" id="password"/>
                    <button className="m-1">{hasAccount ? "Login" : "Register"}</button>
                </form>
                <div className="d-flex flex-column m-3 mt-0">
                  <p className="m-0">{hasAccount ? "Need an Account?" : "Already Registered?"}</p>
                  <button onClick={handleHasAccount} className="m-1">{hasAccount ? "Register" : "Login"}</button>
                  <p>{loggedIn ? "Welcome" : ""}</p>
                </div>
            </div>
        </>
        
    )
}