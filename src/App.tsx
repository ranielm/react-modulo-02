import Listview from "./screens/Listview";
import { AppLayoutContainer, GlobalStyle } from "./styles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppLayoutContainer>
        <Listview />
      </AppLayoutContainer>
    </>
  );
};

export default App;
