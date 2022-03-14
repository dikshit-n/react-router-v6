import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />}>
        <Route path="course" element={<Courses />}>
          <Route path=":courseId" element={<Course />} />
        </Route>
        <Route path="bundle" element={<Bundles />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success m-1" to="/learn/course">
        Course
      </Link>
      <Link className="btn btn-primary m-1" to="/learn/bundle">
        Bundle
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Next", "Vue", "Typescript", "Angular"];
  return (
    <div>
      <hr />
      <h1>Courses</h1>
      {courseList.map((el, index) => (
        <NavLink
          className={({ isActive }) =>
            `btn btn-${isActive ? "danger" : "warning"} m-1`
          }
          to={`/learn/course/${el}`}
          key={index}
        >
          {el}
        </NavLink>
      ))}
      <Outlet />
    </div>
  );
}
function Course() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <hr />
      <h4>Course: {courseId}</h4>
      <button
        className="btn btn-primary m-1"
        onClick={() =>
          navigate("/dashboard", { state: { courseId, price: "₹399" } })
        }
      >
        Price
      </button>
      <Link
        className="btn btn-success m-1"
        to="/dashboard"
        state={{ courseId, price: "₹399" }}
      >
        Invoice
      </Link>
    </div>
  );
}
function Bundles() {
  return (
    <div>
      <h1>Bundles</h1>
    </div>
  );
}

function Dashboard() {
  const { state } = useLocation();
  return (
    <div>
      <h1>Dashboard</h1>
      {state && state.courseId && state.price && (
        <span>
          <h4>Course: </h4>
          <h1 className="text-success">{state.courseId}</h1>
          <br />
          <h4>Price:</h4>
          <h1 className="text-warning">{state.price}</h1>
        </span>
      )}
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
