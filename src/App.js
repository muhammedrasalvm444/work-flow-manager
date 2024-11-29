import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./routes/AppRouter";
import "./index.css"; // Tailwind imports
import GlobalStyle from "./globalStyle";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);

export default App;
