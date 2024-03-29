import styles from "@/styles/ui/Profile.module.css";

interface Prop {
  profile: {
    profileImageSource?: string;
    email?: string;
  };
}

const Profile = ({ profile }: Prop) => {
  return (
    <div className={styles.Profile}>
      <img
        className={styles.ProfileImage}
        src={profile.profileImageSource}
        alt="프로필 이미지"
      />
      <span className={styles.ProfileEmail}>{profile.email}</span>
    </div>
  );
};

export default Profile;
