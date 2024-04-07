import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useState } from 'react';
import topchicken from '../../../assets/topchicken.jpg';
import Aurelius from '../../../assets/Aurelius.png';
import { useNavigate } from 'react-router-dom';
import Theme from './Theme/Theme';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider, browserSessionPersistence, setPersistence, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../tasks/fetchTasks';

const Navbar = () => {
  const curuser = auth.currentUser;
  const navigate = useNavigate();

  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);


  const dispatch = useDispatch();

  const SignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
  
      // Check if the user's email exists in the 'database1' collection
      const userEmail = result.user.email;
  
      const userRef = doc(db, "users", userEmail);
  
      const userSnapshot = await getDoc(userRef);
  
      if (!userSnapshot.exists()) {
        // console.log('new');
        const userData = {
          email: userEmail,
        };
        await setDoc(doc(db, "users", userEmail), userData);

  
      }else{
        fetchTasks(curuser,dispatch)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignOut = () => {
    signOut(auth);
  };
  const handleSignIn = () => {
    SignInWithGoogle();
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} onClick={() => navigate('/')} />
        <Link to="/">{" "}Aurelius</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser ? (
            <>
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  
                    <NavLink to={'/create-task'}>
                      New task
                    </NavLink>

                </li>
              </div>
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  <div onClick={(e) => handleSignOut(e)}>Log Out</div>
                </li>
              </div>
            </>
          ):(
            <div className={styles.liDivItems}>
            <li className={styles.navbarListItem}>
              <div onClick={() => handleSignIn()}>Log In</div>
            </li>
          </div>
          )}
            <NavLink onClick={() => setToggleChicken(!toggleChicken)}>
              <img src={toggleChicken && curuser?.photoURL ? curuser?.photoURL : topchicken} alt="user" />
            </NavLink>


          <div className={styles.liDivItems}>
            <li className={styles.navbarListItem}>
              <Theme />
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
