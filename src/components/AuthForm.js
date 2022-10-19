import { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setnewAccount] = useState(true);
    const [error, setError] = useState("")
    
    const toggleAccount = () => setnewAccount((prev) => !prev);
    
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
        <>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange} />
                    required
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>

    )
}
 
export default AuthForm;

