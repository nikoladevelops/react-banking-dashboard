//import { useUserStore } from "../userStore";
import UserDashboard from "../components/userDashboard/UserDashboard";

export default function Profile() {
  //const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col items-center gap-3 justify-center align-center p-5">
      <UserDashboard />
    </div>
  );
}
