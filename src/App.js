import './App.css';
import Navbar from './Navbar'; 
import AlbumList from './AlbumsList';
import ImageList from './ImageList';
import { useState } from 'react';

function App() {
  const [image,setimage] = useState(false);
  const [album,setAlbumid] = useState([]);
  function handleimage(id){
    setimage(!image);
    setAlbumid(id);
    console.log(id);
  }
  function handleobj(){
    setimage(!image);
  }
  return (
    <div className="App">
     <Navbar/>
     {image?
     
     <ImageList handleobj={handleobj} album={album}/>
     
     :
     
     <AlbumList hanldeimage={handleimage}/>
     }
    </div>
  );
}

export default App;
