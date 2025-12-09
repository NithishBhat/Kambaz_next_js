"use client";
import { ReactNode, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { fetchEnrollmentsForUser } from "../../Enrollments/reducer";
import { fetchCourses } from "../reducer";

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
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  // --- Local UI State ---
  const [showNav, setShowNav] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch data and check enrollment ---
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!currentUser) {
        router.push("/Dashboard");
        return;
      }

      // Fetch courses and enrollments if not already loaded
      if (courses.length === 0) {
        await dispatch(fetchCourses());
      }
      if (enrollments.length === 0) {
        await dispatch(fetchEnrollmentsForUser(currentUser._id));
      }

      setIsLoading(false);
    };

    checkEnrollment();
  }, [currentUser, dispatch]);

  // --- Check enrollment after data is loaded ---
  useEffect(() => {
    if (isLoading || !currentUser) return;

    const enrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );

    if (!enrolled) {
      alert("You are not enrolled in this course.");
      router.push("/Dashboard");
    }
  }, [isLoading, enrollments, currentUser, cid, router]);

  // Check if enrolled
  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  // Don't render anything until the check is complete and successful
  if (isLoading || !isEnrolled) {
    return <div>Loading...</div>;
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