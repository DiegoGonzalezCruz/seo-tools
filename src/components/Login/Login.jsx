import SignOutComponent from "./SignOutComponent";
import SignInComponent from "./SignInComponent";
import { auth } from "@/auth";

const Login = async () => {
  const session = await auth();
  // console.log(session, 'session')

  if (!session) {
    return <SignInComponent />;
  } else {
    return <SignOutComponent />;
  }
};

export default Login;
