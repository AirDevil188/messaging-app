import { FiMessageSquare, FiUsers, FiLogOut } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import styles from "./Navigation.module.css";
import PropTypes from "prop-types";

const Navigation = ({ userObject }) => {
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
              <img
                src={userObject.userImage}
                alt="User avatar!"
                id={styles.userAvatar}
              />
            </a>
          </li>
          <li className={styles.navButton}>
            <FiLogOut size={40} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  userObject: PropTypes.object.isRequired,
};

export default Navigation;
