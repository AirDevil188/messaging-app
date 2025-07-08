import styles from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <section className={styles.footerSection}>
        <section className={styles.footerWrapper}>
          <FaGithub size={30} />
          <a href="https://github.com/AirDevil188">
            <p>AirDevil188</p>
          </a>
        </section>
      </section>
    </footer>
  );
};

/// footer injection
export default Footer;
