import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useState } from 'react';
import topchicken from '../../../assets/topchicken.jpg';
import Aurelius from '../../../assets/Aurelius.png';
import { useNavigate } from 'react-router-dom';
import Theme from './Theme/Theme';

const Navbar = () => {
  const curuser = true;
  const navigate = useNavigate();

  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);



  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} onClick={() => navigate('/')} />
        <Link to="/">{" "}Aurelius</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser && (
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
