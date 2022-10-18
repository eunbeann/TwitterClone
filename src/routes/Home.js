import { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    console.log(userObj)
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");


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

    // 첨부 파일 정보  출력
    const onFileChange = (event) => {
        // console.log(event.target.files)
        // 아래 코드 의미 확인하기 필요
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile)
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

    const onClearAttachment = () => setAttachment("");

    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                {/* 사진만 첨부할 수 있게 accept images */}
                <input type="file" accept="image/*"  onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="img" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
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