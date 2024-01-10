import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
