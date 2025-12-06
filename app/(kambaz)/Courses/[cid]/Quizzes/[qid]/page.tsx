"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import Redux
import { FaPencilAlt, FaCheckCircle, FaBan } from "react-icons/fa";
import Link from "next/link";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get User
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

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3 gap-2">
        
        {/* FACULTY VIEW */}
        {currentUser?.role === "FACULTY" && (
            <>
                <button onClick={handlePublishToggle} className={`btn ${quiz.published ? "btn-success" : "btn-secondary"}`}>
                    {quiz.published ? <><FaCheckCircle /> Published</> : <><FaBan /> Unpublished</>}
                </button>
                <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`} className="btn btn-light border">
                    Preview
                </Link>
                <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="btn btn-light border">
                    <FaPencilAlt /> Edit
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
      <h1>{quiz.title}</h1>
      
      <div className="row mt-4">
        <div className="col-md-8">
            <dl className="row">
                <dt className="col-sm-4 text-end">Quiz Type</dt>
                <dd className="col-sm-8">{quiz.quizType}</dd>
                <dt className="col-sm-4 text-end">Points</dt>
                <dd className="col-sm-8">{quiz.points}</dd>
                <dt className="col-sm-4 text-end">Assignment Group</dt>
                <dd className="col-sm-8">{quiz.assignmentGroup}</dd>
                <dt className="col-sm-4 text-end">Shuffle Answers</dt>
                <dd className="col-sm-8">{quiz.shuffleAnswers ? "Yes" : "No"}</dd>
                <dt className="col-sm-4 text-end">Time Limit</dt>
                <dd className="col-sm-8">{quiz.timeLimit} Minutes</dd>
                <dt className="col-sm-4 text-end">Multiple Attempts</dt>
                <dd className="col-sm-8">{quiz.multipleAttempts ? "Yes" : "No"}</dd>
                <dt className="col-sm-4 text-end">View Responses</dt>
                <dd className="col-sm-8">Always</dd>
                <dt className="col-sm-4 text-end">Show Correct Answers</dt>
                <dd className="col-sm-8">{quiz.showCorrectAnswers ? "Yes" : "No"}</dd>
                <dt className="col-sm-4 text-end">One Question at a Time</dt>
                <dd className="col-sm-8">{quiz.oneQuestionAtATime ? "Yes" : "No"}</dd>
                <dt className="col-sm-4 text-end">Require Webcam</dt>
                <dd className="col-sm-8">{quiz.webcamRequired ? "Yes" : "No"}</dd>
                <dt className="col-sm-4 text-end">Lock Questions</dt>
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
                        <td>{new Date(quiz.dueDate).toLocaleString()}</td>
                        <td>Everyone</td>
                        <td>{new Date(quiz.availableDate).toLocaleString()}</td>
                        <td>{new Date(quiz.untilDate).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}