import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  console.log(authService.currentUser);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} />
    {/* JS 코드 쓸 땐 중괄호로 감싸주기 */}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
