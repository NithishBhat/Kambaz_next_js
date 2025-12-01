"use client";
import { ReactNode, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
// FIXED: Imported the correct function name
import { fetchEnrollmentsForUser } from "../../Enrollments/reducer";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>(); // Added <any> to prevent TypeScript dispatch errors

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

  // --- 1. Data Fetching Strategy ---
  // If the user refreshes the page, Redux forgets the enrollments.
  // We must fetch them again if the list is empty.
  useEffect(() => {
    if (currentUser && enrollments.length === 0) {
      // FIXED: Calling the correct function name with the correct user ID
      dispatch(fetchEnrollmentsForUser(currentUser._id));
    }
  }, [currentUser, enrollments, dispatch]);

  // --- 2. Enrollment Protection Logic ---
  useEffect(() => {
    if (!currentUser) {
      router.push("/Dashboard");
      return;
    }

    // Only run the strict check if we actually have enrollments loaded.
    if (enrollments.length > 0) {
      const isEnrolled = enrollments.some(
        (e: any) => String(e.user) === String(currentUser._id) && String(e.course) === String(cid)
      );

      if (!isEnrolled) {
        alert("You are not enrolled in this course.");
        router.push("/Dashboard");
      }
    }
  }, [cid, currentUser, enrollments, router]);

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