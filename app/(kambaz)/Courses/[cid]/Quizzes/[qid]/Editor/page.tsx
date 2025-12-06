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
        }
        setQuiz(formatted);
      });
    }
  }, [qid]);

  const handleSave = async () => {
    await client.updateQuiz(quiz);
    // FIX: Removed /Kambaz
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz({ ...quiz, published: true });
    // FIX: Removed /Kambaz
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Quiz Description"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>
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
          <div className="row mb-3">
            <div className="col-sm-3"></div>
            <div className="col-sm-9">
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={quiz.shuffleAnswers}
                        onChange={(e) => setQuiz({...quiz, shuffleAnswers: e.target.checked})}
                        id="shuffle" 
                    />
                    <label className="form-check-label" htmlFor="shuffle">Shuffle Answers</label>
                </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-3 col-form-label text-end">Time Limit (Minutes)</label>
            <div className="col-sm-2">
                <input 
                    type="number" 
                    className="form-control"
                    value={quiz.timeLimit}
                    onChange={(e) => setQuiz({...quiz, timeLimit: parseInt(e.target.value)})} 
                />
            </div>
          </div>
          <div className="border p-3 rounded mb-3">
             <h5>Assign</h5>
             <div className="mb-2">
                <label className="form-label fw-bold">Due</label>
                <input 
                    type="datetime-local" 
                    className="form-control"
                    value={quiz.dueDate}
                    onChange={(e) => setQuiz({...quiz, dueDate: e.target.value})}
                />
             </div>
             <div className="row">
                <div className="col-6">
                    <label className="form-label fw-bold">Available from</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        value={quiz.availableDate}
                        onChange={(e) => setQuiz({...quiz, availableDate: e.target.value})}
                    />
                </div>
                <div className="col-6">
                    <label className="form-label fw-bold">Until</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        value={quiz.untilDate}
                        onChange={(e) => setQuiz({...quiz, untilDate: e.target.value})}
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
        {/* FIX: Removed /Kambaz */}
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