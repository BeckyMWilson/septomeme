// Variable that appends the Animal image and DND Description to the page
var theBody = document.querySelector("#the_body");



// Random number generator, specifically for the dnd() function.
// Selects a number between 0 - 300, because there are a ton of characters.
var getRandomInt_dnd = function(max) {
    return Math.floor(Math.random() * max);
}


var whichAnimal = function () {
    var randomNumber = getRandomInt_dnd(9);
    console.log(randomNumber);

    if (randomNumber >= 0 && randomNumber < 3 ) {
        cat_function();
    } else if (randomNumber >= 3 && randomNumber < 6) {
        dog_function();
    } else {
        fox_function();
    }

}

// Grab a random image from 'thecatapi' and pass the data through the display_cat() function
// as a parameter
var cat_function = function() {
    var apiUrl_cat = "https://api.thecatapi.com/v1/images/search";
    fetch(apiUrl_cat)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    display_cat(data);
                    
                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Google Auth");
        });


    var display_cat = function(data_cat) {
            var randomCat = data_cat[0].url;
            var theIMG = document.createElement("h1");
            theIMG.innerHTML = "<img src=" + randomCat + ">";
            theBody.appendChild(theIMG);

            // Call the dnd() function
            dnd();
    };
}

var dog_function = function() {
    //var apiUrl = "https://random.dog/woof.json";
    var apiUrl = "https://dog.ceo/api/breeds/image/random";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    display_dog(data);
                    
                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Google Auth");
        });
    var display_dog = function(data_dog) {
            //var test2 = data_dog.url;
            var randomDog = data_dog.message;
            var theIMG = document.createElement("h1");
            theIMG.innerHTML = "<img src=" + randomDog + ">";
            theBody.appendChild(theIMG);

            dnd();
    }
}

var fox_function = function() {
    var apiUrl_fox = "https://randomfox.ca/floof/?ref=apilist.fun";
    fetch(apiUrl_fox)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    display_fox(data);
                    
                });
            } else {
                alert("Error: " + response.statusText)
            }
        })
        .catch(function(error) {
            alert("Unable to connect to Google Auth");
        });


    var display_fox = function(data_fox) {
            var randomFox = data_fox.image;
            var theIMG = document.createElement("h1");
            theIMG.innerHTML = "<img src=" + randomFox + ">";
            theBody.appendChild(theIMG);

            // Call the dnd() function
            dnd();
    };
}


// dnd() function, pull 1 of 300 monsters and passes that data through the choose_chacter() function as a parameter
var dnd = function() {
    var apiUrl_dnd = "https://www.dnd5eapi.co/api/monsters";
        fetch(apiUrl_dnd)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data);
                        choose_character(data);
                        
                    });
                } else {
                    alert("Error: " + response.statusText)
                }
            })
            .catch(function(error) {
                alert("Unable to connect to Google Auth");
            });
        
        // Based on the way the DND Monsters API stores data, you have to essentially pull the "url" and update
        // the API call to retarget a different subset of data, hence the var newAPIUrl below.
        // Then it takes that data and passes it through the choose_special_ability() function as a parameter.  
        var choose_character = function(data_dnd) {
            var randomNumber = getRandomInt_dnd(data_dnd.results.length);
            console.log("Random ID #:" + randomNumber);
            var character = data_dnd.results[randomNumber].url;
                var newAPIUrl = "https://www.dnd5eapi.co" + character;
                fetch(newAPIUrl)
                    .then(function(response) {
                        if (response.ok) {
                            response.json().then(function(data) {
                                console.log(data);
                                choose_special_ability(data);
                                
                            });
                        } else {
                            alert("Error: " + response.statusText)
                        }
                    })
                    .catch(function(error) {
                        alert("Unable to connect to Google Auth");
                    });

        };

        // This function essentially appends the ability or DND Monster attack to the page, below the Animal img. 
        // I noticed that no all characters get the same # of attack options. So, I use the Math.random() function to look at the 
        // Special Abilities length and pick a random attack.
        var choose_special_ability = function(data_dnd_desc) {
            var specialAbilityCount = data_dnd_desc.special_abilities;
            if (specialAbilityCount) {
                specialAbilityCount = data_dnd_desc.special_abilities.length;
                var randomNumber = Math.floor(Math.random(specialAbilityCount));

                var theName = data_dnd_desc.name;
                var theAbility = data_dnd_desc.special_abilities[randomNumber].desc;

                var theTitle = document.createElement("h1");
                var theIMG = document.createElement("h1");

                theTitle.innerHTML = theName;
                theIMG.innerHTML = theAbility;

                theBody.appendChild(theTitle);
                theBody.appendChild(theIMG);
            } else {
                dnd();
            }
            
            
            
            
        };
};




whichAnimal();