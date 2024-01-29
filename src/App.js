import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./Utils/Auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <AllRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
