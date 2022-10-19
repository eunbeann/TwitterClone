import { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";


const Home = ({ userObj }) => {
    console.log(userObj)
    const [nweets, setNweets] = useState([]);

// Read
// 실시간 데이터 전송 이전
    // const getNtweets = async () => {
    //     const dbNweets = await dbService.collection("ntweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = { ...document.data(), id: document.id };
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // };

    // 실제 함수 호출, dbService 관련 함수는 aynsc-await 문을 쓰는 함수는 별도로 getNweets로 구성
    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray)
        })
        // getNtweets();
    }, []);

    console.log(nweets);


    return (
        <div className="container">
            <NweetFactory />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
    
}

// 2022.10.14. 17:18 (p.119, 5-액션 7)

export default Home;