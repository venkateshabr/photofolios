import './Albumform.css';
import { useRef } from 'react';
import { db } from './firebaseinit';
import { collection, addDoc } from "firebase/firestore"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlbumForm(){
    const albumnameref = useRef();

    function handleclear(){
        albumnameref.current.value = "";
    }
    async function createhandler(){
        const name = albumnameref.current.value;
         albumnameref.current.value = "";
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "Albums"), {
            name: name,
        });
        console.log("Document written with ID: ", docRef.id);
       
        console.log(name);
        toast.success("Album created successfully"); 
    }
    return(
        <div className='albumform-container'>
            <ToastContainer />
            <h1>Create an album</h1>
            <div className='albumform'>
                <input ref={albumnameref} placeholder='Album name' required/>
                <div className='albumform-button'>
                <button onClick={handleclear} className='clearbutton'>clear</button>
                <button onClick={createhandler} className='createbutton'>create</button>
                </div>
               
            </div>
        </div>
    )
}