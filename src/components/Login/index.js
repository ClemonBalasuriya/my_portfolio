import { isFirebaseConfigured, signInWithGoogle } from '../../firebase';

const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured) {
        alert('Firebase is not configured. Add REACT_APP_FIREBASE_* values to .env and restart npm start.');
        return;
    }

    try {
        await signInWithGoogle();
    } catch (error) {
        alert(error.message || 'Failed to sign in with Google');
    }
};

const Login = () => {
    return (
        <div className="dashboard">
            <button onClick={handleGoogleSignIn}>
                Sign in with google
            </button>
        </div>
    )
}

export default Login;