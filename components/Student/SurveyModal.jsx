import { useEffect, useState } from "react";
import api from "../../src/services/api";
import "./SurveyModal.css";

export default function SurveyModal({
  open,
  courseId,
  course,
  onClose,
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

      setError(
        err?.response?.data?.message ||
          "Unable to load survey."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (
    questionId,
    option
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleTextChange = (
    questionId,
    value
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Course :", courseId);
      console.log("Answers :", answers);

      // Submission API will be added later

      alert(
        "Survey Submitted Successfully."
      );

      onClose();
    } catch (err) {
      console.error(err);

      alert("Failed to submit survey.");
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

        {error && (
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
                <strong>Course ID :</strong>{" "}
                {courseId}
              </p>

              <p>
                <strong>Course Type :</strong>{" "}
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
                    fontWeight: "500",
                  }}
                >
                  No Survey Available
                </div>

              ) : (

                questions.map(
                  (question, index) => {

                    const questionId =
                      question._id ||
                      question.id ||
                      index;

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

                          {index + 1}.{" "}

                          {question.question ||
                            question.title ||
                            question.text}

                        </label>

                        {options.length > 0 ? (

                          options.map(
                            (option, i) => (

                              <label
                                key={i}
                                className="radio-option"
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

                            )
                          )

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
                  }
                )

              )}

            </div>

            <div className="survey-footer">

              <button
                className="cancel-btn"
                onClick={onClose}
              >
                Close
              </button>

              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit Survey
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}