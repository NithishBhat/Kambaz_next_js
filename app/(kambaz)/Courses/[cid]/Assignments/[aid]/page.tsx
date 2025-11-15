import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Assignment } from "../../reducer"; // Adjust path

// Assume state and dispatch are passed via Context or props
// This component would be wrapped by a provider in a real app
export default function AssignmentEditor({ state, dispatch }: any) {
  const router = useRouter();
  const { aid } = useParams(); // Gets the [aid] from the URL
  const isCreating = aid === "new";

  const [formData, setFormData] = useState<Partial<Assignment>>({
    title: "New Assignment",
    points: 100,
    // ... other defaults
  });

  // Effect to load assignment data if we are editing
  useEffect(() => {
    if (!isCreating && aid) {
      const assignment = state.assignments.find((a: Assignment) => a.id === aid);
      if (assignment) {
        setFormData(assignment);
      }
    }
  }, [aid, isCreating, state.assignments]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isCreating) {
      dispatch({
        type: "ADD_ASSIGNMENT",
        payload: { ...formData, id: new Date().getTime().toString() }, // Create new ID
      });
    } else {
      dispatch({ type: "UPDATE_ASSIGNMENT", payload: formData });
    }
    router.push("/Courses/1234/Assignments"); // Navigate back to list
  };

  // If a student tries to access this page, block them.
  // const userRole = useUserRole();
  // if (userRole === "student") {
  //   router.push("/Courses/1234/Assignments");
  //   return null;
  // }

  return (
    <div id="wd-assignments-editor">
      <form onSubmit={handleSubmit}>
        <label htmlFor="wd-name">
          <h3>Assignment Name</h3>
        </label>
        <input
          id="wd-name"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
        {/* ... your other form fields (points, textarea, etc.) ... */}
        {/* <label htmlFor="wd-points">Points</label>
        <input
          id="wd-points"
          name="points"
          value={formData.points || 100}
          onChange={handleChange}
        /> */}

        <hr />
        <button type="button" onClick={() => router.push("/Courses/1234/Assignments")}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}