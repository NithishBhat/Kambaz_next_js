"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { add } from "./addReducer";
import { RootState } from "../../store";
export default function AddRedux() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();
  return (
    <div  id="wd-add-redux">
      <h1>Add Redux</h1>
      <h2>{a} + {b} = {sum}</h2>
      <FormControl type="number" defaultValue={a}
        onChange={(e) => setA(parseInt(e.target.value))} className="m-2" />
      <FormControl type="number" defaultValue={b}
        onChange={(e) => setB(parseInt(e.target.value))}  className="m-2"/>
      <Button id="wd-add-redux-click"
              onClick={() => dispatch(add({ a, b }))} className="m-2">
        Add Redux
      </Button>
      <hr/>
    </div>
  );
}

