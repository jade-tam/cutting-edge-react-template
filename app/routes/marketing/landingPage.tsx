import { NavLink } from "react-router";
import { m } from "~/paraglide/messages";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">
        {m.example_message({ username: "Jade" })}
      </h1>
      <NavLink to="/auth/login">{m.go_to_login()}</NavLink>
    </div>
  );
}
