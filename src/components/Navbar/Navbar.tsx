import { ThemeToggle } from "../Theme";
import { Bars3Icon } from "@heroicons/react/20/solid";

export default function Navbar() {
  return (
    <div className="navbar justify-end bg-base-100">
      <div className="flex-none">
        <ThemeToggle />
      </div>
    </div>
  );
}
