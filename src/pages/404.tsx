import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="text-bold text-7xl leading-none">404</span>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <span className="pt-4 text-lg text-accent-foreground">
        Return to{" "}
        <Link
          to="/"
          className="text-violet-500 underline underline-offset-4 dark:text-violet-400"
        >
          {" "}
          dashboard
        </Link>
      </span>
    </div>
  );
}
