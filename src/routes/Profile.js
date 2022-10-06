import { authService } from "fbase";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    // Switch 삭제 됨 > useNavigate로 변경
    const onLogOutClick = () => {
        authService.signOut();
        navigate(`/`)
    }
    return (
        <>
            <button onClick={onLogOutClick}>LogOut</button>
        </>
    )
}
export default Profile;