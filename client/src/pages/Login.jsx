function Login() {
    return (
        <div className="bg-gray-50">
            <div>
                <div>
                <h1>LogIn</h1>
                <div>
                    <input type="email" />
                    <label htmlFor="">Your Email</label>
                </div>

                <div>
                    <input type="email" />
                    <label htmlFor="">Your Email</label>
                </div>  
                <div>
                    <div>
                        <input type="checkbox" name="" id=""/>
                        <label htmlFor="Remember Me"></label>
                    </div>
                    <span>Forgot Password?</span>
                </div>
                <button type="submit">Login</button>
            </div>
        </div>
        </div>
    )
}

export default Login;