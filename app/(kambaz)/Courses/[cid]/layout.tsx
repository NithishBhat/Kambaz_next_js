"use client";
import { ReactNode, useState, useEffect } from "react";
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
  const [accessGranted, setAccessGranted] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  // --- 1. Fetch enrollments when user is available ---
  useEffect(() => {
    if (currentUser && status === "idle") {
      dispatch(fetchEnrollmentsForUser(currentUser._id));
    }
  }, [currentUser, status, dispatch]);

  // --- 2. Enrollment Protection Logic ---
  useEffect(() => {
    // Don't check until we have a user and enrollments are loaded
    if (!currentUser) {
      router.push("/Dashboard");
      return;
    }

    // Wait for enrollments to be fetched
    if (status !== "succeeded") return;

    // Prevent multiple checks
    if (checkComplete) return;

    const isEnrolled = enrollments.some(
      (e: any) => String(e.user) === String(currentUser._id) && String(e.course) === String(cid)
    );

    // Faculty and Admin can access any course
    const canAccessAnyCourse = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

    if (isEnrolled || canAccessAnyCourse) {
      setAccessGranted(true);
    } else {
      alert("You are not enrolled in this course.");
      router.push("/Dashboard");
    }

    setCheckComplete(true);
  }, [cid, currentUser, enrollments, status, router, checkComplete]);

  // Show loading while checking enrollment
  if (!accessGranted) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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