import { useNavigate } from 'react-router-dom';

import Aurelius from '../../../assets/Aurelius.png';
import logoutbg from '../../../assets/logoutbg.png';
import styles from './styles.module.css';
import { GoogleAuthProvider, browserSessionPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const SignedOutHomePage = () => {
  // going to homepage when logging in
  const history = useNavigate();


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
        console.log('signing in')
  
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignIn = () => {
    SignInWithGoogle();
    history("/")
  };  
  
  
  
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${logoutbg})` }}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={Aurelius} alt="Aurelius Logo" />
          <div className={styles.Aurelius}>Aurelius</div>
        </div>
        <div>
          <button onClick={handleSignIn} className={styles.LoginButton}>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignedOutHomePage;