import { useUserStore } from "../userStore";

export default function Profile() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex gap-3 justify-center align-center p-20">
      <h4>Welcome {user?.username}!</h4>
    </div>
  );
}
