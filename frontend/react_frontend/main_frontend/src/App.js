// css
import "./App.css"

// 기본 패키지
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom"

// components들
import { Navbar, MainLeft, Main, SignUp, Footer } from "./pkgs"

function App() {
  return (
    <div className="App">
      <Routers>
        
        {/* 네브바 */}
        <Navbar />
        
        {/* 메인 콘텐츠 */}
        <div className = "app-container">

          {/* 왼쪽에 존재하는 메뉴바 */}
          <div className = "app-navbar">
            <MainLeft />
          </div>

          {/* 서비스들 */}
          <div className = "app-contents">
            <Routes>
              <Route path = "/" element = { <Main /> } />
              <Route path = "/signup/" element = { <SignUp /> } />
            </Routes>
          </div>

        </div>

        {/* 푸터 */}
        <Footer />

      </Routers>
    </div>
  );
}

export default App;
