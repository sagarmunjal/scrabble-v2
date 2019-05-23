
/*
    Right now our app is very dumb, because we only play with a limited set of data. 
    We have 2 arrays words which is 2 dimention array.
        We can access the words using words[0][0]
    The locations array is also a 2 dimention array. 
        Inside the locations array at index 0 and 1. 
        We further have the locations data in the form of x's and following we have the starting point of the individual game.
*/

    var words = [
        ["purple", "pulp", "rue", "pure"], // game #1
        ["banish", "bash", "nab", "bias"] // game #2
    ];
    var locations = [
        ["xxxxXxxxxxxXxxxxxxXxxxXXXXXXxXxXxxxxXxXxxxxXxxxxx",
            "2,4,a", "5,1,d", "4,4,d", "2,4,d"], // game #1
        ["xxxXxxxxxXXXXxXxxXxxxXxxXxxxXXXXxxxxxxXxxxxxxxxxx",
            "4,1,d", "3,2,a", "1,3,d", "1,5,a"] // game #2
    ];

// declaring the data structures
// attempt will store the attempts made by the user
// whatever is left over will be updated in the available array
// filled will hold the entire word submitted by the user, 
// that will be then compared with the possible anagrams available in the words array.

attempt = [];
available = [];
filled = [];



/* 
    initiating the application
    We get the DOM element by using getElementById and store it in a variable 
*/

newGameButton = document.getElementById('new-game')
newGameButton.onclick = () => {
        newGame()
}  