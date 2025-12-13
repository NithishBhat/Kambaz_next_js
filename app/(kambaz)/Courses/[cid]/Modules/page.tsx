"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModulesControlButton from "./ModulesControlButton";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";

import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";

export default function Modules() {
  const { cid } = useParams();
  const courseId = cid as string;

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  // Check if user can edit (FACULTY, ADMIN, or TA)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "TA";

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]); 

  const createModule = async (module: any) => {
    const newModule = await client.createModuleForCourse(courseId, module);
    dispatch(addModule(newModule));
  };

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const publishModule = async (moduleId: string) => {
    const module = modules.find((m: any) => (m._id || m.id) === moduleId) as any;
    if (module) {
      await saveModule({ ...module, published: !module.published });
    }
  };

  return (
    <div>
      {canEdit && (
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={() => {
            createModule({ name: moduleName, course: courseId });
            setModuleName("");
          }}
        />
      )}
      <br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any, index: number) => (
          <ListGroupItem key={module._id || module.id || index} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              {canEdit && (
                <ModulesControlButton
                  moduleId={module._id || module.id}
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                  publishModule={(moduleId) => publishModule(moduleId)}
                />
              )}
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, index: number) => (
                  <ListGroupItem key={lesson._id || lesson.id || index} className="wd-lesson p-3 ps-1">
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