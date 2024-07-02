// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth.context";
// import "./Footer.css"

// const Footer = () => {
//   const { handleLogout, currentUser } = useContext(AuthContext);
//   const isLandingPage = window.location.pathname === "/";
//   return (
//     <footer className="footer">
//       {/* !isLandingPage && ( */}
//       <div className="footer">
//         {currentUser ? (
//           <>
//             <Link to="/profile">
//               <button>Your Routine</button>
//             </Link>
//             <Link to="/progress">
//               <button>Progress</button>
//             </Link>

//             <Link to="/meals">
//               <button>Meals</button>
//             </Link>
//             <Link to="/workouts-list">
//               <button>Workouts</button>
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/signup">
//               <button>Sign Up</button>
//             </Link>
//             <Link to="/login">
//               <button>Login</button>
//             </Link>
//           </>
//         )}
//       </div>
//       {/* )  */}
//       <div className="footer-content">
//         <p>&copy; 2024 GymBros App. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import routineLogo from "../../assets/routine-logo.png";
import progressLogo from "../../assets/progress-logo.png";
import mealsLogo from "../../assets/meals-logo.png";
import workoutsLogo from "../../assets/workouts-logo.png";
import "./Footer.css";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const isLandingPage = window.location.pathname === "/";

  return (
    <footer className="footer">
      {!isLandingPage && (
        <div className="footer-links">
          {currentUser ? (
            <>
              <Link to="/profile">
                <div
                  className="footer-item"
                  style={{
                    background:
                      "linear-gradient(to bottom right,#ECB365, #5B86E5)",
                  }}
                >
                  <img
                    src={routineLogo}
                    alt="Routine"
                    className="footer-logo"
                  />
                  <span> Routine</span>
                </div>
              </Link>
              <Link to="/progress">
                <div
                  className="footer-item"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #ECB365, #5B86E5)",
                  }}
                >
                  <img
                    src={progressLogo}
                    alt="Progress"
                    className="footer-logo"
                  />
                  <span>Progress</span>
                </div>
              </Link>
              <Link to="/meals">
                <div
                  className="footer-item"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #ECB365, #5B86E5)",
                  }}
                >
                  <img src={mealsLogo} alt="Meals" className="footer-logo" />
                  <span>Meals</span>
                </div>
              </Link>
              <Link to="/workouts-list">
                <div
                  className="footer-item"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #ECB365, #5B86E5)",
                  }}
                >
                  <img
                    src={workoutsLogo}
                    alt="Workouts"
                    className="footer-logo"
                  />
                  <span>Workouts</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </>
          )}
        </div>
      )}
      <div className="footer-content">
        <p>&copy; 2024 GymBros App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
