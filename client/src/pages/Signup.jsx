import netflixbg from '../assets/netflixCloneBg.jpg';
import { useRef, useState } from 'react';
import { firebaseAuth } from '../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
//Signup form states
const [formValues, setFormValues] = useState({
    email: "",
    password:""
})
  //show password state
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePasswordConfirmation, setTogglePasswordConfirmation] = useState(false);

  const handleSignup = async(e) => {
      e.preventDefault();
      try {
        const {email, password} = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await axios.post('http://localhost:4000/api/user/add_user', {
            email,
        })
      } catch (err) {
          console.error(err);
      }
  };

  // Check if user is logged in
  onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
          navigate('/home');
      } else {
          console.log('User is not logged in');
      }
  })

  //toggle password function
  const handlePasswordToggle = () => {
      setTogglePassword(!togglePassword);
  };
  
  const handlePasswordConfirmationToggle = () => {
      setTogglePasswordConfirmation(!togglePasswordConfirmation);
  };
  

  return (
    <div class="bg-image" style={{backgroundImage: `url(${netflixbg})`, backgroundSize: 'cover'}}>
     <section class="signIn-div">
     <Header login />
        <div class="container mx-auto px-4 relative top-40">
            <div class="max-w-xl mx-auto">
            <div class="p-6 lg:p-12 mb-6 bg-gray-900 shadow-md rounded">
                <div class="mb-10">
                {/* <span class="text-gray-500">Sign Up</span> */}
                <h3 class="text-2xl font-bold text-white">Sign Up</h3>
                </div>
                <form onSubmit={handleSignup}>
                <div class="mb-3 flex p-4 bg-gray-800 rounded">
                    <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none" name="email" type="email" placeholder="name@email.com" value={formValues.email} onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                    <svg class="h-6 w-6 ml-4 my-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                </div>
                 <div class="mb-6 flex p-4 bg-gray-800 rounded">
                    {togglePassword ? 
                        <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none" name="password" type="text" placeholder="Password"  value={formValues.password} onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                        :
                        <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none"name="password" type="password" placeholder="Password"  value={formValues.password} onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                    }
                    <button type="button" onClick={handlePasswordToggle}>
                    {togglePassword ? <svg class="h-6 w-6 ml-4 my-auto text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" ></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    :
                    <svg class="h-6 w-6 ml-4 my-auto text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" ></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    }
                    </button>
                </div>
                {/* <div class="mb-6 flex p-4 bg-gray-800 rounded">
                    {togglePasswordConfirmation ?
                        <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none" type="text" placeholder="Password confirmation" ref={passwordConfirmationRef}/>
                        :
                        <input class="w-full text-xs text-gray-50 bg-gray-800 outline-none" type="password" placeholder="Password confirmation" ref={passwordConfirmationRef}/>
                    }
                    <button type="button" onClick={handlePasswordConfirmationToggle}>
                    <svg class="h-6 w-6 ml-4 my-auto text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    </button>
                </div> */}
                <div class="text-center">
                    <button class="mb-2 w-full py-4 bg-red-600 hover:bg-red-700 rounded text-sm font-bold text-gray-50 transition duration-200" type="submit">Sign Up</button>
                    <span class="text-gray-400 text-xs">
                    <span>Already have an account?</span>
                    <a class="text-red-600 hover:underline" href="/login">Sign In</a>
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

export default Signup;