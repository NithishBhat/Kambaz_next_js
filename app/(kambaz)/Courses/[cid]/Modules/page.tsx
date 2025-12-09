"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModulesControlButton from "./ModulesControlButton";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";

import { addModule, editModule, updateModule, deleteModule, fetchModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch<any>();

  const { modules, loading } = useSelector((state: RootState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");

  // Fetch modules when component mounts or course changes
  useEffect(() => {
    if (cid) {
      dispatch(fetchModules(cid as string));
    }
  }, [cid, dispatch]);

  if (loading) {
    return <div>Loading modules...</div>;
  }

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ courseId: cid as string, module: { name: moduleName } }));
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
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
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
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
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