import PropTypes from "prop-types";
import styles from "./UsersList.module.css";

const UsersList = ({ users, handleUserMessages }) => {
  return (
    <ul className={styles.userList}>
      {users.map((user) => {
        return (
          <button
            key={user.id}
            id={user.id}
            className={`${styles.user} ${styles.flex}`}
            type="submit"
            onClick={handleUserMessages}
          >
            <section key={user.id}>
              <section className={styles.userInfo}>
                <img src={user.imageUrl} alt="User avatar" />
                <span>{user.username}</span>
              </section>

              <section className={styles.userButtonSection}></section>
            </section>
          </button>
        );
      })}
    </ul>
  );
};

UsersList.propTypes = {
  users: PropTypes.object.isRequired,
  handleUserMessages: PropTypes.func.isRequired,
  userObject: PropTypes.object.isRequired,
  previewMessages: PropTypes.array.isRequired,
};

export default UsersList;
