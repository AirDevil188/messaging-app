import { FiMessageSquare, FiUsers, FiLogOut, FiUser } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import styles from "./Navigation.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Navigation = ({ userObject, setUserObject }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    setUserObject({
      ...userObject,
      username: null,
      token: null,
      imageUrl: null,
    });
    return navigate("/log-in", { replace: true });
  };
  return (
    <header>
      <nav>
        <ul className={styles.sideBarMenu}>
          <li className={styles.navButton}>
            <a href="/messages">
              <FiMessageSquare size={40} />
            </a>
          </li>
          <li className={styles.navButton}>
            <a href="/global">
              <RiGlobalLine size={40} />
            </a>
          </li>
          <li className={styles.navButton}>
            <a href="/all-users">
              <FiUsers size={40} />
            </a>
          </li>
        </ul>
        <ul className={styles.profileMenu}>
          <li className={styles.navButton}>
            <a href="/profile">
              <FiUser size={40} />
            </a>
          </li>
          <li className={styles.navButton} onClick={handleLogOut}>
            <FiLogOut size={40} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  userObject: PropTypes.object.isRequired,
  setUserObject: PropTypes.bool.isRequired,
};

export default Navigation;
