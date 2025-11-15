export type Assignment = {
  id: string;
  title: string;
  course: string;
  // ... other properties like points, due date, etc.
};

type State = {
  assignments: Assignment[];
};

type Action =
  | { type: "SET_ASSIGNMENTS"; payload: Assignment[] }
  | { type: "ADD_ASSIGNMENT"; payload: Assignment }
  | { type: "UPDATE_ASSIGNMENT"; payload: Assignment }
  | { type: "DELETE_ASSIGNMENT"; payload: string }; // payload is the assignment ID

export const assignmentsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ASSIGNMENTS":
      return { ...state, assignments: action.payload };

    case "ADD_ASSIGNMENT":
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };

    case "UPDATE_ASSIGNMENT":
      return {
        ...state,
        assignments: state.assignments.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };

    case "DELETE_ASSIGNMENT":
      return {
        ...state,
        assignments: state.assignments.filter(
          (a) => a.id !== action.payload
        ),
      };

    default:
      return state;
  }
};