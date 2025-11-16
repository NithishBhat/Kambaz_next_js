"use client";
import { ReactNode, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();

  // --- State from Redux ---
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  // --- Local UI State ---
  const [showNav, setShowNav] = useState(true);

  // --- Enrollment Protection Logic (Corrected) ---
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Dashboard");
      return;
    }

    const enrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid // Corrected
    );

    if (!enrolled) {
      alert("You are not enrolled in this course.");
      router.push("/Dashboard");
    } else {
      setIsEnrolled(true);
    }
    setIsLoading(false);
  }, [cid, currentUser, enrollments, router]);

  // Don't render anything until the check is complete and successful
  if (isLoading || !isEnrolled) {
    return null;
  }

  // --- Original Render Logic ---
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        {course?.name} <Breadcrumb course={course} />
      </h2>
      <hr />

      <div className="d-flex">
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