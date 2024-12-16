import "./App.css";

import { Provider } from "react-redux";

import { store } from "./redux/store";
import { ProjectManagement } from "./pages/project-management/view/project-management";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <ProjectManagement />
      {/* <TestTableList /> */}
    </Provider>
  );
}

export default App;
