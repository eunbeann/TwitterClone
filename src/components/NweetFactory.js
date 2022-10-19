import { useState } from "react";
import { dbService,storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

        // Create
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setNweet("");
    setAttachment("");
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
    const onClearAttachment = () => setAttachment("");
    return (
    <form onSubmit={onSubmit}>
            <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120} />
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
    )
};

export default NweetFactory;