import { NavLink } from "react-router";
import { m } from "~/paraglide/messages";
import { localizeHref } from "~/paraglide/runtime";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Login Page</h1>
      <p>
        {m.example_message({ username: "Jade" })} This is the login page.
        Implement your login form here.
      </p>
      <NavLink to={localizeHref("/")}>Return home</NavLink>
    </div>
  );
}
