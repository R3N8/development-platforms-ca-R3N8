import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../supabaseClient';
import { useAlert } from '../hooks/useAlert';

export default function Callback() {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
  
    useEffect(() => {
        const finishAuth = async () => {
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