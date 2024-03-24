import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import './ForgotPassword.css';

export default function ForgotPassword(props: any) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('A password reset link has been sent to your email address. Please check your inbox (and spam folder).');
        setError(''); // Clear any previous errors
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(`Failed to send password reset email: ${errorMessage}`);
        setMessage(''); // Clear any previous messages
      });
  };

    return (
    <>
    <div>
      <Navbar 
                setStripeCustomerInfo={props.setStripeCustomerInfo}
                cartTotal={props.cartTotal} 
                setCartTotal={props.setCartTotal}
                stripeCustomerId={props.stripeCustomerId} 
                setStripeCustomerId={props.setStripeCustomerId} 
                cartContents={props.cartContents} 
                setCartContents={props.setCartContents} 
                hasAccount={props.hasAccount} 
                setHasAccount={props.setHasAccount} 
                loggedIn={props.loggedIn} 
                setLoggedIn={props.setLoggedIn}
                showNotification={props.showNotification}
                />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
            <h1>Forgot Password</h1>
            <form className="d-flex flex-column align-items-center" onSubmit={handleResetPassword}>
            <div className="form-group mb-3">
                <label htmlFor="emailInput" className="visually-hidden">Email Address</label>
                <input
                id="emailInput"
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '300px' }} // Adjust width as needed
                />
            </div>
            <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
        </div>
      <Footer />
    </div>
    </>
  );
}