import './Imagelist.css';
import { db } from "./firebaseinit";
import { doc, onSnapshot } from "firebase/firestore";
import {updateDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react"
import ImageForm from "./Imageform";
import Carosuel from './Carosuel';
import Spinner from 'react-spinner-material';
import { getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ImageList({album,handleobj}){
    const [images,setImages] = useState({});
    const [search,setSearch] = useState(false);
    const [imageform,setImageform] = useState(false);
    const [load,setLoad] = useState(true);
    const [carousel,setCarousel] = useState(false);
    const [currentimage,setCurrentimage] = useState(0);
    const [isupdate,setIsupdate] = useState(false);
    const [imagepresent,setImagepresent] = useState(false);

    const [title,settitle] = useState('');
    const [image,setimage] = useState('');
   
    let updatedList = Object.values(images).map((value,i)=>value);
    updatedList = updatedList[0];
    console.log("first",updatedList);
    const [filteredList, setFilteredList] =  useState(updatedList);

    const filterBySearch = (event) => {
      // Access input value
      const query = event.target.value;
      // Create copy of item list
      let updatedList =  Object.values(images).map((value,i)=>value);
      console.log("updated list ",updatedList)
      // Include all elements which includes the search query
      updatedList = updatedList[0].filter((item) => {
            // if(item.title == query){
            //     return item;
            // }
            return item.title.toLowerCase().indexOf(query) !== -1;
      });
      // Trigger render with updated values
      console.log(updatedList);
      setFilteredList(updatedList);
    };

    function settingimagepresent(){
        setImagepresent(true);
    }

    async function getimagedata(){

       
        const unsub = onSnapshot(doc(db, "Images", album.id), (doc) => {
            console.log("Current data: ", doc.data());
            if(doc.data()){
                setImages(doc.data());
                setLoad(false);
                setfilterdata();
    
            }
          
           
        });

        

    
        const docRef = doc(db, "Images",album.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
         if(docSnap.data().data.length > 0 ){
            setImagepresent(true);
         }   
        }
        
        
        

    }


    function setfilterdata(){
        let updatedList = Object.values(images).map((value,i)=>value);

        updatedList = updatedList[0];
         console.log("getimagedata",updatedList);
        setFilteredList(updatedList);
    console.log(Object.keys(images).length, Object.values(images).length)

    }
    useEffect(()=>{
        
      getimagedata();
     
     
    },[]);

    useEffect(()=>{
        setfilterdata();
    },[images])

    function handleclick(){
       setIsupdate(false);
        setImageform(!imageform);
    }
    function searchHandler(){
        setSearch(!search);
        setfilterdata();
    }
    function handlecarousel(i){
       
            setCarousel(!carousel);
            setCurrentimage(i);
         
    }
    function handleedit(title,image,e){
        
        settitle(title);
        setimage(image);
        console.log(title);
        setIsupdate(true);
        setImageform(true);
        e.stopPropagation();
    }
    async function handledelete(j,e){
        e.stopPropagation();
        const index = Object.values(images).map((value,i)=>{
            return(
          value.filter((val,i)=>{
            if(i===j){
             
            }else{
            return val;
            }
          }))
        })
        console.log(index);
        console.log(images);
        // later...
        await updateDoc(doc(db, "Images", album.id), {
            data : index[0]
        });   
        setCurrentimage(0);
        toast.success("Image deleted successfully"); 
        
    }
    return(
        <div className="imagelist-container">
            <ToastContainer />
            <div >
                {imageform?
                <ImageForm settingimagepresent={settingimagepresent} handleclick={handleclick} title={title} image={image} isupdate={isupdate} albumid={album.id} albumname={album.name}/>:
                ""
                }
            </div>

            <div className="imagelist-header">
                <div className="backbutton">
                    <img onClick={handleobj} src="https://cdn-icons-png.flaticon.com/128/2099/2099238.png"/>
                </div>
                {!imagepresent  ?<h1>No images found in the album</h1>:""}
                <div className="imagelist-right">
                {!imagepresent ? " " :
                   <div>
                   {search ?
                    <>
                      <input onChange={(e)=>filterBySearch(e)} className='inputimagelist' type="text"/>
                      <img className="downimage2" onClick={searchHandler} src="https://stalwart-wisp-382f3c.netlify.app/assets/clear.png"/>
                    </>
                    :
                     <img className="downimage" onClick={searchHandler} src="https://cdn-icons-png.flaticon.com/128/954/954591.png"/>
                    }
                   </div>
                }
                <button onClick={handleclick} id="newbutton"
                className= {imageform?"cancelred":"addalbum"}>
                {imageform?"Cancel":"Add Image"}
                </button>
                </div>
            </div>
 
            <div className="albumbody2">               
                {
               load && imagepresent ?<Spinner className='spinner' radius={30} color={"#333"} stroke={2} visible={true} />:
                
       // Object.values(images).map((value,i)=>{
          //     return(
                filteredList?filteredList.map((val,j)=>{
                    console.log(val);
                    
                    return( <div  onClick={()=>handlecarousel(j)}   className="element newimagecontent"  >
                         <img className="mainimg" src={val.image}/>
                    
                       <span className='newspanele'>{val.title}</span>
                       <img onClick={(e)=>handleedit(val.title,val.image,e)} className='editbutton' src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"/>
                       <img onClick={(e)=>handledelete(j,e)} className='deletebutton' src="https://cdn-icons-png.flaticon.com/128/6711/6711573.png"/>
                   </div>)
                }):""
           //    );
              
           //     })
                
                }
              
             </div>
             <div>
               {carousel?<Carosuel handlecarousel={handlecarousel} filteredList={filteredList} images={images} currentimage={currentimage}/>:""} 
             </div>
                
                
        </div>
            
    )
}