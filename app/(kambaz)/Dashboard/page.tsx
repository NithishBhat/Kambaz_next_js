import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={200} height={150} alt="/images/reactjs.jpeg"/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Frontend developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/webdev.png" width={200} height={150}alt="/images/webdev.jpeg" />
            <div>
              <h5> CS1234 Web Dev </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/nlp.jpeg" width={200} height={150} alt="/images/nlp.jpeg"/>
            <div>
              <h5> CS1234 NLP </h5>
              <p className="wd-dashboard-course-title">
                Natural language processing</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/math.jpeg" width={200} height={150} alt="/images/math.jpeg"/>
            <div>
              <h5> CS1234 Math </h5>
              <p className="wd-dashboard-course-title">
                Mathematics</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/chem.jpeg" width={200} height={150} alt="/images/chem.jpeg" />
            <div>
              <h5> CS1234 Chem </h5>
              <p className="wd-dashboard-course-title">
                Chemistry</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/AI.jpeg" width={200} height={150} alt="/images/AI.jpeg" />
            <div>
              <h5> CS1234 AI </h5>
              <p className="wd-dashboard-course-title">
                Artificial intelligence developer</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/ML.jpeg" width={200} height={150} alt="/images/ML.jpeg" />
            <div>
              <h5> CS1234 ML </h5>
              <p className="wd-dashboard-course-title">
                Machine learning developer</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
          <div className="wd-dashboard-course"> 
            <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/dbms.jpeg" width={200} height={150} alt="/images/dbms.jpeg"/>
            <div>
              <h5> CS1234 DBMS </h5>
              <p className="wd-dashboard-course-title">
                DBMS developer</p>
              <button> Go </button>
            </div>
            </Link>
          </div>
        </div>
    </div>
);}
