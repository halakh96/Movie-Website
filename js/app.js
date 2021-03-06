
const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";
let watchcards = [];
let Favcards = [];



//  ---------- Get Movies by search ----------------
const Form = document.querySelector(".bySearch form");
Form.addEventListener("submit",(event)=>{
  event.preventDefault();
let myInput = document.querySelector("#myInput").value;
console.log(myInput);
axios
.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&page=1&include_adult=false&query=${myInput}`)
.then ((res) =>{ console.log(res.data.results)
  document.getElementById("searchedMovie").innerHTML = res.data.results.map(item=> 
  `<div class="col-6 col-md-3 mb-4"> 
      <div class="card border-0">
         <img src=${imgPath+item.poster_path}>
           <div class=" text-center bg-black  justify-content-md-between align-items-center">
               <a class="btn test"data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
               <a><i class="far fa-heart btn p-1 test"onclick="FavList(${item.id})" ></i></a>
               <a><i class="fas fa-plus btn p-1 test"onclick="watchList(${item.id})"></i></a>
           </div>
        </div>
  </div>`
  ).join('')
  })
})

//  ---------- Get Trending Movies ----------------
const Trending_apiUrl= 'https://api.themoviedb.org/3/trending/movie/day?api_key=dddcc98fb8bd593bb9ea017eadac6c61';
axios
.get(Trending_apiUrl)
.then ((res) =>{ console.log(res.data.results)
document.getElementById("Trending").innerHTML = res.data.results.map(item=> 
`<div class="col-6 col-md-3 mb-4"> 
    <div class="card border-0 ">
       <img src=${imgPath+item.poster_path}>
         <div class=" text-center bg-black  justify-content-md-between align-items-center">
             <a class="btn test"data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
             <a><i class="far fa-heart btn p-1 test" onclick="FavList(${item.id})"></i></a>
             <a><i class="fas fa-plus btn p-1 test" onclick="watchList(${item.id})"></i></a>
         </div>
      </div>
</div>`
).join('')
})

// ---------- Get Movies ----------------
let actionCard = document.getElementById("Action");
MoviesCat(28,actionCard);

let Adventure = document.getElementById("Adventure") ;
MoviesCat(12,Adventure);

let AnimationCard = document.getElementById("Animation");
MoviesCat(16,AnimationCard);

let ComedyCard = document.getElementById("Comedy") ;
MoviesCat(35,ComedyCard);

let CrimeCard = document.getElementById("Crime");
MoviesCat(80,CrimeCard);

let DocumentaryCard = document.getElementById("Documentary") ;
MoviesCat(99,DocumentaryCard);

let DramaCard = document.getElementById("Drama");
MoviesCat(18,DramaCard);

let FamilyCard = document.getElementById("Family") ;
MoviesCat(10751,FamilyCard);

let FantasyCard = document.getElementById("Fantasy");
MoviesCat(14,FantasyCard);

let HistoryCard = document.getElementById("History") ;
MoviesCat(36,HistoryCard);

let HorrorCard = document.getElementById("Horror");
MoviesCat(27,HorrorCard);

let MusicCard = document.getElementById("Music") ;
MoviesCat(10402,MusicCard);

let RomanceCard = document.getElementById("Romance");
MoviesCat(10749,RomanceCard);

function MoviesCat (id,card){
axios
.get(`https://api.themoviedb.org/3/discover/movie?api_key=dddcc98fb8bd593bb9ea017eadac6c61&with_genres=${id}`)
.then ((res)=>{console.log(res.data.results)
    
card.innerHTML = res.data.results.map(item=> 
`<div class="col-4 col-md-3 col-lg-2 mb-4 "> 
    <div class="card border-0 " >
      <img src=${imgPath+item.poster_path} >
        <div class=" text-center bg-black  justify-content-md-between align-items-center">
          <a class="btn test"data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
          <a><i class="far fa-heart btn p-1 test"onclick="FavList(${item.id})"></i></a>
          <a><i class="fas fa-plus btn p-1 test"onclick="watchList(${item.id})"></i></a>
        </div>
    </div>
 </div>
 <div id="TheModalBox"class="modal fade">
   <div class="modal-dialog">
   </div>
 </div>
 `
).join('')
})
}

// ---------- Modal Box of Movies details ----------------

function MoviesDetails (movie_id){
  console.log(movie_id,"id");
axios
.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=videos,similar,credits`)
.then((res)=>{console.log(res.data)
 let item = res.data;
 let char = item.credits.cast;
 var charNames = []; 
 for(var i = 0; i < 4; i++){
  charNames.push(char[i].name);
 }
 let genre = res.data.genres;
 var genreList = genre.map((genre) =>{
  return genre.name;
});
let video = res.data.videos.results;
console.log(video);
let similarMovies = res.data.similar.results;
console.log(similarMovies);
var similarMoviesList = similarMovies.map((element)=>{
  return element;
})
 
 document.getElementById("TheModalBox").innerHTML = 
 `
 <div class="modal-dialog modal-xl modal-dialog-centered "">
    <div class="modal-content bg-darkGray p-4 text-center">
       <h2>${item.title}
       <div type="button" class=" float-end " data-bs-dismiss="modal" aria-label="Close">
       <i class="fas fa-times white-text" aria-hidden="true"></i>
       </div>
       </h2>
       <p>${item.release_date} | ${genreList} </p>
       <p>${item.overview}</p>
       <p>Cast : ${charNames}</p>
    <div>
      <p class="fs-3">Video Clip <p>
      <iframe height="400" width="100%"src="https://www.youtube.com/embed/${video[0].key}"</iframe>
    </div>
  </div>
</div>`;
    
})
}

// ---------- Fav List ----------------
function FavList (movie_id){
  if (!Favcards.includes(movie_id)){
  Favcards.push(movie_id);
  console.log(Favcards,'id_FavList');
  localStorage.setItem("Favcards", JSON.stringify(Favcards)); // "stringify" store as string 
  console.log(localStorage.Favcards);
  }
}
Favcards = [...JSON.parse(localStorage.getItem("Favcards"))]; 


// ---------- watch List ----------------
function watchList (movie_id){
  if (!watchcards.includes(movie_id)){
    watchcards.push(movie_id);
  console.log(watchcards,'id_watchList');
  localStorage.setItem("watchcards", JSON.stringify(watchcards)); // "stringify" store as string 
  console.log(localStorage.watchcards);
  }
}
watchcards = [...JSON.parse(localStorage.getItem("watchcards"))];