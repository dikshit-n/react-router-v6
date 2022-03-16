import "./App.css";
import {
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
  useRoutes,
} from "react-router-dom";

function NotFound() {
  return <div>Not Found</div>;
}

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Learn() {
  // const { nested } = props;
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
      <br />
      ---------------------------------------------
      <br />
      <Link className="btn btn-success m-1" to="/learn-nested/course">
        Course (Nested inside parent route)
      </Link>
      <Link className="btn btn-primary m-1" to="/learn-nested/bundle">
        Bundle (Nested inside parent route)
      </Link>
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Next", "Vue", "Typescript", "Angular"];
  return (
    <div>
      {/* <hr /> */}
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

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/myapps",
      element: <Navigate to="/learn" replace />,
    },

    // render nested routes in new page
    {
      path: "/learn",
      element: <Outlet />,
      children: [
        {
          path: "/",
          element: <Learn />,
          index: true,
        },
        {
          path: "course",
          element: <Courses />,
          children: [
            {
              path: ":courseId",
              element: <Course />,
            },
          ],
        },
        {
          path: "bundle",
          element: <Bundles />,
        },
      ],
    },

    // render nested routes inside parent route
    {
      path: "/learn",
      children: [
        {
          path: "course",
          element: <Courses />,
          children: [
            {
              path: ":courseId",
              element: <Course />,
            },
          ],
        },
        {
          path: "bundle",
          element: <Bundles />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const content = useRoutes(routes);

  console.log(content);

  // const JSXRoutes = (
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/dashboard" element={<Dashboard />} />
  //     <Route path="/myapps" element={<Navigate replace to="/learn" />} />
  //     {/* render nested routes in new page */}
  //     <Route path="/learn" element={<Outlet />}>
  //       <Route index element={<Learn />} />
  //       <Route path="course" element={<Courses />}>
  //         <Route path=":courseId" element={<Course />} />
  //       </Route>
  //       <Route path="bundle" element={<Bundles />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //     {/* Render nested routes in parent route */}
  //     <Route path="/learn-nested" element={<Learn nested />}>
  //       <Route path="course" element={<Courses />}>
  //         <Route path=":courseId" element={<Course />} />
  //       </Route>
  //       <Route path="bundle" element={<Bundles />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //     <Route path="*" element={<NotFound />} />
  //   </Routes>
  // );

  return content;
}

export default App;
