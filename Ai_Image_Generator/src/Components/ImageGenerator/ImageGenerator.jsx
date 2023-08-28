.import React, { useRef, useState } from 'react'
import d_image from '../Assets/default_image.svg'


const ImageGenerator = () => {

  const [image_url,setImage_url]= useState("/")
  let inputRef= useRef(null);
  const imageKey = process.env.REACT_APP_Image_KEy;
  const [loading,setLoading]= useState(false)


  const imageGenerate = async () =>{
    if (inputRef.current.value === "") {
      return;
    }
  
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Enter Key}`,
      },
      body: JSON.stringify({
        prompt: inputRef.current.value,
        n: 1,
        size: "512x512",
      }),


      
    });
  
    if (response.status === 401) {
      console.error("Unauthorized - Invalid API key");
    } else if (response.ok) {
      const data = await response.json();
      setImage_url(data.images[0].url);
    } else {
      console.error("Failed to fetch image:", response.status, response.statusText);
    }


    let data= await response.json();
    let data_Array= data.data;
    setImage_url(data_Array[0].url);
  };

  return (
    <div className='ai-image-generator bg-blue-400 w-full h-[45.8rem] flex flex-col items-center justify-center gap-y-5'>
      <div className="header text-5xl ">
        Ai Image<span>Generator</span>
      </div>
      <div className='img-loadnig  '>
      <img src={image_url==="/"? d_image: image_url} className='rounded-3xl' alt='Default AI Generated Image' />
      
      </div>
      <div className='search-box'>
        <input type="text" ref={inputRef} className='search-input bg-transparent border-2 border-black text-black w-[30rem] rounded-3xl h-16' placeholder='Describe Image...'/>
        <div className="generate-btn flex items-center justify-center mt-4" onClick={()=>{
          imageGenerate()
        }}>
          Generate 
        </div>

      </div>
    </div>
  )
}

export default ImageGenerator
