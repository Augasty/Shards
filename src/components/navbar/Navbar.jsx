import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import topchicken from "../../../assets/topchicken.jpg";
import Aurelius from "../../../assets/Aurelius.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { fetchHeadShards } from "./fetchHeadShards";
import Modal from "./Modal"


const Navbar = () => {
  const navigate = useNavigate();

  const curuser = auth.currentUser;

  const pathname = useLocation().pathname;

  const [toggleChicken, setToggleChicken] = useState(true);

  const dispatch = useDispatch();

  // don't put the data fetching logic in shardlist, because,
  // if you are inside a doc and refresh, you want the data to be
  // fetched again, which won't be possible if you fetch only if you
  // are in the shardlist (which is in '/' path only)
  useEffect(() => {
    if (curuser) {
      fetchHeadShards(curuser, dispatch);
    }
  }, [curuser, dispatch]);
  const handleSignOut = () => {
    signOut(auth);
  };

  
  const [collapse, setCollapse] = useState(true);

  return (
    <>

<Modal collapse={collapse} setCollapse={setCollapse}/>
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} onClick={() => navigate("/")} />
        <Link to="/"> Shards</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {pathname == "/" && (
            <li className={styles.navbarListItem}>
              <NavLink to={"/create-shard"}>New Shard</NavLink>
            </li>
          )}

          <li className={styles.navbarListItem}>
            <div className={styles.infoButton}>
              <span>
                <button onClick={() => setCollapse(false)}>Info</button>
              </span>
            </div>
          </li>

          <li className={styles.navbarListItem}>
            <div onClick={(e) => handleSignOut(e)}>Log Out</div>
          </li>

          <NavLink onClick={() => setToggleChicken(!toggleChicken)}>
            <img
              src={toggleChicken ? curuser?.photoURL : topchicken}
              alt="user"
            />
          </NavLink>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
