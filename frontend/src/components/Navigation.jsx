import { FiMessageSquare, FiUsers, FiLogOut } from "react-icons/fi";
import { RiGlobalLine } from "react-icons/ri";
import styles from "./Navigation.module.css";

const Navigation = () => {
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
          <li className={styles.navButton}>
            <FiLogOut size={40} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
