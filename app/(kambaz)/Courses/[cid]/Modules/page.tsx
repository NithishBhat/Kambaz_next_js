"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModulesControlButton from "./ModulesControlButton";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState } from "react";

// 1. Import Redux hooks and actions
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();

  // 2. Get modules from Redux store and initialize dispatch
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  // 3. Keep local state ONLY for the new module name input
  const [moduleName, setModuleName] = useState("");

  // 4. Local state functions for modules are removed

  return (
    <div>
      {/* 5. Pass dispatch-wrapped functions to controls */}
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {/* 6. Inline editing now dispatches updateModule */}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateModule({ ...module, editing: false })
                        );
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                {/* 7. Pass dispatch-wrapped functions to buttons */}
                <ModulesControlButton
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
