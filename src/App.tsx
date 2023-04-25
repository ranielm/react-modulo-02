import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/task.contex";
import { IRegisterData } from "./screens/Register/Register.types";
import { AppLayoutContainer, GlobalStyle } from "./styles";

const Listview = lazy(() => import('./screens/Listview'));
const Register = lazy(() => import('./screens/Register'));

const App = () => {
  return (
    <>
    <TaskProvider>
      <GlobalStyle />
      <AppLayoutContainer>
        <Suspense fallback={<div>Carregando...</div>}>
          <Router basename={'/produtos'}>
            <Routes>
              <Route path="/" element={<Register onSubmit={function handleSubmit(data: IRegisterData): void {}} />} />
              <Route path="/listview" element={<Listview />} />
            </Routes>
          </Router>
        </Suspense>
      </AppLayoutContainer>
    </TaskProvider>
    </>
  );
};

export default App;
