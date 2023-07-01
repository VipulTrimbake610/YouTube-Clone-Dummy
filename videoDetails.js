const baseUrl = "https://www.googleapis.com/youtube/v3";
const APIKey="AIzaSyBeQTEzcCN3giIt6FOkYDQ7tS-qP4eCykY";

// const body = document.getElementsByTagName("body")[0];
// console.log(body)
const main = document.getElementById("main");
    const videoId = localStorage.getItem("videoId");
    const iframe = document.getElementById("yt-frame");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    // console.log("hello");
    // console.log("video Id"+videoId);
    getVideoData();


    const subscribe = document.getElementById("btnSub");
    subscribe.addEventListener("click",function(e){
        e.target.style.backgroundColor = "gray";
      
    })

    async function getVideoData(){
        const response = await fetch(`${baseUrl}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${APIKey}`);
        const data = await response.json();
        // console.log(data);
        const cTitle = data.items[0].snippet.channelTitle;
        const title = data.items[0].snippet.title;
        const desc = data.items[0].snippet.description;
        const views = data.items[0].statistics.viewCount;
        const duration = data.items[0].contentDetails.duration;
        let publish = data.items[0].snippet.publishedAt;

        publish = publish.slice(0,10);

        const titleE = document.querySelector(".details .title");
        titleE.innerHTML = title;
        const viewsE = document.querySelector(".details1 .views");
        viewsE.innerHTML = `${views} views . ${publish}`;
        
        const chanNameE= document.querySelector(".chanName");
        chanNameE.innerHTML = cTitle;

        const descE = document.querySelector(".descTitle");
        descE.innerHTML = desc;  
        commentThreads();
    }
    async function commentThreads(){
        const response = await fetch(`${baseUrl}/commentThreads?key=${APIKey}&videoId=${videoId}&part=snippet&maxResults=10&order=time`);
        const data = await response.json();

        for(let i=0;i<data.items.length;i++){

            let data1 = data.items[i].snippet.topLevelComment.snippet;
            let picture = data1.authorProfileImageUrl;
            let name = data1.authorDisplayName;
            let text = data1.textDisplay;
            let url = data1.authorChannelUrl;
            // const arr = data.items;
            
            let pcomment = document.createElement("div");
            pcomment.className = "pcomments";
            pcomment.innerHTML = `<div class="comLogo">
                                <img src="${picture}" alt="Image">
                            </div>
                            <div class="commentData">
                                <div class="cName">${name} <span class="cDuration">8 hours ago</span></div>
                                <div class="cText">${text}</div>
                                <div class="likedis">
                                    <img src="Images/OpenedPage/Liked.png" alt="LikeBtn">
                                    <span>3</span>
                                    <img src="Images/OpenedPage/DisLiked.png" alt="DisLiked">
                                    <span class="reply">REPLY</span>
                                </div>
                            </div>`;
            const pc = document.getElementById("pc");
            pc.appendChild(pcomment);
        }
     
    }
    