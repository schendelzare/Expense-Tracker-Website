import "./App.css";
import ContextProvider from "./components/context/context";

import Routes from "./Routes";

function App() {
  return (
    <div className="">
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </div>
  );
}

export default App;
