"use client";
import Link from "next/link";
import "../../styles.css";
import { useParams } from "next/navigation";

export default function CourseNavigation() {
   const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
   const { cid } = useParams();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(item=>(
        
          <Link  key={item}
          href={`/Courses/${cid}/${item}`}
          id={`wd-course-${item.toLowerCase()}-link`}
          className="list-group-item border-start border-0"> {item} </Link>
      ))}
      
      
    </div>
);}
