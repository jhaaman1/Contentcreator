import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./Utils/Auth";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
        progressClassName="toastProgress"
      />
      <AuthProvider>
        <Navbar />
        <AllRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
