import { useRef, useState } from "react";
import api from "../../src/services/api";
import "./StudentExcelUpload.css";
import sampleTemplate from "../../src/assets/studenttemplate.xlsx";

export default function StudentExcelUpload() {
  const inputRef = useRef();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const courseId = window.location.pathname.split("/").pop();

  const openPicker = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first");
      return;
    }

    if (!courseId) {
      setStatus("Invalid course ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus("Uploading...");

      const res = await api.post(
        `/admin/courses/${courseId}/students/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      setStatus("Students uploaded successfully!");
      setFile(null);
      setFileName("");
    } catch (err) {
      console.error(err);
      setStatus(
        err.response?.data?.message ||
          "Upload failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Downloads the sample template so admins know the exact column
  // format expected before uploading their own file.
  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = sampleTemplate;
    link.download = "student_upload_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="uploadCard">

      {/* HEADER */}
      <div className="uploadHeader">
        <h3>Student Upload</h3>
        <p>Upload Excel or CSV file to enroll students</p>
      </div>

      {/* FILE INPUT */}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleChange}
        hidden
      />

      {/* TEMPLATE DOWNLOAD */}
      <button
        type="button"
        className="templateBtn"
        onClick={handleDownloadTemplate}
      >
        ⬇ Download Sample Template
      </button>

      {/* BUTTONS */}
      <div className="uploadButtons">

        <button
          type="button"
          className="chooseBtn"
          onClick={openPicker}
        >
          Choose File
        </button>

        <button
          type="button"
          className="uploadBtn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>

      {/* FILE INFO */}
      <div className="fileInfo">
        {fileName ? (
          <span className="fileName">
            📄 {fileName}
          </span>
        ) : (
          <span className="noFile">
            No file selected
          </span>
        )}
      </div>

      {/* STATUS */}
      {status && (
        <div className="status">
          {status}
        </div>
      )}

      {/* HINT */}
      <div className="hint">
        Excel format: Name | Email | Phone Number
      </div>

    </div>
  );
}