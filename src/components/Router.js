import { HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";
// {/* <Home />  Route 안에 component 대신 element 사용 v6 에러 수정*/
// 상위 컴포넌트에서 받은 프롭스 구조 분해 할당으로 사용
const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {/* LoggendIn이 True인 경우에만 Nav 보이게 처리하기 */}
            {/* && 왼쪽 값이 true이면 오른쪽 값 반환 */}
            {isLoggedIn && <Navigation userObj={userObj} />}
                                <div
                        style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent:"center",
                    }}>
            {/* Switch 삭제 됨 > Routes로 변경 */}
            {/* 삼항 연산자와 상태로 적절한 컴포넌트 반환 */}
            <Routes>
                    {isLoggedIn ? (
                        <>
                        <Route exact path="/" element={<Home userObj={userObj} /> } />
                        <Route exact path="/profile" element = {<Profile refreshUser={refreshUser} userObj={userObj} />} />
                        </>

) : (
    <Route exact path="/" element= { <Auth /> } />
    )}
                    {/* Redirect 삭제됨 > useNavigation으로 변경  */}
            </Routes>
    </div>
        </Router>
    )
}

export default AppRouter;