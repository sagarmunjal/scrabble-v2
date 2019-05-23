
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
    var gameId;

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

/*
    Inside the new game function we have to take care of the following
        - available array gets updated
        - attempt array has to be updated
        - 
*/

function newGame(){
    attempt = [];
    

    // pick a game returns any one game locations
    game = pickAGame();

    // gnerate 7x7 table
    generateTable('crossword', 7, 7, game[0]);

    // generate available and submit palette
    generateTable('paletteAvailable', 1, 6);
    generateTable('paletteSubmit',1,7);

    // content 

    available = words[gameId][0];
    available = available.split('');
    available = available.sort((a,b)=> {if(a>b) {return 1 }else if(a<b) {return -1 }else {return 0} } )
    available = available.map(data =>{
        return {
            value:data,
            available:true
        }
    })

    setDataInAvailable('paletteAvailable', available);
}

// modules
    /*================ set data in the palettes palette available  ======================= */
    /* 
        - it helps us to set data in available 
        - update the data in available and attempt
    */

    function setDataInAvailable(id,content){
        setContent("paletteAvailable",available);
    }


    /*================ set content  ======================= */
    function setContent(id,content, direction='a', startx=1, starty=1){

        // letter boxes will be filled using the data generated below
        var letterBoxesData = content.map((letter)=>{
            return {
                x: (() => {
                    if(direction == 'a')
                        return startx++
                    else
                        return startx
                })(),
                y: (() => {
                    if(direction == 'd')
                        return starty++
                    else
                        return starty 
                })(),
                val: letter.value,
                available: letter.available,
            }
        })
        
        // filling this data in the DOM 
        // along with filling the data we also the 
        letterBoxesData.forEach(function(letterBoxData){
            var letterBoxesDOM = document.querySelectorAll(`[data-table='${id}'][data-x='${letterBoxData.x}'][data-y='${letterBoxData.y}']`)

            if( letterBoxData.available == false ){
                letterBoxesDOM[0].classList.add('disabledClick');
                letterBoxesDOM[0].removeEventListener('click',handleButtonClick)
            }
            letterBoxesDOM[0].innerHTML = letterBoxData.val;
            

        })

    }

    /*================ to pick one game  ======================= */
        function pickAGame(){
            do{
                random = Math.floor(locations.length * Math.random())   
            }while(random == gameId){
                gameId = random
                game = locations[random]
                console.log(game);
                return game;
            }
        }

    /*================ generate tables   ======================= */
        function generateTable(id, rows, columns, positions){
            let tableref = document.getElementById(id);
            let tbl = [];
        
            let positionArr = []

            if(positions){
                for(var k =0; k<7; k++){
                    // follow hint positionArr in the end
                    positionArr.push(positions.split('',7))
                    positions = positions.substr(7)
                }
            }
    
            for ( var i =1; i<= rows; i++) {
                tbl.push("<tr>");
                    for (var j = 1 ; j<= columns; j++){
                        className = ''
                        if(positionArr.length > 0 && positionArr[i-1][j-1] == 'X'){
                            className = 'hasLetter'
                        }
                        tbl.push(`<td data-table=${id} data-x=${j} data-y=${i} class="${className }">   </td>`)
                    }
                tbl.push("</tr>")
            }

            tableref.innerHTML = tbl.join('');
        }