import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL, listAll  } from "firebase/storage";

var photo = false;
const firebaseConfig = {
  apiKey: "AIzaSyB-B2cb-jZAK9WAF6M1dXdergLoIGoAJQg",
  authDomain: "ourdoodler.firebaseapp.com",
  projectId: "ourdoodler",
  storageBucket: "ourdoodler.appspot.com",
  messagingSenderId: "789115214344",
  appId: "1:789115214344:web:2f3d8b19af4b9ba9a8cfbd"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage();
const storageRef = ref(storage, 'Images/'+new Date());

document.getElementById('btnSave').addEventListener('click', function(){
  uploadString(storageRef, document.getElementById('myCanvas').toDataURL(), 'data_url').then((snapshot) => {
    alert('Image Uploaded!!')
  });
}, false);

document.getElementById('btnShow').addEventListener('click', function(){
  if(photo){
    photo=false;
    document.getElementById('btnShow').innerHTML='Show Photos'
    document.querySelector("#myCanvas").style.display='block'
    document.querySelector(".myPhotos").innerHTML=''
    document.querySelector(".myPhotos").style.display='none'
    document.querySelector(".tools").style.display='flex'
  }else{
    photo=true;
    document.getElementById('btnShow').innerHTML='Show Canvas'
    document.querySelector("#myCanvas").style.display='none'
    document.querySelector(".myPhotos").style.display='block'
    document.querySelector(".tools").style.display='none'
    show();
  }
}, false);

const show = () => {
  var head = document.createElement('h1');
  head.innerHTML = 'My Photos';
  document.querySelector(".myPhotos").appendChild(head);
  const storageRef = ref(storage, 'Images/');
  listAll(storageRef)
    .then((res)=>{
      if(res.items.length==0){
        var n = document.createElement('h2');
        n.innerHTML = 'No Photos';
        document.querySelector(".myPhotos").appendChild(n);   
      }else{
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url)=>{
            console.log(url);
            var img = document.createElement('img');
                img.src = url;
                img.width = '350';
                document.querySelector(".myPhotos").appendChild(img);
          })
    
        })
      }
    });
}