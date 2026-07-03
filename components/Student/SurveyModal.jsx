import { useEffect, useState } from "react";
import api from "../../src/services/api";
import "./SurveyModal.css";

export default function SurveyModal({
  open,
  courseId,
  course,
  onClose,
  onSurveyCompleted,
}) {
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && courseId) {
      fetchSurvey();
    }
  }, [open, courseId]);

  const fetchSurvey = async () => {
    try {
      setLoading(true);
      setError("");
      setQuestions([]);
      setAnswers({});

      const response = await api.get(
        `/student/courses/${courseId}/survey`
      );

      console.log("Survey Response:", response.data);

      const data = response.data.data || response.data;

      setSurvey(data);

      setQuestions(
        data.questions ||
          data.surveyQuestions ||
          data.data ||
          []
      );
    } catch (err) {
      console.error(err);

      // Survey already completed
      if (err.response?.status === 409) {
        alert("Survey already completed.");

        if (onSurveyCompleted) {
          onSurveyCompleted(courseId);
        }

        onClose();
        return;
      }

      setError(
        err?.response?.data?.message ||
          "Unable to load survey."
      );
    } finally {
      setLoading(false);
    }
  };

  const getQuestionId = (question, index) =>
    question._id ||
    question.id ||
    question.questionId ||
    index;

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleTextChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Questions:", questions);
      console.log("Current answers state:", answers);

      // Validate answers
      for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        const questionId = getQuestionId(question, index);

        if (
          answers[questionId] === undefined ||
          answers[questionId] === ""
        ) {
          console.log(
            "Validation failed on question:",
            index,
            "expected key:",
            questionId,
            "question object:",
            question,
            "answers so far:",
            answers
          );
          alert("Please answer all questions.");
          return;
        }
      }

      // Generic payload (change if backend expects another format)
      const payload = {
        answers: questions.map((question, index) => {
          const questionId = getQuestionId(question, index);

          return {
            questionId,
            answer: answers[questionId],
          };
        }),
      };

      console.log(
        "About to POST survey ->",
        `/student/courses/${courseId}/survey`,
        payload
      );

      const response = await api.post(
        `/student/courses/${courseId}/survey`,
        payload
      );

      console.log("Survey Submit Response:", response.data);

      alert(
        response.data?.message ||
          "Survey submitted successfully."
      );

      if (onSurveyCompleted) {
        onSurveyCompleted(courseId);
      }

      onClose();
    } catch (err) {
      console.error("Survey submit error:", err);

      if (err.response?.status === 409) {
        alert("Survey already submitted.");

        if (onSurveyCompleted) {
          onSurveyCompleted(courseId);
        }

        onClose();
        return;
      }

      alert(
        err.response?.data?.message ||
          "Failed to submit survey."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="survey-overlay">
      <div className="survey-modal">

        <div className="survey-header">
          <h2>Course Survey</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {loading && (
          <div className="loading">
            Loading Survey...
          </div>
        )}

        {!loading && error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="course-title">
              <h3>
                {course?.title ||
                  survey?.title ||
                  "Course Survey"}
              </h3>

              <p>
                <strong>Course ID:</strong>{" "}
                {courseId}
              </p>

              <p>
                <strong>Course Type:</strong>{" "}
                {course?.courseType ||
                  survey?.courseType ||
                  "-"}
              </p>
            </div>

            <div className="survey-body">
              {questions.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    fontWeight: "600",
                  }}
                >
                  No Survey Available
                </div>
              ) : (
                questions.map((question, index) => {
                  const questionId = getQuestionId(question, index);

                  const questionText =
                    question.question ||
                    question.title ||
                    question.text ||
                    `Question ${index + 1}`;

                  const options =
                    question.options ||
                    question.choices ||
                    [];

                  return (
                    <div
                      className="question-card"
                      key={questionId}
                    >
                      <label className="question-title">
                        {index + 1}. {questionText}
                      </label>

                      {options.length > 0 ? (
                        options.map((option, i) => (
                          <label
                            className="radio-option"
                            key={i}
                          >
                            <input
                              type="radio"
                              name={`question-${questionId}`}
                              checked={
                                answers[
                                  questionId
                                ] === option
                              }
                              onChange={() =>
                                handleOptionChange(
                                  questionId,
                                  option
                                )
                              }
                            />

                            {option}
                          </label>
                        ))
                      ) : (
                        <textarea
                          rows={4}
                          placeholder="Enter your answer..."
                          value={
                            answers[
                              questionId
                            ] || ""
                          }
                          onChange={(e) =>
                            handleTextChange(
                              questionId,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="survey-footer">
              <button
                className="cancel-btn"
                onClick={onClose}
              >
                Close
              </button>

              {questions.length > 0 && (
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                >
                  Submit Survey
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}