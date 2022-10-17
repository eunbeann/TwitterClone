import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)


  // 두번째 인자로 빈 []를 넣어주어야지 최초 렌더링 1회에만 동작
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // null 값을 반환하는 불확실성 제거 
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  // setInterval(() => console.log(authService.currentUser), 2000);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing..."}
      {/* JS는 중괄호로 감싸서 사용 */}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
