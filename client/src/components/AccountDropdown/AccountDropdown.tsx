import './AccountDropdown.css'
import { auth } from '../../utils/firebase.tsx'
import { signOut } from 'firebase/auth';
import { Link } from "react-router-dom";

export default function AccountDropdown(props: any) {
  

    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            // User is signed out, Firebase will manage the state
          })
          .catch((error) => {
            console.error("Error: ", error)
          });
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