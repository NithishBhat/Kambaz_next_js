"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  // Define links based on auth state and role
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  // Add Users link only for ADMIN (Page 218)
  if (currentUser && currentUser.role === "ADMIN") {
    links.push("Users");
  }

  return (
    <Nav variant="pills" className="flex-column">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link) || pathname.includes(link)}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}