"use client"
import PassingFunctions from "./PassingFunctions";
import ClickEvent from "./ClickEvent"
import PassingDataOnEvent from "./PassingDataOnEvent"
import EventObject from "./EventObject";
import Counter from "./Counter"
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import ReduxExamples from "./ReduxExamples/page";
import DateStateVariable from "./DataStateVariables";
import ObjectStateVariable from "./ObjectSateVariables";
import ArrayStateVariable from "./ArrayStateVariables";
import { Parastoo } from "next/font/google";
import ParentStateComponent from "./ParentStateComponent";
import ChildStateComponent from "./ChildStateComponent";


import store from "./store";
import { Provider } from "react-redux";

export default function Lab4(){
      function sayHello() {
    alert("Hello");
  }

    return(
          <Provider store={store}>
          <div  id="wd-lab4" >
            <h1>Lab 4</h1> 
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <EventObject/>
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <ReduxExamples/>
        </div>
        </Provider>
     
    );
}