import React, {useState} from "react";

export default function signUp () {

    const SIGNUP_API_URL = 'http://localhost:3000/api/auth/signup'; 

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(SIGNUP_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })

            })

            const data = await response.json()
            if(response.ok && data.token){
                setToken(data.token);
                setSuccessMessage('Account created successfully! Redirecting...');
                setErrorMessage('');

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                const message = data.error?.toString() || 'Signup failed';
                setErrorMessage(message);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred during signup');
            setSuccessMessage('');
        }
    }

    return (
        <>
            <div>
                <h1>Sign Up</h1>
                {successMessage && <div className="success">{successMessage}</div>}
                {errorMessage && <div className="failure">{errorMessage}</div>}
                <br />
                <form onSubmit={handleSubmit}>
                    {/*  input boxes */}
                    <div className='formGroup'>
                        Email: <input value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='formGroup'>
                        Username: <input value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className='formGroup'>
                        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
    
}