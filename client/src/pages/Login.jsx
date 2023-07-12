import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import netflixbg from '../assets/netflixCloneBg.jpg';
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";



const Login = () => {
    const navigate = useNavigate();
    // login form state
    const [formValues, setFormValues] = useState({
        email: "",
        password:""
    });

    //show password
    const [toggledPassword, setToggledPassword] = useState(false)
    const handleToggle = () => {
        setToggledPassword(!toggledPassword);
    };

    //login functionality
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const {email, password} = formValues;
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (err) {
            console.error(err);
    }}

    //check if user is logged in
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate('/home');
        } else {
            console.log('User is not logged in');
        }
    });

    


  return (
    <div class="bg-image" style={{backgroundImage: `url(${netflixbg})`, backgroundSize: 'cover'}}>
      <section className='signIn-div'>
        <Header />
        <div class="container mx-auto px-4 relative top-40">
            <div class="max-w-xl mx-auto">
            <div class="mb-10">
                <a class="text-white text-3xl font-bold leading-none" href="#">
                {/* <img class="h-12 mx-auto" src="atis-assets/logo/atis/atis-mono-light.svg" alt="" width="auto"> */}
                </a>
            </div>
            <div class="p-6 lg:p-12 mb-6 bg-gray-900 shadow-md rounded">
                <div class="mb-6">
                {/* <span class="text-gray-500">Sign In</span> */}
                <h3 class="text-2xl font-bold text-white">Log In</h3>
                </div>
                <form onSubmit={handleLogin}>
                <div class="mb-3 flex p-4 bg-gray-800 rounded">
                    <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none" name="email" type="email" placeholder="name@email.com" value={formValues.email} onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                    <svg class="h-6 w-6 ml-4 my-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                </div>

                    <div class="mb-6 flex p-4 bg-gray-800 rounded">
                        {toggledPassword ? <input
                                className="w-full text-xs text-gray-50 bg-gray-800 outline-none"
                                name="password"
                                type="text"
                                placeholder="Enter your password"
                                value={formValues.password}
                                onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
                            /> :
                            <input
                                className="w-full text-xs text-gray-50 bg-gray-800 outline-none"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formValues.password}
                                onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
                            />}
                            <button type="button" onClick={handleToggle}>
                            {toggledPassword ? <svg className="h-6 w-6 ml-4 my-auto text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                :
                                <svg className="h-6 w-6 ml-4 my-auto text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            }
                            </button>
                    </div>
                <div class="text-center">
                    <button type="submit" class="mb-2 w-full py-4 bg-red-600 hover:bg-red-700 rounded text-sm font-bold text-gray-50 transition duration-200">Log In</button>
                    <span class="text-gray-400 text-xs">
                    <span>New to Netflix?</span>
                    <a class="text-red-600 hover:underline" href="/signup">Sign Up</a>
                    </span>
                </div>
                </form>
            </div>
            <p class="text-xs text-center text-gray-400"><a class="underline hover:text-gray-500" href="#">Policy privacy</a> and <a class="underline hover:text-gray-500" href="#">Terms of Use</a></p>
            </div>
        </div>
   </section>
   </div>
  )
}

export default Login;