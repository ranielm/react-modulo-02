import { TaskProvider } from "./context/task.contex";
import Listview from "./screens/Listview";
import { AppLayoutContainer, GlobalStyle } from "./styles";

const App = () => {
  return (
    <>
    <TaskProvider>
      <GlobalStyle />
      <AppLayoutContainer>
        <Listview />
      </AppLayoutContainer>
    </TaskProvider>
    </>
  );
};

export default App;
