"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaRocket, FaBan } from "react-icons/fa";
import Link from "next/link";
import * as client from "./client";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: any) => state.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get Current User
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    if (cid) {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes));
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleCreateQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      description: "New Quiz Description",
      points: 0,
      dueDate: new Date().toISOString(),
      availableDate: new Date().toISOString(),
      published: false,
    };
    const quiz = await client.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(quiz));
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleDeleteQuiz = async (qid: string) => {
    await client.deleteQuiz(qid);
    dispatch(deleteQuiz(qid));
  };

  const handlePublishToggle = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    if (now > untilDate) return "Closed";
    if (now >= availableDate && now <= untilDate) return "Available";
    return `Not available until ${availableDate.toLocaleDateString()}`;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input type="text" className="form-control w-25" placeholder="Search for Quiz" />
        
        {/* HIDE + QUIZ BUTTON FOR STUDENTS */}
        {currentUser?.role !== "STUDENT" && (
            <div>
                <button className="btn btn-danger me-2" onClick={handleCreateQuiz}>
                    <FaPlus className="me-1" /> Quiz
                </button>
                <button className="btn btn-secondary"><FaEllipsisV /></button>
            </div>
        )}
      </div>

      <hr />
      <ul className="list-group rounded-0">
        <li className="list-group-item list-group-item-secondary d-flex align-items-center justify-content-between">
            <div><FaEllipsisV className="me-2"/> <strong>Assignment Quizzes</strong></div>
        </li>

        {quizzes.length === 0 && (
            <div className="text-center p-5">
                <h4>No quizzes available</h4>
            </div>
        )}

        {quizzes.map((quiz: any) => (
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
              {/* HIDE EDIT CONTROLS FOR STUDENTS */}
              {currentUser?.role !== "STUDENT" && (
                <>
                  <button onClick={() => handlePublishToggle(quiz)} className="btn btn-link text-decoration-none">
                    {quiz.published ? <FaCheckCircle className="text-success fs-4" /> : <FaBan className="text-danger fs-5" />}
                  </button>
                  <div className="dropdown ms-3">
                    <button className="btn btn-light" type="button" data-bs-toggle="dropdown"><FaEllipsisV /></button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href={`/Courses/${cid}/Quizzes/${quiz._id}`}>Edit</Link></li>
                      <li><button className="dropdown-item" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button></li>
                      <li><button className="dropdown-item" onClick={() => handlePublishToggle(quiz)}>{quiz.published ? "Unpublish" : "Publish"}</button></li>
                    </ul>
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