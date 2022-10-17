import { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    console.log(userObj)
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([])


    // Create
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("")
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    
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
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
    
}

// 2022.10.14. 17:18 (p.119, 5-액션 7)

export default Home;