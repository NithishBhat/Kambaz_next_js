export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" /> <button id="wd-add-assignment-group">+ Group</button> <button id="wd-add-assignment">+ Assignment</button>
      
      
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - CSS + HTML
          </link>
          <br/>
          Mutliple Modules | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
          <strong> Due</strong> May 7 at 12:00am | 100 pts
        </li>
          <li className="wd-assignment-list-item">
          <link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A2 - ENV + HTML
          </link> 
          <br/>
          Mutliple Modules | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
          <strong> Due</strong> May 7 at 12:00am | 100 pts
          </li>
            <li className="wd-assignment-list-item">
            <link href="/Courses/1234/Assignments/123"
              className="wd-assignment-link" >
              A3 - REACT + HTML
            </link> 
            <br/>
            Mutliple Modules | <strong>Not Available Until</strong> May 6 at 12:00am | <br/>
            <strong> Due</strong> May 7 at 12:00am | 100 pts
          </li>
       
      </ul>
    </div>
);}
