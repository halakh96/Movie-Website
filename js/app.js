
const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";


// // ---------- Get Trending Movies ----------------
const Trending_apiUrl= 'https://api.themoviedb.org/3/trending/movie/day?api_key=dddcc98fb8bd593bb9ea017eadac6c61';
axios
.get(Trending_apiUrl)
.then ((res) =>{ console.log(res.data.results)
document.getElementById("Trending").innerHTML = res.data.results.map(item=> 
       ` <div class="col col-md-2 p-1 m-1"> 
        <div class="card border-0"data-bs-toggle="modal" data-bs-target="#TheModalBox">
        <img src="${imgPath+item.poster_path}" height="300px">
        </div>
<div class="modal fade" id="TheModalBox" tabindex="-1" aria-labelledby="ModalBoxLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content bg-darkGray p-4">
         <h2>${item.title}
         <div type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></div>
         </h2>
         <p>${item.release_date}</p>
        <p>${item.overview}</p>
    </div>
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
       ` <div class="col-6 col-md-2 mb-4 m-md-1"> 
        <div class="card border-0">
        <img src=${imgPath+item.poster_path}>
        <div class=" text-center bg-black">
        <a class="btn "data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#TheModalBox" onclick="MoviesDetails(${item.id})">Details</a>
        <a><i class="far fa-heart btn" ></i></a>
        <a><i class="fas fa-plus btn "></i></a>
        </div>
        </div>
        </div>`
        ).join('')
})
}

// ---------- Modal Box of Movies details ----------------

function MoviesDetails (movie_id){
axios
.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=videos,similar,credits`)
.then((res)=>{console.log(res.data)
 let item = res.data;
 document.getElementById("TheModalBox").innerHTML = 
 `
 <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
 <div class="modal-content bg-darkGray p-4">
      <h2>${item.title}
      <div type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></div>
      </h2>
      <p>${item.release_date}</p>
     <p>${item.overview}</p>
 </div>
</div>
 `;
    
})
}

// ---------- Fav List ----------------
