const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";






// // ---------- Get Trending Movies ----------------
const Trending_apiUrl= 'https://api.themoviedb.org/3/trending/movie/day?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=credits';
axios
.get(Trending_apiUrl)
.then ((res) =>{ console.log(res.data.results)
document.getElementById("Trending").innerHTML = res.data.results.map(item=> 
       ` <div class="col col-md-2 p-1 m-1"> 
        <div class="card border-0"data-bs-toggle="modal" data-bs-target="#ModalBox">
        <img src="${imgPath+item.poster_path}" height="300px">
        </div>
<div class="modal fade" id="ModalBox" tabindex="-1" aria-labelledby="ModalBoxLabel" aria-hidden="true">
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

// ---------- Get Action Movies ----------------
const Action_apiUrl="https://api.themoviedb.org/3/discover/movie?api_key=dddcc98fb8bd593bb9ea017eadac6c61&with_genres=28"
axios
.get(Action_apiUrl)
.then ((res)=>{console.log(res.data.results)
    document.getElementById("Action").innerHTML = res.data.results.map(item=> 
        `<div class="col-6 col-md-2 mb-4 m-md-1"> 
        <div class="card border-0 ">
        <img src=${imgPath+item.poster_path}>
        </div>
        </div>`
).join('')
})


// ---------- Get Adventure Movies----------------
const Adventure_apiUrl="https://api.themoviedb.org/3/discover/movie?api_key=dddcc98fb8bd593bb9ea017eadac6c61&with_genres=12"
axios
.get(Adventure_apiUrl)
.then ((res)=>{console.log(res.data.results)
    document.getElementById("Adventure").innerHTML = res.data.results.map(item=> 
        `<div class="col-6 col-md-2 mb-4 m-md-1"> 
        <div class="card border-0 ">
        <img src=${imgPath+item.poster_path}>
        </div>
        </div>`
).join('')
})
