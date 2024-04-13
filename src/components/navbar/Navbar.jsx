import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import {  useState } from 'react';
import topchicken from '../../../assets/topchicken.jpg';
import Aurelius from '../../../assets/Aurelius.png';
import { useNavigate } from 'react-router-dom';
import Theme from './Theme/Theme';
import { auth} from '../../firebase';
import {  signOut } from 'firebase/auth';


const Navbar = () => {

  const navigate = useNavigate();

  const curuser = auth.currentUser;
  
  const [toggleChicken, setToggleChicken] = useState(true);




  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} onClick={() => navigate('/')} />
        <Link to="/">{" "}Shards</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  
                    <NavLink to={'/create-shard'}>
                      New Shard
                    </NavLink>

                </li>
              </div>
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  <div onClick={(e) => handleSignOut(e)}>Log Out</div>
                </li>
              </div>

          
            <NavLink onClick={() => setToggleChicken(!toggleChicken)}>
              <img src={toggleChicken ? curuser?.photoURL : topchicken} alt="user" />
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
