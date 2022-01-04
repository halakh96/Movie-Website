
const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";


// // ---------- Get Trending Movies ----------------
const Trending_apiUrl= 'https://api.themoviedb.org/3/trending/movie/day?api_key=dddcc98fb8bd593bb9ea017eadac6c61';
axios
.get(Trending_apiUrl)
.then ((res) =>{ console.log(res.data.results)
document.getElementById("Trending").innerHTML = res.data.results.map(item=> 
`<div class="col-6 col-md-2 mb-4 m-md-1"> 
    <div class="card border-0">
       <img src=${imgPath+item.poster_path}>
         <div class=" text-center bg-black  justify-content-md-between align-items-center">
             <a class="btn "data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
             <a><i class="far fa-heart btn  p-1 "onclick="FavList(${item.id})" ></i></a>
             <a><i class="fas fa-plus btn   p-1"></i></a>
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
`<div class="col-6 col-md-2 mb-4 m-md-1"> 
    <div class="card border-0">
      <img src=${imgPath+item.poster_path}>
        <div class=" text-center bg-black  justify-content-md-between align-items-center">
          <a class="btn "data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
          <a><i class="far fa-heart btn  p-1 "onclick="FavList(${item.id})" ></i></a>
          <a><i class="fas fa-plus btn   p-1"></i></a>
        </div>
    </div>
 </div>`
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
 
 document.getElementById("TheModalBox").innerHTML = 
 `
 <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
     <div class="modal-content bg-darkGray p-4">
      <h2>${item.title}
      <div type="button"  class="btn-close float-end white-text" data-bs-dismiss="modal" aria-label="Close"></div>
      </h2>
      <p>${item.release_date}|${genreList}</p>
      <p>${item.overview}</p>
      <p>${charNames}</p>
      <div>${item.videos.results}</div>
    </div>
</div>
 `;
    
})
}

// ---------- Fav List ----------------
function FavList (movie_id){
  console.log(movie_id,'id_FavList');
  axios
.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=videos,similar,credits`)
.then((res)=>{console.log(res.data)
 let item = res.data;
 let Favcards = [];
  Favcards.push(item);
  localStorage.setItem("Favcards", JSON.stringify(Favcards)); 
  console.log(localStorage.getItem("Favcards"));
  const main_favPage = document.getElementById("main");
  console.log(main_favPage);
  JSON.parse(localStorage.getItem("Favcards")).forEach(function(element){
`<div class="col-6 col-md-2 mb-4 m-md-1"> 
    <div class="card border-0">
      <img src=${imgPath+element.poster_path}>
    </div>
 </div>`
  });
 })

}