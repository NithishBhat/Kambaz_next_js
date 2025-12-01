"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseNavigationProps {
  cid: string | string[] | undefined;
}

export default function CourseNavigation({ cid }: CourseNavigationProps) {
  const pathname = usePathname();

  // We define the links here so we can loop through them
  const links = [
    { label: "Home", path: `/Courses/${cid}/Home` },
    { label: "Modules", path: `/Courses/${cid}/Modules` },
    { label: "Piazza", path: `/Courses/${cid}/Piazza` },
    { label: "Zoom", path: `/Courses/${cid}/Zoom` },
    { label: "Assignments", path: `/Courses/${cid}/Assignments` },
    { label: "Quizzes", path: `/Courses/${cid}/Quizzes` },
    { label: "Grades", path: `/Courses/${cid}/Grades` },
    { label: "People", path: `/Courses/${cid}/People/Table` }, 
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        // Check if the current URL contains the link name (e.g. "Modules" or "People")
        // We use 'link.label' for the check, but handle specific cases if needed.
        // For "People", the URL is /People/Table, so .includes("People") works perfectly.
        const isActive = pathname.includes(link.label) || (link.label === "Home" && pathname.includes("/Home"));

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`list-group-item border border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}