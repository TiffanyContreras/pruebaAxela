import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AppProvider>
  );
}

export default App;