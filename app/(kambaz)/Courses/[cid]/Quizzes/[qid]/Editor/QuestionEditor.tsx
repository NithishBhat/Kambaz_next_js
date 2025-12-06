"use client";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function QuestionEditor({ quiz, setQuiz }: { quiz: any; setQuiz: (q: any) => void }) {
  
  const addQuestion = () => {
    const newQuestion = {
      title: "New Question",
      points: 0,
      question: "",
      type: "MULTIPLE_CHOICE",
      choices: [],
      correctAnswers: [],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (index: number, updatedQuestion: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = updatedQuestion;
    const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + (parseInt(q.points) || 0), 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
    const totalPoints = updatedQuestions.reduce((sum: number, q: any) => sum + (parseInt(q.points) || 0), 0);
    setQuiz({ ...quiz, questions: updatedQuestions, points: totalPoints });
  };

  // Helper to get the correct answer for TRUE_FALSE
  const getTrueFalseAnswer = (question: any): string | null => {
    if (question.choices && question.choices.length > 0 && question.choices[0].isCorrect) {
      return question.choices[0].text;
    }
    return null;
  };

  return (
    <div className="p-3">
      {quiz.questions.length === 0 && (
        <div className="text-center text-muted mb-4">
          <i>No questions yet. Click below to add one.</i>
        </div>
      )}

      {quiz.questions.map((question: any, index: number) => (
        <div key={index} className="border rounded mb-4 p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2 align-items-center">
              <input 
                type="text" 
                className="form-control form-control-sm fw-bold"
                placeholder="Question Title"
                value={question.title}
                onChange={(e) => updateQuestion(index, { ...question, title: e.target.value })}
              />
              <select 
                className="form-select form-select-sm"
                value={question.type}
                onChange={(e) => {
                  // Reset choices/answers when type changes
                  const newType = e.target.value;
                  let updated = { ...question, type: newType };
                  if (newType === "MULTIPLE_CHOICE") {
                    updated.choices = [];
                    updated.correctAnswers = [];
                  } else if (newType === "TRUE_FALSE") {
                    updated.choices = [];
                    updated.correctAnswers = [];
                  } else if (newType === "FILL_IN_THE_BLANK") {
                    updated.choices = [];
                    updated.correctAnswers = [];
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
              <label className="text-nowrap small">pts:</label>
              <input 
                type="number" 
                className="form-control form-control-sm"
                style={{ width: "60px" }}
                value={question.points}
                onChange={(e) => updateQuestion(index, { ...question, points: parseInt(e.target.value) || 0 })}
              />
              <button className="btn btn-outline-danger btn-sm" onClick={() => deleteQuestion(index)}>
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Description / Question Text</label>
            <textarea 
              className="form-control" 
              rows={3}
              value={question.question}
              onChange={(e) => updateQuestion(index, { ...question, question: e.target.value })}
            />
          </div>

          {/* 1. MULTIPLE CHOICE */}
          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              <label className="form-label text-muted small">Choices (Select the correct answer)</label>
              {(question.choices || []).map((choice: any, cIndex: number) => (
                <div key={cIndex} className="input-group mb-2">
                  <div className="input-group-text">
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
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Enter choice text"
                    value={choice.text}
                    onChange={(e) => {
                      const newChoices = [...question.choices];
                      newChoices[cIndex] = { ...newChoices[cIndex], text: e.target.value };
                      updateQuestion(index, { ...question, choices: newChoices });
                    }}
                  />
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const newChoices = question.choices.filter((_: any, i: number) => i !== cIndex);
                      updateQuestion(index, { ...question, choices: newChoices });
                    }}
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

          {/* 2. TRUE / FALSE */}
          {question.type === "TRUE_FALSE" && (
            <div className="mt-3">
              <label className="form-label text-muted small">Correct Answer</label>
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

          {/* 3. FILL IN THE BLANK */}
          {question.type === "FILL_IN_THE_BLANK" && (
            <div>
              <label className="form-label text-muted small">Possible Correct Answers</label>
              {(question.correctAnswers || []).map((ans: string, aIndex: number) => (
                <div key={aIndex} className="input-group mb-2">
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
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const newAns = question.correctAnswers.filter((_: any, i: number) => i !== aIndex);
                      updateQuestion(index, { ...question, correctAnswers: newAns });
                    }}
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
        </div>
      ))}

      <div className="text-center">
        <button className="btn btn-secondary" onClick={addQuestion}>
          <FaPlus /> New Question
        </button>
      </div>
    </div>
  );
}