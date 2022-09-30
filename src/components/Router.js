import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
// {/* <Home />  Route 안에 component 대신 element 사용 v6 에러 수정*/
// 상위 컴포넌트에서 받은 프롭스 구조 분해 할당으로 사용
const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {/* Switch 삭제 됨 > Routes로 변경 */}
                {/* 삼항 연산자와 상태로 적절한 컴포넌트 반환 */}
            <Routes>
                {isLoggedIn ? (
                    <Route exact path="/" element= { <Home /> }>
                    </Route>
                ) : (
                    <Route exact path="/" element= { <Auth /> }>
                    </Route>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;