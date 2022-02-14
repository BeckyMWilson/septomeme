var galleryImg = JSON.parse(localStorage.getItem("Images"));
var theIMG = document.querySelector("#the_IMG");
var theTitle = document.querySelector("#the_title");
var theDescription = document.querySelector("#the_description");
galleryArray = [];

console.log(galleryImg);

var gallery = function() {
    for (var i = 0; i < galleryImg.length; i++) {

        var theIMG = galleryImg[i].picture;
        var theTitle = galleryImg[i].title;
        var theDescription = galleryImg[i].description;

        var store_picture = theIMG.innerHTML;
        var store_title = theTitle.innerHTML;
        var store_description = theDescription.innerHTML;
        var store_card = {picture: store_picture, title: store_title, description: store_description};

        galleryArray.push(store_card);
        
    }

}
gallery();
console.log(galleryArray)