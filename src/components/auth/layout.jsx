import { Outlet } from "react-router-dom";
import authLogo from "../../assets/authLogo.png"; 

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <img src={authLogo} alt="Logo" className="mx-auto max-w-[900px] max-h-[900px]" />
         
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
