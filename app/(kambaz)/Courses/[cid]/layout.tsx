"use client";
import { ReactNode, useState, useEffect, useRef } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { fetchEnrollmentsForUser } from "../../Enrollments/reducer";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const lastUserId = useRef<string | null>(null);

  // --- State from Redux ---
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments, status } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  // --- Local UI State ---
  const [showNav, setShowNav] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- 1. Data Fetching - refetch when user changes ---
  useEffect(() => {
    if (currentUser && currentUser._id !== lastUserId.current) {
      lastUserId.current = currentUser._id;
      setIsAuthorized(false); // Reset authorization for new user
      dispatch(fetchEnrollmentsForUser(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // --- 2. Enrollment Protection Logic ---
  useEffect(() => {
    if (!currentUser) {
      router.push("/Dashboard");
      return;
    }

    // Only check when data is loaded AND it's for the current user
    if (status === "succeeded" && enrollments.length > 0) {
      // Verify enrollments belong to current user
      const enrollmentsBelongToUser = enrollments.some(
        (e: any) => String(e.user) === String(currentUser._id)
      );

      if (!enrollmentsBelongToUser) {
        // Still loading correct user's enrollments, wait...
        return;
      }

      const isEnrolled = enrollments.some(
        (e: any) => String(e.user) === String(currentUser._id) && String(e.course) === String(cid)
      );

      if (isEnrolled) {
        setIsAuthorized(true);
      } else if (!isAuthorized) {
        alert("You are not enrolled in this course.");
        router.push("/Dashboard");
      }
    }
  }, [cid, currentUser, enrollments, status, router, isAuthorized]);

  // Show loading state while checking
  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

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