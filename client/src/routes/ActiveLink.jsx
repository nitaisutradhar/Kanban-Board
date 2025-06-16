import { NavLink } from "react-router";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-primary border-b-2 border-primary"
                : "text-base-content hover:text-primary"
            }`
          }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;