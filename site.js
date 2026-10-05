const lightbox=document.querySelector('#lightbox');if(lightbox){const image=lightbox.querySelector('img');document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{image.src=button.dataset.image;image.alt=button.querySelector('img').alt;lightbox.showModal()}));lightbox.querySelector('.close').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()})}

// Initialise each social video independently; switching cards never pauses playback.
(()=>{
 const section=document.querySelector('#social-videos');if(!section)return;
 const players=[];
 const toggle=section.querySelector('.social-scroll-toggle');
 toggle.addEventListener('click',()=>{const paused=section.classList.toggle('is-scroll-paused');toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume scrolling':'Pause scrolling';});
 function playAll(){players.forEach(p=>{try{p.mute();p.playVideo();}catch(e){}});section.querySelectorAll('.tiktok-player').forEach(f=>{f.contentWindow.postMessage({'x-tiktok-player':true,type:'mute'},'https://www.tiktok.com');f.contentWindow.postMessage({'x-tiktok-player':true,type:'play'},'https://www.tiktok.com');});}
 section.querySelector('.social-play-all').addEventListener('click',playAll);
 const previous=window.onYouTubeIframeAPIReady;
 window.onYouTubeIframeAPIReady=()=>{if(previous)previous();section.querySelectorAll('[data-youtube]').forEach(frame=>{const id=frame.dataset.youtube;players.push(new YT.Player(frame.id,{videoId:id,playerVars:{autoplay:1,mute:1,loop:1,playlist:id,playsinline:1,controls:1,rel:0,origin:location.origin},events:{onReady:event=>{event.target.mute();event.target.playVideo();}}}));});};
 window.addEventListener('message',event=>{if(event.origin!=='https://www.tiktok.com'||!event.data||!event.data['x-tiktok-player'])return;const frame=[...section.querySelectorAll('.tiktok-player')].find(f=>f.contentWindow===event.source);if(frame&&event.data.type==='onPlayerReady'){frame.contentWindow.postMessage({'x-tiktok-player':true,type:'mute'},event.origin);frame.contentWindow.postMessage({'x-tiktok-player':true,type:'play'},event.origin);}});
 if(window.YT&&window.YT.Player)window.onYouTubeIframeAPIReady();else{const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';document.head.appendChild(script);}
})();
