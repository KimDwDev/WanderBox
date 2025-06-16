// css
import "./App.css"

// setting 값들
import { useComputerNumberSetting } from "./settings";

// 기본 패키지
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom"
import { createContext } from "react";

// components들
import { Navbar, MainLeft, Main, SignUp, Footer } from "./pkgs"


const MainContext = createContext()

function App() {
  const { computerNumber, setComputerNumber } = useComputerNumberSetting()

  return (
    <div className="App">
      <MainContext.Provider value = {{ computerNumber, setComputerNumber }}>
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
      </MainContext.Provider>
    </div>
  );
}

export default App;
