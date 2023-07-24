import { useState,useEffect } from "react";
import AlbumForm from "./AlbumForm";
import './Albumlist.css';
import { db } from "./firebaseinit";
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from 'react-spinner-material';

export default function AlbumList({hanldeimage}){
    const [album,setAlbum] = useState([]);
    const [albumform,setAlbumform] = useState(false);
    const [load,setLoad] = useState(true);

    const getdata = async ()=>{
        await onSnapshot(collection(db, "Albums"), (snapshot) => {
              const album = snapshot.docs.map((doc)=>({
                  id : doc.id,
                  ...doc.data()
               }));
               setAlbum(album);
               setLoad(false);
               console.log(album);
           });
    }
    useEffect(()=>{
        getdata();
    },[])    
    function handleclick(){
        setAlbumform(!albumform);
    }
    return (
        <div className="albumlist">
            
            <div >
                {albumform?
                <AlbumForm/>:
                ""
                }
            </div>
         
            <div className="album-head">
                <h1>Your Album</h1>
                <button onClick={handleclick} 
                    className={albumform?"cancelred":"addalbum"}>
                    {albumform?"Cancel":"Add Album"}
                </button>
            </div>
            <div className="albumbody">
                
                    {
            load?<Spinner className='spinner' radius={30} color={"#0077ff"} stroke={2} visible={true} />:
                    
                    
                    album.map((album,i)=>{
                    return( <div onClick={()=>hanldeimage(album)} className="element"  key={i}>
                        <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png"/>
                        
                           <span>{album.name}</span>
                       
                     </div>)
                    })}
                  
            </div>
        </div>
    )
}