import { async } from "@firebase/util";
import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
    // history 삭제 됨 > useNavigate로 변경
    const onLogOutClick = () => {
        authService.signOut();
        navigate(`/`)
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };

    // 필터링
    // const getMyNweets = async () => {
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", userObj.uid)
    //         .orderBy("createdAt", "asc")
    //         .get();

    //     console.log(nweets.docs.map((doc) => doc.data()))
    // };
    // useEffect(() => { 
    //     getMyNweets();
    //  }, []);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    autoFocus
                className="formInput"/>
                <input
                    type="submit"
                    placeholder="Update Profile"
                    className="formBtn"
                    style={{ marginTop: 10, }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>LogOut</span>
        </div>
    )
}
export default Profile;