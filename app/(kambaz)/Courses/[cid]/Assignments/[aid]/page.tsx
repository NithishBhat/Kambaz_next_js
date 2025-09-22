export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <form>
        <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" cols={80} rows={10}>
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <br />
        <table>
          <tr>
            <td align="center" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="center" valign="top">
              <label  htmlFor="wd-group"> Favorite movie genre: </label><br/>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="COMEDY">ASSIGNMENTS</option>
              <option value="DRAMA">Drama</option>
            </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="center" valign="top">
              <label  htmlFor="wd-display-grade-as"> Dispay Grade as: </label><br/>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="SCIFI">
              <option value="COMEDY">percentage</option>
              <option value="DRAMA">Drama</option>
            </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="center" valign="top">
              <label  htmlFor="wd-submission-type"> Submistion type: </label><br/>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="SCIFI">
              <option value="COMEDY">Online</option>
              <option value="DRAMA">Drama</option>
            </select>
            </td>
          </tr>
          <br />
          <tr>
            <label>Online Entry Options</label><br/>

            <input type="checkbox" name="check-genre" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-genre" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Web URL</label><br/>

            <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media recordings</label><br/>

            <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student annotation</label><br/>

            <input type="checkbox" name="check-genre" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File uploads</label><br/>
          </tr>
          <br />
          <tr>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label><br/>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <br />
          <tr>
            <label htmlFor="wd-due-date"> Due</label><br/>
            <input type="date"
                  defaultValue="2000-01-21"
                  id="wd-due-date"/>

          </tr>
          <br />
          <tr>
            <td>
              <label htmlFor="wd-available-from"> Available From</label><br/>
              <input type="date"
                    defaultValue="2000-01-21"
                    id="wd-available-from"/>
            </td>
            <td>
              <label htmlFor="wd-available-unti"> Until </label><br/>
              <input type="date"
                    defaultValue="2000-01-21"
                    id="wd-available-unti"/>
            </td>
          </tr><br />
        </table>
        <hr />
        <button align="right" > Cancel</button> <button> Save</button> 
      </form>
    </div>
);}
