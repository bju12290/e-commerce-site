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

  const showNotification = props.showNotification

  const [error, setError] = React.useState('');

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

      const handleHasAccount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setHasAccount((prevState: any) => !prevState)
        localStorage.setItem('hasAccount', JSON.stringify(!hasAccount))
      }
      
      const createUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
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
          const errorCode = error.code;
          // Here's the switch statement for error handling
          let message = '';
          switch (errorCode) {
            case 'auth/invalid-email':
              message = 'Invalid email address.';
              break;
            case 'auth/user-disabled':
              message = 'This user has been disabled.';
              break;
            case 'auth/missing-password':
              message = 'Password field cannot be blank!';
              break;
            case 'auth/invalid-login-credentials':
              message = 'Incorrect username or password.';
              break;
            case 'auth/missing-email':
              message = 'Email field cannot be blank!';
              break;
            default:
              message = 'An error occurred. Please try again.';
              break;
          }
          showNotification(message);
          console.error(errorCode, message);
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
                const errorCode = error.code;
                // Here's the switch statement for error handling
                let message = '';
                switch (errorCode) {
                  case 'auth/invalid-email':
                    message = 'Invalid email address.';
                    break;
                  case 'auth/user-disabled':
                    message = 'This user has been disabled.';
                    break;
                  case 'auth/missing-password':
                    message = 'Password field cannot be blank!';
                    break;
                  case 'auth/invalid-login-credentials':
                    message = 'Incorrect username or password.';
                    break;
                  case 'auth/missing-email':
                    message = 'Email field cannot be blank!';
                    break;
                  default:
                    message = 'An error occurred. Please try again.';
                    break;
                }
                showNotification(message);
                console.error(errorCode, message);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage)
      });}}

        handleAuthentication()

      }

      interface ErrorPopupProps {
        message: string;
        onClose: () => void;
      }

      const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
        return (
          <div className="error-popup">
            <div className="error-content">
              <p>{message}</p>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        );
      };
    


    return (
        <>
            <div className="d-flex justify-content-center align-items-center text-center flex-column">
                <form onSubmit={createUser} className="d-flex flex-column p-2 w-100">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input name="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="email" id="email"/>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginData(e)} type="password" id="password"/>
                    <button className="login-register-fade m-1 btn button-color">{hasAccount ? "Login" : "Register"}</button>
                    <a href="/forgotPassword"><p>{hasAccount ? "Forgot Password?" : ""}</p></a>
                </form>
                <div className="d-flex flex-column">
                  <p className="m-0">{hasAccount ? "Need an Account?" : "Already Registered?"}</p>
                  <button onClick={handleHasAccount} className="login-register-fade m-1 btn button-color">{hasAccount ? "Register" : "Login"}</button>
                  <p>{loggedIn ? "Welcome" : ""}</p>
                </div>
                {error && <ErrorPopup message={error} onClose={() => setError('')} />}
            </div>
        </>
        
    )
}