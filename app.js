const play=document.getElementById('play');
const prev=document.getElementById('previous');
const next=document.getElementById('next');
const control=document.getElementById('controls');
const start = document.getElementById('start');
const end = document.getElementById('end');
const Name=document.querySelector('.name');
const img=document.querySelector("img");
const song=document.querySelector('audio');
const progress=document.querySelector('progress');
var i=0; song.load();
let playlist=[{name:"Celoso", img:"img/pexels-darwis-alwan-1995730.jpg" ,path:"Music/Lele Pons - Celoso (Lyrics).mp4"},
              {name:"Aigiri", img:"img/pexels-jacub-gomez-1142941.jpg" ,path:"Music/Aigiri Nandini With Lyrics - Mahishasura Mardini .mp4"},
              {name:"Armoniun", img:"img/pexels-simon-migaj-747964.jpg" ,path:"Music/Aigiri_Nandini__Mahishasura_Mardini_Stotram__Armonian(256k).mp3"},
              {name:"Tandava", img:"img/pexels-tomas-anunziata-3876327.jpg" ,path:"Music/Shiva Tandava Stotram - Lyrics.mp4"}];
// let song=new Audio(playlist[i].path);

//get called every time when song file is loaded
song.onloadedmetadata = function (){
    duration = Math.round(song.duration);
    const cur=parseInt((duration/60).toFixed(2));
    const sec=Math.round(song.duration)%60;
    let curr=cur,secc=sec;
    if(cur<10)
    curr='0'+cur;
    if(sec<10)
    secc='0'+sec;
    end.innerText=curr+":"+secc;  
 };

play.addEventListener('click',playMusic);
next.addEventListener('click',playNext);
prev.addEventListener('click',playpre);
progress.addEventListener('mouseup',seek);
let duration =0 ,prgs =0;let prog=0;
let curSec=0,curMin=0;
function playMusic(){
   
    
    if(!song.paused){ song.pause(); return;}     

        song.play(); 
        

        prog=setInterval(()=>{ 
        duration = Math.round(song.duration);
        prgs= Math.round((song.currentTime / duration)*100);
        progress.value=prgs;
        const cur=parseInt((song.currentTime/60).toFixed(2));
        const sec=Math.round(song.currentTime)%60;
        curMin=cur, curSec=sec;
        if(cur<10)
        curMin='0'+cur;
        if(sec<10)          
        curSec='0'+sec;
         
        start.innerText=curMin+":"+curSec;
                
        if(progress.value === 100 || song.paused)
            clearInterval(prog);

        },1000);
       
}

function clearInput()
{   
    curMin=0;curSec=0;
    duration =0 ;prgs =0;progress.value=0;  
    clearInterval(prog);
    if(i > 3) i=0;
    if(i < 0)  i = playlist.length-1;
}

function playNext()
{ 
        i++; 
        clearInput();
        song.src=playlist[i].path;
        song.load();
        update(i); 
        playMusic();
}

function playpre(){
    i--; 
    clearInput();
    song.src=playlist[i].path;
    song.load();
    update(i);
    playMusic();
}
function update(index)
{
    Name.innerText = playlist[index].name;
    img.src=playlist[index].img;
}

function seek(e)
{
    const width=(this.clientWidth);
    const x= e.offsetX;
    const dur=song.duration;
    song.currentTime= (x /width)*dur;
    prgs= Math.round((song.currentTime / dur)*100);
    progress.value=prgs;
//pausing the song so that it will continue to play when
//user seek
    song.pause();
    playMusic();
}
song.addEventListener('ended',()=>{
            let cur=parseInt((song.currentTime/60).toFixed(2));
            let  sec=Math.round(song.currentTime)%60;
            curMin=cur,curSec=sec;
            if(cur<10)
            curMin='0'+cur;
            if(sec<10)          
            curSec='0'+sec;
            start.innerText=curMin+":"+curSec;
    playNext();
});