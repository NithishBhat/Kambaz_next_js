"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6"; 
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function KambazNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer || {});
  const pathname = usePathname();

  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 120 }} id="wd-kambaz-navigation">

      <ListGroupItem className="bg-black border-0 text-center" as="a" target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
        <img src="/images/Neu.webp" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Account" id="wd-account-link" 
          className={`text-decoration-none ${pathname.includes("Account") ? "text-white" : "text-danger"}`}>
          <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-white" : "text-danger"}`} />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Dashboard" id="wd-dashboard-link"
          className={`text-decoration-none ${pathname.includes("Dashboard") ? "text-white" : "text-danger"}`}>
          <AiOutlineDashboard className={`fs-1 ${pathname.includes("Dashboard") ? "text-white" : "text-danger"}`} />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Dashboard" id="wd-courses"
          className={`text-decoration-none ${pathname.includes("Courses") ? "text-white" : "text-danger"}`}>
          <LiaCogSolid className={`fs-1 ${pathname.includes("Courses") ? "text-white" : "text-danger"}`} />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Calendar" id="wd-calendar-link"
          className={`text-decoration-none ${pathname.includes("Calendar") ? "text-white" : "text-danger"}`}>
          <IoCalendarOutline className={`fs-1 ${pathname.includes("Calendar") ? "text-white" : "text-danger"}`} />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
     
      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Inbox" id="wd-inbox-link"
          className={`text-decoration-none ${pathname.includes("Inbox") ? "text-white" : "text-danger"}`}>
          <FaInbox className={`fs-1 ${pathname.includes("Inbox") ? "text-white" : "text-danger"}`} />
          <br />
          Inbox 
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link href="/Labs" id="wd-labs-link"
          className={`text-decoration-none ${pathname.includes("Labs") ? "text-white" : "text-danger"}`}>
          <LiaBookSolid className={`fs-1 ${pathname.includes("Labs") ? "text-white" : "text-danger"}`} />
          <br />
          Labs
        </Link>
      </ListGroupItem>

      {/* Admin Link: Only shows if user is ADMIN */}
      {currentUser && currentUser.role === "ADMIN" && (
        <ListGroupItem className="bg-black border-0 text-center">
          <Link href="/Account/Users" id="wd-users-link"
            className={`text-decoration-none ${pathname.includes("Users") ? "text-white" : "text-danger"}`}>
            <FaUsers className={`fs-1 ${pathname.includes("Users") ? "text-white" : "text-danger"}`} />
            <br />
            Users
          </Link>
        </ListGroupItem>
      )}
      
    </ListGroup>
  );
}