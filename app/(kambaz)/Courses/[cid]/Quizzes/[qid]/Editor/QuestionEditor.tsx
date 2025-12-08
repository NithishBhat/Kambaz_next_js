"use client";
import { useState } from "react";
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

export default function QuestionEditor({ quiz, setQuiz }: { quiz: any; setQuiz: (q: any) => void }) {
  // Track which question is being edited (null = none, index = that question)
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  // Store original question for cancel functionality
  const [originalQuestion, setOriginalQuestion] = useState<any>(null);

  const totalPoints = quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0;

  const addQuestion = () => {
    const newQuestion = {
      title: "New Question",
      points: 1,
      question: "",
      type: "MULTIPLE_CHOICE",
      choices: [{ text: "", isCorrect: false }],
      correctAnswers: [],
    };
    const newQuestions = [...quiz.questions, newQuestion];
    setQuiz({ ...quiz, questions: newQuestions });
    // Auto-open new question in edit mode
    setEditingIndex(newQuestions.length - 1);
    setOriginalQuestion({ ...newQuestion });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setOriginalQuestion({ ...quiz.questions[index] });
  };

  const cancelEditing = () => {
    if (editingIndex !== null && originalQuestion) {
      // Restore original question
      const updatedQuestions = [...quiz.questions];
      updatedQuestions[editingIndex] = originalQuestion;
      const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + (parseInt(q.points) || 0), 0);
      setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
    }
    setEditingIndex(null);
    setOriginalQuestion(null);
  };

  const saveQuestion = () => {
    // Just close edit mode, changes are already in state
    setEditingIndex(null);
    setOriginalQuestion(null);
  };

  const updateQuestion = (index: number, updatedQuestion: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = updatedQuestion;
    const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + (parseInt(q.points) || 0), 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
  };

  const deleteQuestion = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    const updatedQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
    const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + (parseInt(q.points) || 0), 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
    if (editingIndex === index) {
      setEditingIndex(null);
      setOriginalQuestion(null);
    }
  };

  const getTrueFalseAnswer = (question: any): string | null => {
    if (question.choices && question.choices.length > 0 && question.choices[0].isCorrect) {
      return question.choices[0].text;
    }
    return null;
  };

  const getQuestionTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      "MULTIPLE_CHOICE": "Multiple Choice",
      "TRUE_FALSE": "True/False",
      "FILL_IN_THE_BLANK": "Fill in the Blank",
    };
    return labels[type] || type;
  };

  return (
    <div className="p-3">
      {/* Points Summary */}
      <div className="d-flex justify-content-end mb-3">
        <span className="fw-bold">Points: {totalPoints}</span>
      </div>

      {quiz.questions.length === 0 && (
        <div className="text-center text-muted mb-4 p-4 border rounded">
          <p>No questions yet. Click the button below to add one.</p>
        </div>
      )}

      {quiz.questions.map((question: any, index: number) => (
        <div key={index} className="border rounded mb-4 shadow-sm">
          {/* PREVIEW MODE */}
          {editingIndex !== index && (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">
                    <span className="text-muted me-2">Question {index + 1}:</span>
                    {question.title || "Untitled Question"}
                  </h6>
                  <small className="text-muted">
                    {getQuestionTypeLabel(question.type)} | {question.points || 0} pts
                  </small>
                  {question.question && (
                    <p className="mt-2 mb-0 text-secondary">{question.question.substring(0, 100)}{question.question.length > 100 ? "..." : ""}</p>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm" 
                    onClick={() => startEditing(index)}
                  >
                    <FaPencilAlt className="me-1" /> Edit
                  </button>
                  <button 
                    className="btn btn-outline-danger btn-sm" 
                    onClick={() => deleteQuestion(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EDIT MODE */}
          {editingIndex === index && (
            <div className="p-3 bg-light">
              {/* Header Row */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2 align-items-center flex-grow-1">
                  <input 
                    type="text" 
                    className="form-control fw-bold"
                    style={{ maxWidth: "300px" }}
                    placeholder="Question Title"
                    value={question.title}
                    onChange={(e) => updateQuestion(index, { ...question, title: e.target.value })}
                  />
                  <select 
                    className="form-select"
                    style={{ maxWidth: "180px" }}
                    value={question.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      let updated = { ...question, type: newType };
                      if (newType === "MULTIPLE_CHOICE") {
                        updated.choices = [{ text: "", isCorrect: false }];
                        updated.correctAnswers = [];
                      } else if (newType === "TRUE_FALSE") {
                        updated.choices = [];
                        updated.correctAnswers = [];
                      } else if (newType === "FILL_IN_THE_BLANK") {
                        updated.choices = [];
                        updated.correctAnswers = [""];
                      }
                      updateQuestion(index, updated);
                    }}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_IN_THE_BLANK">Fill In The Blank</option>
                  </select>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <label className="text-nowrap mb-0">pts:</label>
                  <input 
                    type="number" 
                    className="form-control"
                    style={{ width: "70px" }}
                    min="0"
                    value={question.points}
                    onChange={(e) => updateQuestion(index, { ...question, points: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-3">
                <label className="form-label fw-bold">Question:</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  placeholder="Enter your question text here..."
                  value={question.question}
                  onChange={(e) => updateQuestion(index, { ...question, question: e.target.value })}
                />
              </div>

              {/* MULTIPLE CHOICE */}
              {question.type === "MULTIPLE_CHOICE" && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Answers:</label>
                  <p className="text-muted small">Select the correct answer using the radio button.</p>
                  {(question.choices || []).map((choice: any, cIndex: number) => (
                    <div key={cIndex} className="input-group mb-2">
                      <div className="input-group-text bg-white">
                        <input 
                          type="radio" 
                          name={`mc-correct-${index}`}
                          checked={choice.isCorrect === true}
                          onChange={() => {
                            const newChoices = question.choices.map((c: any, i: number) => ({
                              ...c,
                              isCorrect: i === cIndex
                            }));
                            updateQuestion(index, { ...question, choices: newChoices });
                          }}
                        />
                      </div>
                      <span className="input-group-text bg-white">
                        {choice.isCorrect ? "Correct Answer" : "Possible Answer"}
                      </span>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="Enter answer text"
                        value={choice.text}
                        onChange={(e) => {
                          const newChoices = [...question.choices];
                          newChoices[cIndex] = { ...newChoices[cIndex], text: e.target.value };
                          updateQuestion(index, { ...question, choices: newChoices });
                        }}
                      />
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => {
                          const newChoices = question.choices.filter((_: any, i: number) => i !== cIndex);
                          updateQuestion(index, { ...question, choices: newChoices });
                        }}
                        disabled={question.choices.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="btn btn-link text-danger p-0 mt-1"
                    onClick={() => {
                      const newChoices = [...(question.choices || []), { text: "", isCorrect: false }];
                      updateQuestion(index, { ...question, choices: newChoices });
                    }}
                  >
                    + Add Another Answer
                  </button>
                </div>
              )}

              {/* TRUE / FALSE */}
              {question.type === "TRUE_FALSE" && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Answers:</label>
                  <p className="text-muted small">Select if True or False is the correct answer.</p>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name={`tf-answer-${index}`} 
                      id={`tf-true-${index}`}
                      checked={getTrueFalseAnswer(question) === "True"}
                      onChange={() => updateQuestion(index, { 
                        ...question, 
                        choices: [{ text: "True", isCorrect: true }] 
                      })}
                    />
                    <label className="form-check-label" htmlFor={`tf-true-${index}`}>True</label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name={`tf-answer-${index}`} 
                      id={`tf-false-${index}`}
                      checked={getTrueFalseAnswer(question) === "False"}
                      onChange={() => updateQuestion(index, { 
                        ...question, 
                        choices: [{ text: "False", isCorrect: true }] 
                      })}
                    />
                    <label className="form-check-label" htmlFor={`tf-false-${index}`}>False</label>
                  </div>
                </div>
              )}

              {/* FILL IN THE BLANK */}
              {question.type === "FILL_IN_THE_BLANK" && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Possible Correct Answers:</label>
                  <p className="text-muted small">Add all acceptable answers. Comparison is case-insensitive.</p>
                  {(question.correctAnswers || []).map((ans: string, aIndex: number) => (
                    <div key={aIndex} className="input-group mb-2">
                      <span className="input-group-text bg-white">Possible Answer</span>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="Enter a correct answer"
                        value={ans}
                        onChange={(e) => {
                          const newAns = [...question.correctAnswers];
                          newAns[aIndex] = e.target.value;
                          updateQuestion(index, { ...question, correctAnswers: newAns });
                        }}
                      />
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => {
                          const newAns = question.correctAnswers.filter((_: any, i: number) => i !== aIndex);
                          updateQuestion(index, { ...question, correctAnswers: newAns });
                        }}
                        disabled={question.correctAnswers.length <= 1}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button 
                    className="btn btn-link text-danger p-0 mt-1"
                    onClick={() => {
                      const newAns = [...(question.correctAnswers || []), ""];
                      updateQuestion(index, { ...question, correctAnswers: newAns });
                    }}
                  >
                    + Add Another Answer
                  </button>
                </div>
              )}

              {/* Cancel / Update Buttons */}
              <div className="d-flex justify-content-start gap-2 mt-4 pt-3 border-top">
                <button className="btn btn-secondary" onClick={cancelEditing}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={saveQuestion}>
                  Update Question
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Question Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={addQuestion}>
          <FaPlus className="me-1" /> New Question
        </button>
      </div>
    </div>
  );
}