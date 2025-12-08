"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import * as client from "../../client"; 
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Details");
  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
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
    dueDate: new Date().toISOString().slice(0, 16),
    availableDate: new Date().toISOString().slice(0, 16),
    untilDate: new Date().toISOString().slice(0, 16),
    published: false,
    points: 0,
    questions: [],
  });

  useEffect(() => {
    if (qid) {
      client.findQuizById(qid as string).then((data) => {
        const formatted = {
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : "",
          availableDate: data.availableDate ? new Date(data.availableDate).toISOString().slice(0, 16) : "",
          untilDate: data.untilDate ? new Date(data.untilDate).toISOString().slice(0, 16) : "",
        };
        setQuiz(formatted);
      });
    }
  }, [qid]);

  // Calculate total points from questions
  const calculateTotalPoints = () => {
    if (!quiz?.questions || quiz.questions.length === 0) return 0;
    return quiz.questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
  };

  const handleSave = async () => {
    const quizToSave = { ...quiz, points: calculateTotalPoints() };
    await client.updateQuiz(quizToSave);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const quizToSave = { ...quiz, points: calculateTotalPoints(), published: true };
    await client.updateQuiz(quizToSave);
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
      {/* Points display in top right */}
      <div className="d-flex justify-content-end mb-2">
        <span className="text-muted">
          Points: {calculateTotalPoints()} | {quiz.published ? "Published" : "Not Published"}
        </span>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === "Details" ? "active" : ""}`} 
            onClick={() => setActiveTab("Details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === "Questions" ? "active" : ""}`} 
            onClick={() => setActiveTab("Questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "Details" && (
        <div className="p-3 border border-top-0 rounded-bottom">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>

          {/* Description (WYSIWYG placeholder - using textarea) */}
          <div className="mb-3">
            <label className="form-label fw-bold">Quiz Instructions</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Quiz Description / Instructions"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>

          {/* Quiz Type */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Quiz Type</label>
            <div className="col-sm-9">
              <select
                className="form-select"
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>
          </div>

          {/* Assignment Group */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Assignment Group</label>
            <div className="col-sm-9">
              <select
                className="form-select"
                value={quiz.assignmentGroup}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
          </div>

          {/* Options Section */}
          <div className="border rounded p-3 mb-3">
            <h6 className="fw-bold mb-3">Options</h6>

            {/* Shuffle Answers */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.shuffleAnswers}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                id="shuffleAnswers" 
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">Shuffle Answers</label>
            </div>

            {/* Time Limit */}
            <div className="d-flex align-items-center mb-2">
              <input 
                className="form-check-input me-2" 
                type="checkbox" 
                checked={quiz.timeLimit > 0}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
                id="timeLimitCheck" 
              />
              <label className="form-check-label me-2" htmlFor="timeLimitCheck">Time Limit</label>
              {quiz.timeLimit > 0 && (
                <div className="d-flex align-items-center">
                  <input 
                    type="number" 
                    className="form-control form-control-sm"
                    style={{ width: "80px" }}
                    value={quiz.timeLimit}
                    onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })} 
                  />
                  <span className="ms-2">Minutes</span>
                </div>
              )}
            </div>

            {/* Multiple Attempts */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.multipleAttempts}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                id="multipleAttempts" 
              />
              <label className="form-check-label" htmlFor="multipleAttempts">Allow Multiple Attempts</label>
            </div>

            {/* How Many Attempts - only show if Multiple Attempts is enabled */}
            {quiz.multipleAttempts && (
              <div className="row mb-2 ms-4">
                <label className="col-sm-4 col-form-label">How Many Attempts</label>
                <div className="col-sm-3">
                  <input 
                    type="number" 
                    className="form-control form-control-sm"
                    min="1"
                    value={quiz.attempts || 1}
                    onChange={(e) => setQuiz({ ...quiz, attempts: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            )}

            {/* Show Correct Answers */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.showCorrectAnswers}
                onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                id="showCorrectAnswers" 
              />
              <label className="form-check-label" htmlFor="showCorrectAnswers">Show Correct Answers</label>
            </div>

            {/* One Question at a Time */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.oneQuestionAtATime}
                onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                id="oneQuestionAtATime" 
              />
              <label className="form-check-label" htmlFor="oneQuestionAtATime">One Question at a Time</label>
            </div>

            {/* Webcam Required */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.webcamRequired}
                onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                id="webcamRequired" 
              />
              <label className="form-check-label" htmlFor="webcamRequired">Webcam Required</label>
            </div>

            {/* Lock Questions After Answering */}
            <div className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={quiz.lockQuestionsAfterAnswering}
                onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                id="lockQuestions" 
              />
              <label className="form-check-label" htmlFor="lockQuestions">Lock Questions After Answering</label>
            </div>
          </div>

          {/* Access Code */}
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Access Code</label>
            <div className="col-sm-9">
              <input 
                type="text" 
                className="form-control"
                placeholder="Leave blank for no access code"
                value={quiz.accessCode || ""}
                onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              />
            </div>
          </div>

          {/* Assign Section - Dates */}
          <div className="border p-3 rounded mb-3">
            <h6 className="fw-bold mb-3">Assign</h6>

            {/* Assign to - Static display (not editable per requirements) */}
            <div className="mb-3">
              <label className="form-label fw-bold">Assign to</label>
              <input 
                type="text" 
                className="form-control"
                value="Everyone"
                disabled
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Due</label>
              <input 
                type="datetime-local" 
                className="form-control"
                value={quiz.dueDate}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
            </div>

            <div className="row">
              <div className="col-6">
                <label className="form-label fw-bold">Available from</label>
                <input 
                  type="datetime-local" 
                  className="form-control"
                  value={quiz.availableDate}
                  onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold">Until</label>
                <input 
                  type="datetime-local" 
                  className="form-control"
                  value={quiz.untilDate}
                  onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Questions" && (
        <QuestionEditor quiz={quiz} setQuiz={setQuiz} />
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2 mb-5">
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
          Cancel
        </Link>
        <button onClick={handleSaveAndPublish} className="btn btn-secondary">
          Save & Publish
        </button>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}