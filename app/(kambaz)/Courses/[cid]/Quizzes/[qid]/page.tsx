"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPencilAlt, FaCheckCircle, FaBan } from "react-icons/fa";
import Link from "next/link";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (qid) client.findQuizById(qid as string).then(setQuiz);
  }, [qid]);

  const handlePublishToggle = async () => {
    if (!quiz) return;
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    setQuiz(updatedQuiz);
  };

  // Helper to format quiz type for display
  const formatQuizType = (type: string) => {
    const types: { [key: string]: string } = {
      "GRADED_QUIZ": "Graded Quiz",
      "PRACTICE_QUIZ": "Practice Quiz",
      "GRADED_SURVEY": "Graded Survey",
      "UNGRADED_SURVEY": "Ungraded Survey",
    };
    return types[type] || type;
  };

  // Helper to format assignment group for display
  const formatAssignmentGroup = (group: string) => {
    const groups: { [key: string]: string } = {
      "QUIZZES": "Quizzes",
      "EXAMS": "Exams",
      "ASSIGNMENTS": "Assignments",
      "PROJECT": "Project",
    };
    return groups[group] || group;
  };

  // Calculate total points from questions
  const calculateTotalPoints = () => {
    if (!quiz?.questions || quiz.questions.length === 0) {
      return quiz?.points || 0;
    }
    return quiz.questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
  };

  if (!quiz) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3 gap-2">
        
        {/* FACULTY VIEW */}
        {currentUser?.role === "FACULTY" && (
          <>
            <button 
              onClick={handlePublishToggle} 
              className={`btn ${quiz.published ? "btn-success" : "btn-secondary"}`}
            >
              {quiz.published ? <><FaCheckCircle className="me-1" /> Published</> : <><FaBan className="me-1" /> Unpublished</>}
            </button>
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`} className="btn btn-light border">
              Preview
            </Link>
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="btn btn-light border">
              <FaPencilAlt className="me-1" /> Edit
            </Link>
          </>
        )}

        {/* STUDENT VIEW */}
        {currentUser?.role === "STUDENT" && (
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`} className="btn btn-danger">
            Start Quiz
          </Link>
        )}
      </div>

      <hr />
      <h2>{quiz.title}</h2>
      
      <div className="row mt-4">
        <div className="col-md-8">
          <dl className="row">
            <dt className="col-sm-4 text-end">Quiz Type</dt>
            <dd className="col-sm-8">{formatQuizType(quiz.quizType)}</dd>

            <dt className="col-sm-4 text-end">Points</dt>
            <dd className="col-sm-8">{calculateTotalPoints()}</dd>

            <dt className="col-sm-4 text-end">Assignment Group</dt>
            <dd className="col-sm-8">{formatAssignmentGroup(quiz.assignmentGroup)}</dd>

            <dt className="col-sm-4 text-end">Shuffle Answers</dt>
            <dd className="col-sm-8">{quiz.shuffleAnswers ? "Yes" : "No"}</dd>

            <dt className="col-sm-4 text-end">Time Limit</dt>
            <dd className="col-sm-8">{quiz.timeLimit} Minutes</dd>

            <dt className="col-sm-4 text-end">Multiple Attempts</dt>
            <dd className="col-sm-8">{quiz.multipleAttempts ? "Yes" : "No"}</dd>

            {quiz.multipleAttempts && (
              <>
                <dt className="col-sm-4 text-end">How Many Attempts</dt>
                <dd className="col-sm-8">{quiz.attempts || 1}</dd>
              </>
            )}

            <dt className="col-sm-4 text-end">Show Correct Answers</dt>
            <dd className="col-sm-8">{quiz.showCorrectAnswers ? "Yes" : "No"}</dd>

            <dt className="col-sm-4 text-end">Access Code</dt>
            <dd className="col-sm-8">{quiz.accessCode || "None"}</dd>

            <dt className="col-sm-4 text-end">One Question at a Time</dt>
            <dd className="col-sm-8">{quiz.oneQuestionAtATime ? "Yes" : "No"}</dd>

            <dt className="col-sm-4 text-end">Webcam Required</dt>
            <dd className="col-sm-8">{quiz.webcamRequired ? "Yes" : "No"}</dd>

            <dt className="col-sm-4 text-end">Lock Questions After Answering</dt>
            <dd className="col-sm-8">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</dd>
          </dl>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Due</th>
                <th>For</th>
                <th>Available from</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "—"}</td>
                <td>Everyone</td>
                <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "—"}</td>
                <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}