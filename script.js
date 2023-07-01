const baseUrl = "https://www.googleapis.com/youtube/v3";
// const APIKey="AIzaSyBeQTEzcCN3giIt6FOkYDQ7tS-qP4eCykY";
const APIKey="AIzaSyBYP0BIOpVyZ8PRsjqZ40VgU6BjdW7VjvM";
getData("");
async function getData(q){
    const response = await fetch(`${baseUrl}/search?key=${APIKey}&q:${q}&type=video&maxResults=20`);
    const data = await response.json();
    console.log(data)
    for(let i=0;i<20;i++){
        let vi = data.items[i].id.videoId;
        getVideos(vi);
    }
    // const card = document.getElementById("card");
    // card.addEventListener("click",function(){
    //     // e.preventDefault();
    //     window.open('./videoDetails.html');
    // })
}



async function getVideos(videoId){
    const response = await fetch(`${baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${APIKey}`);
    const data = await response.json();
    // console.log(data)
    const thumbnail =data.items[0].snippet.thumbnails.medium.url;
    const title = data.items[0].snippet.title;
    const channelName = data.items[0].snippet.channelTitle;
    const views = data.items[0].statistics.viewCount;
    const duration = data.items[0].contentDetails.duration;
    // console.log(thumbnail);
    const card = document.createElement("div");
    const section = document.getElementById("section");
    section.appendChild(card);
        card.id="card";
        // card.onclick = fun(videoId);
        card.innerHTML = `  <div class="thumbnail">
                                <img src=${thumbnail} alt="">
                            </div>
                            <div class="content">
                                <div class="logo">
                                    <img src="" alt="">
                                </div>
                                <div class="data">
                                    <div class="title">${title}</div>
                                    <div class="name">${channelName}</div>
                                    <div class="views">${views} . ${duration}</div>
                                </div>
                            </div>`;
        card.addEventListener("click",function(e){
            localStorage.setItem("videoId",videoId);
            window.open("./videoDetails.html");
        })
    // console.log(data)
}


const search = document.getElementById("search");
search.addEventListener("keypress",function(e){
    let searchString1;
   if(e.key === "Enter"){
        
        const section = document.getElementById("section");
        section.innerHTML = "";
        searchString = e.target.value;
        getData(searchString); 
    }
    const imgSearch = document.getElementById("imgSearch");
    imgSearch.addEventListener("click",function(){
        const section = document.getElementById("section");
        section.innerHTML = "";
        searchString = e.target.value;
        getData(searchString); 
    });
})