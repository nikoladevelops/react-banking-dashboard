export default function Profile({ user }) {
  return (
    <div className="flex gap-3 justify-center align-center p-20 bg-gray-200">
      <h4>Welcome {user?.username}!</h4>
    </div>
  );
}
