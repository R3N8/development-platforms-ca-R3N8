import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabaseClient';
import { useAlert } from '../hooks/useAlert';


// https://temp-mail.org/

export default function Callback() {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
  
    useEffect(() => {
        const finishAuth = async () => {
            await supabaseClient.auth.onAuthStateChange(
                (event) => {
                    if (event === 'SIGNED_IN') {
                    // Redirect to a protected route after successful sign-in
                    console.log("event should trigger redirect SIGNIN", event)
                    
                    } else if (event === 'SIGNED_OUT') {
                    // Optional: redirect to login if signed out
                    console.log("event should trigger redirect SIGNINOUT", event)
                    }
                }
            );

            const { data } = await supabaseClient.auth.getSession();

            if (data.session) {
                showAlert('success', 'Successfully signed up!');
                navigate('/');
            } else {
                showAlert('error', 'Authentication failed. Please register or try logging in again.');
                navigate('/register');
            }
        }
        
        finishAuth();

    }, [navigate, showAlert]);


    return (
        <div className="flex items-center justify-center h-screen">
            <p>Processing authentication...</p>
        </div>
    );
}

