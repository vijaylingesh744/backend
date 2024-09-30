
import FetchData from '../../../fetch-api/Apifetch';

const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.onerror = (error) => reject(error);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };
      reader.readAsDataURL(file);
    });
  };


export const fileUploadAndResize = async (e,setselectedItems,selectedItems) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    try {
      const formData = new FormData();
        await Promise.all(files.map(async (selectedFile) => {
          const resizedBlob = await resizeImage(selectedFile, 720, 720);
          formData.append("mediaUrls", resizedBlob, selectedFile.name); // Ensure proper naming
      }));
      const res = await FetchData("uploadimages", "POST", formData, false, true);
      if (res) {
        const media_url = Array.isArray(res.url) ? res.url : [res.url];
        setselectedItems([...selectedItems, ...media_url ]); 
      }
    } catch (error){
      console.error("IMAGE UPLOAD ERR", error);
    }
  };

  export const handleImageRemove = async (image,setselectedItems,selectedItems) => {
    try{
      const res = await FetchData("removeimage", "POST", JSON.stringify({image}), false, false);
      if (res) {
        const filteredImages = selectedItems.filter((item) => item != image);
        setselectedItems(filteredImages);  
      }
    }catch(error){
        const filteredImages = selectedItems.filter((item) => item != image);
        setselectedItems([...selectedItems, ...filteredImages ]);  
      console.error("REMOVE IMAGE ERR", error);
    }
};



