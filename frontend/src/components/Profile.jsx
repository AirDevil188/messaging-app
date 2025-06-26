import { useFetcher, useLoaderData, useOutletContext } from "react-router-dom";
import styles from "./Profile.module.css";
import { useRef } from "react";
import { handleFetch } from "../utils/handleFetch";

const Profile = () => {
  const profile = useLoaderData();
  const fetcher = useFetcher();
  const file = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    file.current.click();
  };

  const onChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      fetcher.submit(e.target.form, {
        method: "POST",
        encType: "multipart/form-data",
      });
    }
  };

  return (
    <main className={styles.profileMain}>
      <section className={styles.profileSection}>
        <section className={styles.profileInfo}>
          <section className={styles.profileAvatarSection}>
            <img src={profile.imageUrl} alt="Profile Avatar" />
            <section className={styles.profileAvatarForm}>
              <fetcher.Form method="post" encType="multipart/form-data">
                <input
                  type="file"
                  name="file"
                  id="file"
                  hidden={true}
                  onChange={onChange}
                  ref={file}
                />
                <button onClick={handleClick} className={styles.uploadButton}>
                  Upload
                </button>
              </fetcher.Form>
            </section>
          </section>
          <section className={profile.profileDetails}>
            <h3>Profile Details</h3>
            <span>Username: {profile.username}</span>
          </section>
        </section>
      </section>
    </main>
  );
};

export const handleFileUpload = async ({ request }) => {
  const formData = await request.formData();

  const res = await handleFetch("/profile", formData, "POST", {
    Authorization: "Bearer " + localStorage.getItem("token"),
  });
  if (res.ok) {
    return await res.json();
  }
};

export default Profile;
