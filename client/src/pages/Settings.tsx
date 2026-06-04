import { useUserStore } from "../userStore";

const Settings = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <p>User Settings</p>
      <p>{user?.username}</p>
    </div>
  );
};

export default Settings;
