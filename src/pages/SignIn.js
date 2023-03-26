const SignIn = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Sign In</span>
        <form>
          
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          
          <button>Sign in</button>
        </form>
        <p>You don't have an account? Signup</p>
      </div>
    </div>
  );
};

export default SignIn;
