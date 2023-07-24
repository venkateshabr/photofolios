import './Albumform.css';
import './Imageform.css';
import { useEffect, useRef} from 'react';
import { db } from './firebaseinit';
import { arrayRemove, arrayUnion,  doc,getDoc,  setDoc, updateDoc } from "firebase/firestore"; 

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm({albumid,albumname,isupdate,title,image,handleclick,settingimagepresent}){
    const titleref = useRef();
    const imageurlref = useRef();
   
    async function checkupdate(){
        if(isupdate){
            titleref.current.value=title
            imageurlref.current.value=image
        }
      

    }
    useEffect(()=>{
        checkupdate();
    });
    useEffect(()=>{
        if(isupdate){
           
        }
    },[isupdate])

    function handleclear(){
        titleref.current.value="";
        imageurlref.current.value="";
    }
    async function createhandler(){
        const titler = titleref.current.value;
        const imageurl = imageurlref.current.value;

        titleref.current.value = "";
        imageurlref.current.value = "";

        const docRef = doc(db, "Images", albumid);
        const docSnap = await getDoc(docRef);
        
        if(isupdate && docSnap.exists()){

            // const q = query(collection(db, "Images"), where("image", "==", image));
            // const querySnapshot = await getDocs(q);
            console.log("hi hello welcome to kirikalan magic show");
            
              // doc.data() is never undefined for query doc snapshots
            Object.values(docSnap.data()).map((b,i)=>{
            return( b.filter((async (d)=>
                {
                  if(d.image === image){
                      console.log(d.image);
                      console.log(image);
                      //return d;
                     
                      await updateDoc(doc(db, "Images", albumid), {
                          data : arrayRemove({
                              image : image,
                              title : title
                          })
                      });
                      await updateDoc(doc(db, "Images", albumid), {
                          data : arrayUnion({
                              image : imageurl,
                              title : titler})
                      });
                      handleclick();
                      titleref.current.value = "";
                      imageurlref.current.value = "";
                      
                      toast.success("Image updated successfully"); 
                  }else{
                      
                  }
                })))                            
              });      
              return;
        }
       
        if (docSnap.exists()) {
            await updateDoc(doc(db, "Images", albumid), {
                data : arrayUnion({
                    image : imageurl,
                    title : titler})
            }); 
        }else{
            await setDoc(doc(db, "Images", albumid), {
                data : arrayUnion({
                    image : imageurl,
                    title : titler})
            }); 
        }
        // Add a new document with a generated id.
        settingimagepresent();
        toast.success("Image added successfully"); 
    }
    return(
        <div className='albumform-container'>
            <ToastContainer />
            {isupdate?
            <h1>Update image {albumname}</h1> :
            <h1>Add image to {albumname}</h1>
            }
            
            <div className='imageform'>
                <input ref={titleref} placeholder='Title'
             
                required/>
                <input ref={imageurlref} placeholder='Image URL'  required/>
                <div className='albumform-button'>
                <button onClick={handleclear} className='clearbutton'>clear</button>
                <button onClick={createhandler} className='createbutton'>
                    {isupdate?"update":"create"}
                </button>
                </div>
               
            </div>
        </div>
    )
}