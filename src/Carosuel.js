import { useState } from "react";
import './Carosuel.css';
export default function Carosuel({images,currentimage,handlecarousel,filteredList}){

    const [length,setLength] = useState(filteredList.length - 1);
    const [index,setIndex] = useState(currentimage);
   
    function handlebackward(){
        if(index===0){
            setIndex(length);
        }else{
            setIndex(index-1);
        }
    } 
    function handleforward(){
        if(index===length){
            setIndex(0);
        }else{
            setIndex(index+1);
        }
    }

    return(
        <div className="carousel">
           { //Object.values(images).map((value)=>{
               
             //   return(
           
                  
                        <div >
                         <img className="backward iconaction" onClick={handlebackward} src="https://cdn-icons-png.flaticon.com/128/81/81037.png"/>
                        <div className="mainimg"> 
                         <img className="imgtag" src={filteredList[index].image}/>
                        </div>
                         <img className="forward iconaction" onClick={handleforward} src="https://cdn-icons-png.flaticon.com/128/81/81068.png"/>
                        <img className="close"  onClick={()=>handlecarousel(index)} src="https://cdn-icons-png.flaticon.com/128/1828/1828666.png"/>
                        </div>
                  //                      );
              
             //   })
                }
        </div>
    )
}