
const api_key = "dddcc98fb8bd593bb9ea017eadac6c61";
const imgPath = "https://image.tmdb.org/t/p/w342";
const clearBtn = document.getElementById("clear");
let arr=[];

console.log(localStorage);
//  "parse" store as index
console.log(JSON.parse(localStorage.getItem("watchcards"))); 
JSON.parse(localStorage.getItem("watchcards")).forEach(function(element){

axios
.get(`https://api.themoviedb.org/3/movie/${element}}?api_key=dddcc98fb8bd593bb9ea017eadac6c61&append_to_response=videos,similar,credits`)
.then((res)=>{console.log(res.data,"each fetch")
arr.push(res.data);
console.log(arr);
document.getElementById("watchMain").innerHTML = arr.map(item=>
`<div class="col-md-3"> 
    <div class="card border-0 ">
      <img src=${imgPath+item.poster_path} >
        <div class=" text-center bg-black  justify-content-md-between align-items-center">
        <a class="btn "onclick="RemoveFromList(${item.id})">Remove</a>
        </div>
</div>
</div>`).join('');
 })
})

// remove one movie from list
function RemoveFromList(Movie_id){
    Watcharr = JSON.parse(localStorage.getItem("watchcards")) // get all watch movies from localStorage
    Watcharr.splice(Watcharr.indexOf(Movie_id), 1); // Remove the movie from list 
    console.log(Watcharr, "My New List"); 
    localStorage.setItem("watchcards", JSON.stringify(Watcharr)); // Update the list 
    location.reload(); // Refresh the page
       }


// clear all movies list
clearBtn.addEventListener("click",function(){
    localStorage.clear("watchcards")
    location.reload();
    console.log("localStorage");
    })