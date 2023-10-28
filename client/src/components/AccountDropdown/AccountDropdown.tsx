import './AccountDropdown.css'
import { auth } from '../../utils/firebase.tsx'
import { signOut } from 'firebase/auth';
import { Link } from "react-router-dom";

export default function AccountDropdown(props: any) {
  

    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            props.setLoggedIn(false)
            props.setStripeCustomerId(null)
            props.setStripeCusctomerInfo({})
          })
          .catch((error) => {
            console.error("Error: ", error)
          });
        setTimeout(() => {window.location.reload()}, 100)
      }

    return (
        <>
            <div><Link className="dropdown-item" to={"/dashboard"}>Account</Link></div>
            <div><Link className="dropdown-item" to={"/userSettings"}>Settings</Link></div>
            <div><hr className="dropdown-divider"/></div>
            <div><a className="dropdown-item" onClick={handleLogout} href="#">Sign Out</a></div>
        </>
    )
}