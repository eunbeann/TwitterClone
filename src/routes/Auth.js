import { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import { async } from "@firebase/util";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setnewAccount] = useState(true);
    const [error, setError] = useState("")
    const toggleAccount = () => setnewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        // console.log(event.target.name);
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "gooogle") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)
    };
    
    const onChange = (event) => {
        const {
            target: { name, value }, } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value)
        }
    };

const onSubmit = async (event) => {
    event.preventDefault();
    try {
        let data;
        if (newAccount) {
            // create NewAccount
            data = await authService.createUserWithEmailAndPassword(email, password)
        } else {
            //log in
            data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
    } catch (error) {
        setError(error.message);
    };
};

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        <div>
            <button onClick={onSocialClick} namme="google">Continue with Google</button>
            <button onClick={onSocialClick} namme="github">Continue with Github</button>
        </div>
    </div>
    )
    };
export default Auth;