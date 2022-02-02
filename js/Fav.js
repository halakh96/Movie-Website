
const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";
const clearBtn = document.getElementById("clear");
let arr=[];

console.log(localStorage);
//  "parse" store as index
console.log(JSON.parse(localStorage.getItem("Favcards"))); 
JSON.parse(localStorage.getItem("Favcards")).forEach(function(element){

axios
.get(`https://api.themoviedb.org/3/movie/${element}}?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=videos,similar,credits`)
.then((res)=>{console.log(res.data,"each fetch")
arr.push(res.data);
console.log(arr);
document.getElementById("FavMain").innerHTML = arr.map(item=>
`<div class="col-md-3"> 
    <div class="card border-0 ">
      <img src=${imgPath+item.poster_path} >
        <div class=" text-center bg-black  justify-content-md-between align-items-center">
        <a class="btn test"onclick="RemoveFromList(${item.id})">Remove</a>
        </div>
</div>
</div>`).join('');
 })
})


// remove one movie from list
function RemoveFromList(Movie_id){
    Favarr = JSON.parse(localStorage.getItem("Favcards")) // get all fav movies from localStorage
    Favarr.splice(Favarr.indexOf(Movie_id), 1); // Remove the movie from list 
    console.log(Favarr, "My New List"); 
    localStorage.setItem("Favcards", JSON.stringify(Favarr)); // Update the list 
    location.reload(); // Refresh the page
       }


// clear all movies list
clearBtn.addEventListener("click",function(){
localStorage.removeItem("Favcards")
    location.reload();
    console.log("localStorage");
    })
