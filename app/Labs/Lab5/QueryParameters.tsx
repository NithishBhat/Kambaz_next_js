"use client";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

export default function QueryParameters() {
  
  const HTTP_SERVER =
    process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";


  const [a, setA] = useState("10");
  const [b, setB] = useState("5");

  return (
    <div id="wd-query-parameters" className="mt-4">
      <h3>Query Parameters</h3>
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        value={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        value={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <div className="list-group">
        <a
          id="wd-query-parameter-add"
          className="list-group-item list-group-item-action"
          href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        >
          Add {a} + {b}
        </a>
        <a
          id="wd-query-parameter-subtract"
          className="list-group-item list-group-item-action"
          href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        >
          Subtract {a} - {b}
        </a>
 
        <a
          id="wd-query-parameter-multiply"
          className="list-group-item list-group-item-action"
          href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        >
          Multiply {a} * {b}
        </a>
        <a
          id="wd-query-parameter-divide"
          className="list-group-item list-group-item-action"
          href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        >
          Divide {a} / {b}
        </a>
      </div>
      <hr />
    </div>
  );
}