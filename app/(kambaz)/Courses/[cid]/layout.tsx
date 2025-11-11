"use client";
import { ReactNode, useState } from "react"; // Import useState
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  // Add state for navigation visibility
  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        {/* Add onClick to toggle the state */}
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        {course?.name} <Breadcrumb course={course} />
      </h2>
      <hr />

      <div className="d-flex">
        {/* Conditionally render the navigation based on state */}
        {showNav && (
          <div>
            <CourseNavigation cid={cid} />
          </div>
        )}

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}