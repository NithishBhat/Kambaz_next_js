"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaRocket, FaBan } from "react-icons/fa";
import Link from "next/link";
import * as client from "./client";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchQuizzes = async () => {
    if (cid) {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      description: "New Quiz Description",
      points: 0,
      dueDate: new Date().toISOString(),
      availableDate: new Date().toISOString(),
      untilDate: new Date().toISOString(),
      published: false,
      quizType: "GRADED_QUIZ",
      assignmentGroup: "QUIZZES",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      attempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      questions: [],
    };
    const quiz = await client.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(quiz));
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Editor`);
  };

  const handleDeleteQuiz = async (qid: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(qid);
      dispatch(deleteQuiz(qid));
    }
    setOpenDropdown(null);
  };

  const handlePublishToggle = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
    setOpenDropdown(null);
  };

  const toggleDropdown = (quizId: string) => {
    setOpenDropdown(openDropdown === quizId ? null : quizId);
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    if (now > untilDate) return "Closed";
    if (now >= availableDate && now <= untilDate) return "Available";
    return `Not available until ${availableDate.toLocaleDateString()}`;
  };

  // Filter for students (only published), then sort by available date
  const visibleQuizzes = currentUser?.role === "STUDENT"
    ? quizzes.filter((q: any) => q.published)
    : quizzes;

  const sortedQuizzes = [...visibleQuizzes].sort((a: any, b: any) => {
    return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
  });

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-25" placeholder="Search for Quiz" />
        
        {currentUser?.role !== "STUDENT" && (
          <div>
            <button className="btn btn-danger me-2" onClick={handleCreateQuiz}>
              <FaPlus className="me-1" /> Quiz
            </button>
          </div>
        )}
      </div>

      <hr />
      <ul className="list-group rounded-0">
        <li className="list-group-item list-group-item-secondary d-flex align-items-center justify-content-between">
          <div><FaEllipsisV className="me-2"/> <strong>Assignment Quizzes</strong></div>
        </li>

        {sortedQuizzes.length === 0 && (
          <li className="list-group-item text-center p-5">
            <h5 className="text-muted">No quizzes yet.</h5>
            {currentUser?.role !== "STUDENT" && (
              <p className="text-muted">Click the <strong>+ Quiz</strong> button to create one.</p>
            )}
          </li>
        )}

        {sortedQuizzes.map((quiz: any) => (
          <li key={quiz._id} className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <FaRocket className="text-success me-3 fs-4" />
              <div>
                <Link href={`/Courses/${cid}/Quizzes/${quiz._id}`} className="text-dark text-decoration-none fw-bold fs-5">
                  {quiz.title}
                </Link>
                <div className="text-muted small">
                  <span className="fw-bold">{getAvailabilityStatus(quiz)}</span> | &nbsp;
                  Due {new Date(quiz.dueDate).toLocaleDateString()} | &nbsp;
                  {quiz.points || 0} pts | &nbsp;
                  {quiz.questions ? quiz.questions.length : 0} Questions
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              {currentUser?.role !== "STUDENT" && (
                <>
                  <button onClick={() => handlePublishToggle(quiz)} className="btn btn-link text-decoration-none p-0 me-2">
                    {quiz.published ? <FaCheckCircle className="text-success fs-4" /> : <FaBan className="text-secondary fs-5" />}
                  </button>
                  
                  {/* Custom Dropdown */}
                  <div className="position-relative" ref={openDropdown === quiz._id ? dropdownRef : null}>
                    <button 
                      className="btn btn-light" 
                      type="button" 
                      onClick={() => toggleDropdown(quiz._id)}
                    >
                      <FaEllipsisV />
                    </button>
                    
                    {openDropdown === quiz._id && (
                      <ul 
                        className="dropdown-menu show" 
                        style={{ 
                          position: 'absolute', 
                          right: 0, 
                          top: '100%',
                          zIndex: 1000 
                        }}
                      >
                        <li>
                          <Link 
                            className="dropdown-item" 
                            href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                            onClick={() => setOpenDropdown(null)}
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleDeleteQuiz(quiz._id)}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handlePublishToggle(quiz)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}