import Styles from "../Styles/SignIn.module.css"

const SignUp = () => {
  return (
    <div className={Styles.formContainer}>
      <div className={Styles.formWrapper}>
        <span className={Styles.logo}>My Chat</span>
        <span className={Styles.title}>Sign Up</span>
        <form>
          <input type="text" placeholder="Your Name..."/>
          <input type="email" placeholder="Email..."/>
          <input type="password" placeholder="Password..."/>
          <input type="file"/>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>

    </div>
  );
};

export default SignUp;
