import "./styles.scss";
import Editor from "./pages/Editor";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Protected from './comps/auth/Protected'
import Dashboard from "./pages/Dashboard";
import MyBooks from "./comps/layout/dashboardComponents/MyBooks";
import SingleBook from "./comps/layout/dashboardComponents/mybookComps/SingleBook";
export default function App() {
  // all protected routes will store in this array
  const PROTECTED_ROUTES = [
    {
      path: "/dashboard",
      LMT: Dashboard
    },
    {
      path: "/editor/*",
      LMT: Editor
    }

  ]
  const DASHBOARD_ROUTES = [
    {
      path: "/dashboard/mybook",
      LMT: MyBooks
    }
  ]
  return (
    <>
      <Router basename="/weblib">
        <Routes>

          <Route path="" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {PROTECTED_ROUTES.map((item) => {
            if (item.LMT === Dashboard) return <Route path={item.path} element={<Protected LMT={item.LMT} />}>
              {
                DASHBOARD_ROUTES.map((item) => {
                  return <Route path={item.path} element={<item.LMT />}>
                    item.LMT === MyBooks && <Route path="/dashboard/mybook/*" element={<SingleBook />} />
                  </Route>
                })

              }
             </Route>
            else return <Route path={item.path} element={<Protected LMT={item.LMT} />}/>
            }
          )}

        </Routes>
      </Router>
    </>
  );
}
