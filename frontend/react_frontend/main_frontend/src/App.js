// 기본 패키지
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom"

// components들
import { Navbar, Main, SignUp, Footer } from "./pkgs"

function App() {
  return (
    <div className="App">
      <Routers>

        {/* 네브바 */}
        <Navbar />

        {/* 서비스들 */}
        <Routes>
          <Route path = "/" element = { <Main /> } />
          <Route path = "/signup/" element = { <SignUp /> } />
        </Routes>

        {/* 푸터 */}
        <Footer />

      </Routers>
    </div>
  );
}

export default App;
