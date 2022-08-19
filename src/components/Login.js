import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login(props) {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <LoginButton />
    </div>
  );
}
