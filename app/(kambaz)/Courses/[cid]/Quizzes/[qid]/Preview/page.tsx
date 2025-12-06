"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux"; 
import { FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [existingAttempt, setExistingAttempt] = useState<any>(null);

  useEffect(() => {
    if (qid) {
      client.findQuizById(qid as string).then(setQuiz);
      if (currentUser) {
        client.findAttempts(qid as string, currentUser._id).then((attempts) => {
          if (attempts && attempts.length > 0) {
            const lastAttempt = attempts[0]; 
            setExistingAttempt(lastAttempt);
            setAnswers(lastAttempt.answers || {});
            setScore(lastAttempt.score);
            setSubmitted(true);
          }
        });
      }
    }
  }, [qid, currentUser]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const submitQuiz = async () => {
    let totalPoints = 0;
    quiz.questions.forEach((q: any) => {
      const questionId = q._id || q.title;
      const studentAnswer = answers[questionId]; 
      let isCorrect = false;

      if (q.type === "MULTIPLE_CHOICE") {
        const correctChoice = q.choices?.find((c: any) => c.isCorrect);
        if (correctChoice && studentAnswer === correctChoice.text) isCorrect = true;
      } else if (q.type === "TRUE_FALSE") {
        // For TRUE_FALSE, choices array has single item with the correct answer
        const correctAnswer = q.choices?.[0]?.text;
        if (studentAnswer === correctAnswer) isCorrect = true;
      } else if (q.type === "FILL_IN_THE_BLANK") {
        if (q.correctAnswers?.some((ans: string) => 
          ans?.trim().toLowerCase() === studentAnswer?.trim().toLowerCase()
        )) isCorrect = true;
      }

      if (isCorrect) totalPoints += parseInt(q.points) || 0;
    });

    setScore(totalPoints);
    setSubmitted(true);

    if (currentUser) {
      await client.submitAttempt(qid as string, {
        score: totalPoints,
        answers: answers,
        user: currentUser._id
      });
    }
  };

  if (!quiz) return <div>Loading Quiz...</div>;

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="container mt-4">
        <h2>{quiz.title}</h2>
        <div className="alert alert-warning">
          This quiz has no questions yet.
          {currentUser?.role === "FACULTY" && (
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="ms-2 fw-bold text-dark">
              Edit Quiz to add questions.
            </Link>
          )}
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const questionId = question._id || question.title;

  // Get correct answer for TRUE_FALSE (stored as single choice in array)
  const getTrueFalseCorrectAnswer = () => {
    return question.choices?.[0]?.text || null;
  };

  return (
    <div className="container mt-4">
      <h2>{quiz.title}</h2>
      
      {existingAttempt ? (
        <div className="alert alert-info">
          <strong>You have already taken this quiz.</strong> Shown below are your results.
        </div>
      ) : currentUser?.role === "FACULTY" ? (
        <div className="alert alert-warning d-flex align-items-center">
          <FaExclamationCircle className="me-2" />
          <span>This is a preview of the published version of the quiz</span>
        </div>
      ) : (
        <div className="alert alert-primary d-flex align-items-center">
          <FaExclamationCircle className="me-2" />
          <span>Answer each question and click Submit Quiz when finished</span>
        </div>
      )}

      <div className="d-flex justify-content-between p-3 border-bottom mb-4 bg-light">
        <div>
          <strong>Started:</strong> {existingAttempt ? new Date(existingAttempt.date).toLocaleString() : new Date().toLocaleString()}
        </div>
        <div>
          <h3><strong>Score:</strong> {submitted ? `${score} / ${quiz.points}` : `? / ${quiz.points}`}</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center bg-light">
              <h5 className="m-0">{question.title}</h5>
              <span className="badge bg-secondary">{question.points} pts</span>
            </div>
            <div className="card-body">
              <p className="card-text mb-4">{question.question}</p>

              {/* MULTIPLE CHOICE */}
              {question.type === "MULTIPLE_CHOICE" && (
                <div className="list-group">
                  {(question.choices || []).map((choice: any, idx: number) => {
                    const isSelected = answers[questionId] === choice.text;
                    let itemClass = "list-group-item list-group-item-action";
                    if (submitted) {
                      if (choice.isCorrect) itemClass += " bg-success text-white"; 
                      else if (isSelected && !choice.isCorrect) itemClass += " bg-danger text-white"; 
                    }
                    return (
                      <button 
                        key={idx}
                        className={itemClass}
                        onClick={() => !submitted && handleAnswerChange(questionId, choice.text)}
                        disabled={submitted}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <span>{choice.text}</span>
                          {submitted && choice.isCorrect && <FaCheckCircle />}
                          {submitted && isSelected && !choice.isCorrect && <FaTimesCircle />}
                        </div>
                      </button>
                    );
                  })}
                  {(!question.choices || question.choices.length === 0) && (
                    <div className="alert alert-warning">No choices configured for this question.</div>
                  )}
                </div>
              )}

              {/* TRUE/FALSE */}
              {question.type === "TRUE_FALSE" && (
                <div className="list-group">
                  {["True", "False"].map((optionValue, idx) => {
                    const isSelected = answers[questionId] === optionValue;
                    const correctAnswer = getTrueFalseCorrectAnswer();
                    const isThisChoiceCorrect = correctAnswer === optionValue;

                    let itemClass = "list-group-item list-group-item-action";
                    if (submitted) {
                      if (isThisChoiceCorrect) itemClass += " bg-success text-white"; 
                      else if (isSelected && !isThisChoiceCorrect) itemClass += " bg-danger text-white"; 
                    }

                    return (
                      <button 
                        key={idx}
                        className={itemClass}
                        onClick={() => !submitted && handleAnswerChange(questionId, optionValue)}
                        disabled={submitted}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <span>{optionValue}</span>
                          {submitted && isThisChoiceCorrect && <FaCheckCircle />}
                          {submitted && isSelected && !isThisChoiceCorrect && <FaTimesCircle />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* FILL IN THE BLANK */}
              {question.type === "FILL_IN_THE_BLANK" && (
                <div>
                  <input 
                    type="text" 
                    className={`form-control ${submitted ? "is-valid" : ""}`}
                    placeholder="Type your answer here"
                    value={answers[questionId] || ""}
                    onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                    disabled={submitted}
                  />
                  {submitted && question.correctAnswers && question.correctAnswers.length > 0 && (
                    <div className="text-success mt-2">
                      <strong>Correct Answers: </strong> 
                      {question.correctAnswers.join(", ")}
                    </div>
                  )}
                </div>
              )}

              {/* Fallback for unknown question types */}
              {!["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"].includes(question.type) && (
                <div className="alert alert-warning">
                  Unknown question type: {question.type}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button 
              className="btn btn-secondary"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              <FaArrowLeft /> Previous
            </button>

            {!isLastQuestion ? (
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next <FaArrowRight />
              </button>
            ) : (
              !submitted && (
                <button className="btn btn-primary" onClick={submitQuiz}>
                  Submit Quiz
                </button>
              )
            )}
          </div>
          
          {currentUser?.role === "FACULTY" && (
            <div className="mt-5 bg-light p-3 border text-center">
              <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="btn btn-light border">
                <span className="me-2">✏️</span> Keep Editing This Quiz
              </Link>
            </div>
          )}
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Questions</div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2">
                {quiz.questions.map((q: any, index: number) => {
                  const qId = q._id || q.title;
                  const isAnswered = answers[qId] !== undefined && answers[qId] !== "";
                  let btnClass = "btn-outline-secondary";
                  if (currentQuestion === index) btnClass = "btn-primary";
                  else if (isAnswered) btnClass = "btn-secondary";
                  return (
                    <button 
                      key={index} 
                      className={`btn ${btnClass} btn-sm`} 
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {submitted && isAnswered ? "✓" : index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}