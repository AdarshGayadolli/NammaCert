import CourseInfoCard from "../../components/Admin/CourseInfoCard";
import StudentExcelUpload from "../../components/Admin/StudentExcelUpload";

export default function CourseDetails() {
  const handleFileSelect = (file) => {
    console.log("Selected Excel:", file);

    // Upload API will be added here later
  };

  return (
    <div style={{ padding: "30px" }}>
      <CourseInfoCard />

      <StudentExcelUpload onFileSelect={handleFileSelect} />
    </div>
  );
}