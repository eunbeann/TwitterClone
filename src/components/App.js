import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  // 두번째 인자로 빈 []를 넣어주어야지 최초 렌더링 1회에만 동작
  useEffect((() => {
    authService.onAuthStateChanged((user) => console.log(user));
  }, []))
  // setInterval(() => console.log(authService.currentUser), 2000);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} />
    {/* JS 코드 쓸 땐 중괄호로 감싸주기 */}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
