import Button from "./Button";
import styles from "../components/UserList.module.css";
import PropTypes from "prop-types";

const UserList = ({ users, handleUserMessages, userObject }) => {
  return (
    <ul className={styles.userList}>
      {users.map((user) => {
        if (user.id !== userObject.user) {
          return (
            <li key={user.id} className={`${styles.user} ${styles.flex}`}>
              <section className={styles.userInfo}>
                <img src={user.imageUrl} alt="User avatar" />
                <span>{user.username}</span>
              </section>

              <section className={styles.userButtonSection}>
                <Button
                  text={"SEND"}
                  type={"submit"}
                  onClick={handleUserMessages}
                  id={user.id}
                />
              </section>
            </li>
          );
        }
      })}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.object.isRequired,
  handleUserMessages: PropTypes.func.isRequired,
  userObject: PropTypes.object.isRequired,
};

export default UserList;
