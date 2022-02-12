// Variables that target different HTML elements
var theBody = document.querySelector("#the_body");
var theCharacter = document.querySelector("#charcter_card");
var theIMG = document.querySelector("#the_IMG");
var theTitle = document.querySelector("#the_title");
var theDescription = document.querySelector("#the_description");
var theButtons = document.querySelector("#the_buttons");


// Random number generator.
// 'max' parameter accepts any value passed by the user.
var getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
};

// Randomly select and animal.
var whichAnimal = function () {
    var randomNumber = getRandomInt(9);
    console.log(randomNumber);

    if (randomNumber >= 0 && randomNumber < 3 ) {
        cat_function();
    } else if (randomNumber >= 3 && randomNumber < 6) {
        dog_function();
    } else {
        fox_function();
    }
};

// Grab a random image from 'thecatapi' and pass the data through the display_cat() function as a parameter
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
        theIMG.innerHTML = "<img class='image is-270x180' src=" + randomCat + ">";

        dnd();
    };
};

// Grab a random image from 'dog.ceo/api' and pass the data through the display_dog() function as a parameter
var dog_function = function() {
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
        var randomDog = data_dog.message;
        theIMG.innerHTML = "<img class='image is-270x180' src=" + randomDog + ">";

        dnd();
    }
}

// Grab a random image from 'randomfox.ca' and pass the data through the display_fox() function as a parameter
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
        theIMG.innerHTML = "<img src=" + randomFox + ">";

        dnd();
    };
};

// dnd() function, pull 1 of 300 monster characters and pass the data through the choose_chacter() function as a parameter
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
        var randomNumber = getRandomInt(data_dnd.results.length);
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

        // This function appends the animal image, DND character ability title, and ability description to the page.
        // Each character has a different # of attack options. So, use the Math.random() function to look at the 
        // special_abilities.length and pick a random attack.
        var choose_special_ability = function(data_dnd_desc) {
            var specialAbilityCount = data_dnd_desc.special_abilities;

            // If specifial abilities exist, then randomly select one. Else, re-run the dnd() function.
            if (specialAbilityCount) {
                specialAbilityCount = data_dnd_desc.special_abilities.length;
                var randomNumber = Math.floor(Math.random(specialAbilityCount));
                var theName = data_dnd_desc.name;
                var theAbility = data_dnd_desc.special_abilities[randomNumber].desc;

                theTitle.innerHTML = theName;
                theDescription.innerHTML = theAbility;    
            } 
            else {
                dnd();
            }
    };
};

// This function handles the 'Draw New Card' button.
var refresh = function() {
    var refreshButton = document.createElement("div");
    refreshButton.innerHTML = "<button class='button is-dark is-responsive is-medium is-fullwidth' onclick= whichAnimal()>Draw New Card</button>";
    theButtons.appendChild(refreshButton);
};

refresh();
whichAnimal();