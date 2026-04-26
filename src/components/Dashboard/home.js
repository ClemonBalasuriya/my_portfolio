import { useRef } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore/lite';


const Home = () => {
    const form = useRef();

    const submitPortfolio = (e) => {
        e.preventDefault();

        if (!storage || !db) {
            alert('Firebase is not configured. Add REACT_APP_FIREBASE_* values to .env.');
            return;
        }

        const name = form.current[0]?.value;
        const description = form.current[1]?.value;
        const url = form.current[2]?.value;
        const image = form.current[3]?.files[0];

        if (!image) {
            alert('Please select an image file.');
            return;
        }

        const storageRef = ref(storage, `portfolio/${image.name}`);

        uploadBytes(storageRef, image).then(
            (snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: downloadUrl
                    })
                }, (error) => {
                    console.log(error);
                    savePortfolio({
                        name,
                        description,
                        url,
                        image: null
                    })
                })
            }, (error) => {
                console.log(error);
                savePortfolio({
                    name,
                    description,
                    url,
                    image: null
                })
            }
        )
    }

    const savePortfolio = async (portfolio) => {
        try {
            await addDoc(collection(db, 'portfolio'), portfolio);
            window.location.reload(false);
        } catch (error) {
            alert('Failed to add portfolio');
        }
    }

    return (
        <div className="dashboard">

            <h2>Add software, data science, or AI project</h2>

            <form ref={form} onSubmit={submitPortfolio}>
                <p><input type="text" placeholder="Project name" /></p>
                <p><textarea placeholder="Tech stack and project summary" /></p>
                <p><input type="text" placeholder="Project URL (GitHub or live demo)" /></p>
                <p><input type="file" placeholder="Image" /></p>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => auth?.signOut()}>Sign out</button>
            </form>
        </div>
    )
}

export default Home;