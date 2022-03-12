// PSEUDO CODE


// 1. Determine whose turn it is: start with player one always first, add ability to randomize later. Keep this in mind.

//2. Highlight active player's board. Attach starfighter to mouse.

// 3.1 Active player selects a square. Square gets filled with active player's icon.

// 3.2 Status of that square as belonging to active player gets registered.

// 3.3 Square becoems ineligible for future moves until game reset.

// 3.4 Check neighboring squares for status... OR.... just put together
// OR OR OR OR
// 3.4  Preload the cases for every possible winning combo and check if any are fulfilled at the end of a round.

// 4. Declare victory, OR initiate next turn for opposing player

////////////////////////////////////////////////////////////
//------------------TODO-------------------------
// -Music toggle
// 
// 
//
//
//
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
//-------------------INITIALIZATION--------------------
///////////////////////////////////////////////////////

// Declare global variables and assign initial values
let playerOneScore = 0
let playerTwoScore = 0
let currentPlayer

// Tie HTML elements to global variables for score display, turn count, etc
backgroundVideo = document.querySelector('#background-video')

messageOutput = document.querySelector('#messageOutput') //sys message output element - player announcements, flavor stuff

playerOneStats = document.querySelector('#playerOneStats') // player stat windows
playerTwoStats = document.querySelector('#playerTwoStats')

scoreOutputP1 = document.querySelector('#scoreOutputP1') // score output elements
scoreOutputP2 = document.querySelector('#scoreOutputP2')

victoryScreen = document.querySelector('.victoryScreen') // Grab victory screen (default CSS to hidden)
victoryVideo = document.querySelector('#victoryVideo') // grab victory vid
victoryAnnouncement = document.querySelector('#victoryAnnouncement')
victoryScoreAnnouncement = document.querySelector('#victoryScoreAnnouncement')
victoryContinueBtn = document.querySelector('#victoryContinueBtn')

newGameScreen = document.querySelector('.newGameScreen') // Grab new game screen
rebelsFirstBtn = document.querySelector('#rebelsFirstBtn')
empireFirstBtn = document.querySelector('#empireFirstBtn')

// Music Mute button
// musicMuteBtn = document.querySelector('#musicMuteBtn i')


////////////////////////////////////////////////////////////
//------------------EVENT LISTENERS-------------------------
////////////////////////////////////////////////////////////

// New Game Screen - Who Goes First
rebelsFirstBtn.addEventListener('click', function() {rebelsFirst()})
empireFirstBtn.addEventListener('click', function() {empireFirst()})

// Select all spaces. Add a click event listener to each one. On click, call spaceClicked function, passing in that space's HTML ID as an argument.
document.querySelectorAll('.space').forEach(space => space.addEventListener('click', function (){spaceClicked(space.id)}))

// Reset button event listener.
document.querySelector('#reset').addEventListener('click', function(){reset(true)})

// Victory Continue Button event listener & Behavior.
victoryContinueBtn.addEventListener('click', function() {  
    droidConfirm.play()
    victoryScreen.style.visibility = 'hidden'
    clearBoard()
})

// Sound On/Off Icon Button listener
// musicMuteBtn.addEventListener('click', muteToggle)



////////////////////////////////////////////////////////////
//-------------SOUNDS------------------
////////////////////////////////////////////////////////////

// Declare and assign sounds- Rebel clicks
const xWingShot1 = new Audio('assets/sound/SFX-X_Wing_fire_1.mp3')
const xWingShot2 = new Audio('assets/sound/SFX-X_Wing_fire_2.mp3')
const xWingFly1 = new Audio('assets/sound/SFX-X_Wing_flyby_1.mp3')
const xWingFly2 = new Audio('assets/sound/SFX-X_Wing_flyby_5.mp3')

const rebelSoundArray = [xWingShot1,xWingShot2,xWingFly1,xWingFly2]
let rebelSoundi = 0

shuffleArray(rebelSoundArray)

function rebelSounds(){
    if(rebelSoundi >= 4) {rebelSoundi = 0}
    rebelSoundArray[rebelSoundi].play()
    rebelSoundi += 1
}

// Declare and assign sounds- Empire clicks
const tieShot1 = new Audio('assets/sound/SFX-TIE_Fighter_fire_1.mp3')
const tieShot2 = new Audio('assets/sound/SFX-TIE_Fighter_fire_2.mp3')
const tieShot3 = new Audio('assets/sound/SFX-TIE_Fighter_fire_3.mp3')
const tieFly1 = new Audio('assets/sound/SFX-TIE_Fighter_flyby_1.mp3')
const tieFly2 = new Audio('assets/sound/SFX-TIE_Fighter_flyby_4.mp3')

const empireSoundArray = [tieShot1,tieShot2,tieShot3,tieFly1,tieFly2]
let empireSoundi = 0

shuffleArray(empireSoundArray)

function empireSounds(){
    if(empireSoundi >= 4) {empireSoundi = 0}
    empireSoundArray[empireSoundi].play()
    empireSoundi += 1
}

//Invalid selection sound
const droidCurtReply = new Audio('assets/sound/Droid-Curt_Reply.mp3')

//Reset button sound
const droidWhoa =  new Audio('assets/sound/Droid-WEEEOOOOWW.mp3')

//Continue button sound
const droidConfirm = new Audio('assets/sound/Droid-Happy_Confirmation.mp3')

// Background ambience/music
// const musicBG = new Audio('assets/sound/Music-Duel_Fates.mp3')
const musicBG = document.querySelector('#musicBG')
// const ambientSpaceBattle =  new Audio('assets/sound/Ambient-Space_Battle.mp3')
const ambientSpaceBattle = document.querySelector('#ambientBG')

// Victory music
const musicEmpireVictory =  new Audio('assets/sound/Music-Imperial_March.mp3')
const musicRebelVictory =  new Audio('assets/sound/Music-Rebel_Victory.mp3')

// Draw music
const musicCantina = new Audio('assets/sound/Music-Cantina_Band.mp3')

// Alliance Victory Voice Clips
const voiceYoda900 = new Audio('assets/sound/Voice-Yoda-When_900_Years.mp3')
const voiceYodaDoDoNot = new Audio('assets/sound/Voice-Yoda-Do_Or_Do_Not.mp3')
const voiceObiForceAlways =  new Audio('assets/sound/Voice-Obi_Wan-Force_Be_With_You_Always.mp3')
const voiceHanGorgeous =  new Audio('assets/sound/Voice-Han_Solo-Gorgeous_Guy.mp3')

const rebelVictorySoundArray = [voiceYoda900,voiceYodaDoDoNot,voiceObiForceAlways,voiceHanGorgeous]
let rebelVSoundi = 0

shuffleArray(rebelVictorySoundArray)

function rebelVictorySounds(){
    if(rebelVSoundi >= 3) {rebelVSoundi = 0}
    setTimeout(function(){
        rebelVictorySoundArray[rebelVSoundi].play()
      }, 900)
    
    rebelVSoundi += 1
}

//Empire Victory voice clips
const voiceVaderStrong = new Audio('assets/sound/Voice-Darth_Vader-Force_Strong_With_This_One.mp3')
const voiceObiChosenOne = new Audio('assets/sound/Voice-Obi_Wan-You_Were_The_Chosen_One.mp3')
const voiceVaderRelease = new Audio('assets/sound/Voice-Darth_Vader-Release_Your_Anger.mp3')
const voiceVaderGiveYourself = new Audio('assets/sound/Voice-Darth_Vader-Give_Yourself_to_The_Dark_Side.mp3')
const voiceVaderDontUnderestimate = new Audio('assets/sound/Voice-Darth_Vader-Dont_Underestimate_The_Power.mp3')

const empireVictorySoundArray = [voiceVaderStrong,voiceObiChosenOne,voiceVaderRelease,voiceVaderGiveYourself,voiceVaderDontUnderestimate]
let empireVSoundi = 0

shuffleArray(empireVictorySoundArray)

function empireVictorySounds(){
    if(empireVSoundi >= 4) {empireVSoundi = 0}
    setTimeout(function(){
        empireVictorySoundArray[empireVSoundi].play()
      }, 1000)
    
    empireVSoundi += 1
}

//Draw voice clips
const voiceThreepioTechnical = new Audio('assets/sound/Voice-C3PO-Dont_Get_Technical.mp3')
const voiceHanSituationNormal =  new Audio('assets/sound/Voice-Han_Solo-Situation_Normal.mp3')

const drawSoundArray = [voiceThreepioTechnical,voiceHanSituationNormal]
let drawSoundi = 0

shuffleArray(drawSoundArray)

function drawSounds(){
    voiceHanSituationNormal.play()
    // if(drawSoundi >= 2) {drawSoundi = 0}
    // setTimeout(function(){
    //     drawSoundArray[drawSoundi].play()
    //   }, 1000)
    
    // drawSoundi += 1
}

////////////////////////////////////
// ARRAY SHUFFLER (for sound arrays)
////////////////////////////////////
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    // console.log(array)
}

// UNUSED MUSIC/SOUNDS

//////////////////////

//Initialize score display.
scoreOutputP1.innerText = playerOneScore
scoreOutputP2.innerText = playerTwoScore

//Initialize current player window --NOW HANDLED BY NEW GAME SCREEN
// playerOneStats.classList.add('currentPlayerWindow')

//Initialize background sounds and music. --NOW HANDLED BY NEW GAME SCREEN BUTTONS
ambientSpaceBattle.volume = .5
// setTimeout(function(){
//     ambientSpaceBattle.play()
//   }, 1000)

musicBG.volume = 1
// setTimeout(function(){
//     musicBG.play()
//   }, 1000)


// Start game!
newGame()


////////////////////////////////////////////////////////////
//----------------GAME FUNCTIONS--------------------
////////////////////////////////////////////////////////////
function newGame() {
    newGameScreen.style.visibility = 'visible' 
    messageOutput.innerText = ''
    playerOneStats.classList.remove('currentPlayerWindow')
    playerTwoStats.classList.remove('currentPlayerWindow')
}

function rebelsFirst() {
    droidConfirm.play()
    newGameScreen.style.visibility = 'hidden'
    playerOneStats.classList.add('currentPlayerWindow')
    currentPlayer = 'rebels'
    rebelsMsgColor()
    messageOutput.innerText = 'Rebels strike first!'
    musicBG.play()
    ambientSpaceBattle.play()
    backgroundVideo.play()
}

function empireFirst() {
    droidConfirm.play()
    newGameScreen.style.visibility = 'hidden'
    playerTwoStats.classList.add('currentPlayerWindow')
    currentPlayer = 'empire'
    empireMsgColor()
    messageOutput.innerText = 'Empire strikes first!'
    musicBG.play()
    ambientSpaceBattle.play()
    backgroundVideo.play()
}

// Switch message output colors to rebel colors
function rebelsMsgColor() {
    messageOutput.style.color = `greenyellow`
    messageOutput.style.textShadow = `0 0 10px green`
}

// Switch message output colors to empire colors
function empireMsgColor() {
    messageOutput.style.color = `red`
    messageOutput.style.textShadow = `0 0 10px`
}

// reset. asks user to confirm, then resets game and score.
function reset(full){
    droidWhoa.play()
    if(confirm('Are you sure you want to reset?')) {
        clearBoard()
        playerOneScore = 0
        playerTwoScore = 0
        updateScoreDisplay()
        newGame()
    }  
    else return
}

// Updates score for both players.
function updateScoreDisplay(){
    scoreOutputP1.innerText = playerOneScore
    scoreOutputP2.innerText = playerTwoScore
}

// Clears the board, but not scores.
function clearBoard() {
    musicEmpireVictory.pause()
    musicEmpireVictory.currentTime = 0
    musicRebelVictory.pause()
    musicRebelVictory.currentTime = 0
    musicCantina.pause()
    musicCantina.currentTime = 0

    ambientSpaceBattle.currentTime = 0
    ambientSpaceBattle.play()
    musicBG.play()

    document.querySelectorAll('.space').forEach(space => {
        space.classList.remove('rebelsControlled')
        space.classList.remove('empireControlled')
    })
    document.querySelectorAll('.space img').forEach(spaceImg => {
        spaceImg.src = ''
    })
}



// spaceClicked, called when any space on board is clicked.
function spaceClicked(spaceLocation){

    // console.log(`spaceClicked entered with ${spaceLocation}`)

    // assign elements to local variables for readability
    let currentLocationImg =  document.querySelector(`#${spaceLocation} img`)
    let currentLocationDiv = document.querySelector(`#${spaceLocation}`)

    // if space is occupied, play sound and return
    if((currentLocationDiv.classList.contains('rebelsControlled')) ||
    (currentLocationDiv.classList.contains('empireControlled'))){
        droidCurtReply.play()
    return
        }

    if(currentPlayer == 'rebels'){    
        // xWingShot2.play()
        rebelSounds() 
        currentLocationImg.src = 'assets/iconXWing.png'
        currentLocationDiv.classList.add(`${currentPlayer}Controlled`)
        checkVictory()


        messageOutput.style.color = `red`
        messageOutput.style.textShadow = `0 0 10px`
        messageOutput.innerText = `Empire's turn!`
        playerOneStats.classList.remove('currentPlayerWindow')
        playerTwoStats.classList.add('currentPlayerWindow')
        // nextTurn(currentPlayer)
        currentPlayer = 'empire'
    }

    else if(currentPlayer = 'empire') {
        // tieShot2.play()
        empireSounds()
        document.querySelector(`#${spaceLocation} img`).src = 'assets/iconTIEFighter.png'
        currentLocationDiv.classList.add(`${currentPlayer}Controlled`)
        checkVictory()

        messageOutput.style.color = `greenyellow`
        messageOutput.style.textShadow = `0 0 10px green`
        messageOutput.innerText = `Rebels' turn!`
        playerTwoStats.classList.remove('currentPlayerWindow')
        playerOneStats.classList.add('currentPlayerWindow')
        // nextTurn(currentPlayer)
        currentPlayer = 'rebels'
    }
    
}



function checkVictory() {
    //Check for Rebel victory
    let One1 = document.querySelector('#One1')
    let One2 = document.querySelector('#One2')
    let One3 = document.querySelector('#One3')
    let Two1 = document.querySelector('#Two1')
    let Two2 = document.querySelector('#Two2')
    let Two3 = document.querySelector('#Two3')
    let Three1 = document.querySelector('#Three1')
    let Three2 = document.querySelector('#Three2')
    let Three3 = document.querySelector('#Three3')

    // console.log('checking for victory')

    //REBEL VICTORY
    if((One1.classList.contains('rebelsControlled') && One2.classList.contains('rebelsControlled') && One3.classList.contains('rebelsControlled')) ||
    (Two1.classList.contains('rebelsControlled') && Two2.classList.contains('rebelsControlled') && Two3.classList.contains('rebelsControlled')) ||
    (Three1.classList.contains('rebelsControlled') && Three2.classList.contains('rebelsControlled') && Three3.classList.contains('rebelsControlled')) ||
    (One1.classList.contains('rebelsControlled') && Two1.classList.contains('rebelsControlled') && Three1.classList.contains('rebelsControlled')) ||
    (One2.classList.contains('rebelsControlled') && Two2.classList.contains('rebelsControlled') && Three2.classList.contains('rebelsControlled')) ||
    (One3.classList.contains('rebelsControlled') && Two3.classList.contains('rebelsControlled') && Three3.classList.contains('rebelsControlled')) ||
    (One1.classList.contains('rebelsControlled') && Two2.classList.contains('rebelsControlled') && Three3.classList.contains('rebelsControlled')) ||
    (One3.classList.contains('rebelsControlled') && Two2.classList.contains('rebelsControlled') && Three1.classList.contains('rebelsControlled'))) {
        musicBG.pause()
        
        rebelVictorySounds()
        musicRebelVictory.play()
        // console.log('rebel victory!')
        playerOneScore += 1
        updateScoreDisplay()
        let p1s = 's'
        if(playerOneScore == 1){
            p1s = ''
        }
        let p2s = 's'
        if(playerTwoScore == 1){
            p2s = ''
        }
        victoryAnnouncement.style.color = 'rgba(140, 255, 140, 0.8)'
        victoryScoreAnnouncement.style.color = 'rgba(140, 255, 140, 0.8)'
        victoryAnnouncement.style.textShadow = `0 0 10px green`
        victoryScoreAnnouncement.style.textShadow = `0 0 10px green`

        victoryVideo.src = 'assets/rebelVictory.mp4'
        victoryScreen.style.visibility = 'visible'
        victoryAnnouncement.innerText = 'REBEL VICTORY!'
        victoryScoreAnnouncement.innerText = `The Rebel Alliance now has ${playerOneScore} point${p1s}!\nThe Galactic Empire has ${playerTwoScore} point${p2s}.\n\nThe battle rages on!`

        messageOutput.style.color = `greenyellow`
        messageOutput.style.textShadow = `0 0 10px green`
        messageOutput.innerText = 'The time to retaliate is now! Launch X-Wings!'

    }

    //EMPIRE VICTORY
    else if((One1.classList.contains('empireControlled') && One2.classList.contains('empireControlled') && One3.classList.contains('empireControlled')) ||
    (Two1.classList.contains('empireControlled') && Two2.classList.contains('empireControlled') && Two3.classList.contains('empireControlled')) ||
    (Three1.classList.contains('empireControlled') && Three2.classList.contains('empireControlled') && Three3.classList.contains('empireControlled')) ||
    (One1.classList.contains('empireControlled') && Two1.classList.contains('empireControlled') && Three1.classList.contains('empireControlled')) ||
    (One2.classList.contains('empireControlled') && Two2.classList.contains('empireControlled') && Three2.classList.contains('empireControlled')) ||
    (One3.classList.contains('empireControlled') && Two3.classList.contains('empireControlled') && Three3.classList.contains('empireControlled')) ||
    (One1.classList.contains('empireControlled') && Two2.classList.contains('empireControlled') && Three3.classList.contains('empireControlled')) ||
    (One3.classList.contains('empireControlled') && Two2.classList.contains('empireControlled') && Three1.classList.contains('empireControlled'))) {
        musicBG.pause()

        empireVictorySounds()
        musicEmpireVictory.play()
        // console.log('empire victory!')
        playerTwoScore += 1
        updateScoreDisplay()
        let p1s = 's'
        if(playerOneScore == 1){
            p1s = ''
        }
        let p2s = 's'
        if(playerTwoScore == 1){
            p2s = ''
        }
        victoryAnnouncement.style.color = 'red'
        victoryScoreAnnouncement.style.color = 'red'
        victoryAnnouncement.style.textShadow = `0 0 10px red`
        victoryScoreAnnouncement.style.textShadow = `0 0 10px red`
        victoryVideo.src = 'assets/vaderHallway.mp4'
        victoryScreen.style.visibility = 'visible'
        victoryAnnouncement.innerText = 'EMPIRE VICTORY!'
        victoryScoreAnnouncement.innerText = `The Galactic Empire now has ${playerTwoScore} point${p2s}!\nThe Rebel Alliance has ${playerOneScore} point${p1s}.\n\nThe battle rages on!`
        
        messageOutput.style.color = `red`
        messageOutput.style.textShadow = `0 0 10px`
        messageOutput.innerText = `There will be no one to stop us this time. Launch TIEs!`
    }

    else { 
        let spaceArray = [One1, One2, One3, Two1, Two2, Two3, Three1, Three2, Three3]
        let spacesFilled = 0
        // console.log(spaceArray)
        spaceArray.forEach(space => {
            if((space.classList.contains('rebelsControlled')) ||
            (space.classList.contains('empireControlled'))) {
                spacesFilled += 1
            }
        if(spacesFilled >= 9) {
            // console.log('Draw!')
            musicBG.pause()
            musicCantina.play()
            setTimeout(function(){
                drawSounds()
              }, 1000)
            
            playerOneScore += 1
            playerTwoScore += 1
            updateScoreDisplay()
            let p1s = 's'
            if(playerOneScore == 1){
                p1s = ''
            }
            let p2s = 's'
            if(playerTwoScore == 1){
                p2s = ''
            }
            victoryAnnouncement.style.color = 'yellow'
            victoryScoreAnnouncement.style.color = 'yellow'
            victoryAnnouncement.style.textShadow = `0 0 10px white`
            victoryScoreAnnouncement.style.textShadow = `0 0 10px white`
            victoryVideo.src = 'assets/angryKylo.mp4'
            victoryScreen.style.visibility = 'visible'
            victoryAnnouncement.innerText = 'DRAW!'
            victoryScoreAnnouncement.innerText = `Both sides receive a point!\nThe Rebel Alliance has ${playerOneScore} point${p1s}.\nThe Galactic Empire has ${playerTwoScore} point${p2s}.\n\nThe battle rages on!`

            messageOutput.style.color = `red`
            messageOutput.style.textShadow = `0 0 10px`
            messageOutput.innerText = `Filthy rebels! Launch a counterattack!`
            }
        })
    }
}


function nextTurn(currentPlayer) {

}




