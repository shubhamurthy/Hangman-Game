//potential words or phrases
var words=['javascript','cascading style sheets','hypertext markup language','variable','loop','boolean','string','conditional','number','function','object','script','math','document','window','browser','alert','computer']

var tries=1

//choose a random word from the word list, and turn it into an array of letters
function getword(){
  var word=words[Math.floor(Math.random()*words.length)];
  var wordarray=word.split('');
  return wordarray;
}

var wa = getword();

//generate a blank space for each letter of the selected word
function generateblanks(){
  document.getElementById('wordlength').innerHTML='The word or phrase is '+wa.length+' characters long.'
  document.getElementById('guess').textContent = '';
  for (var i=0; i<wa.length;i++){
    var div = document.createElement('div');
      div.style.width = '50px';
      div.style.height = '40px';
      div.style.borderBottom = 'thick solid black';
      div.style.color = 'black';
      div.style.float = 'left';
      div.style.textAlign = 'center';
      div.style.verticalAlign = 'bottom';
      div.style.marginBottom='15px';
      div.style.visibility='hidden';
      div.id='letter'+i;
      div.innerHTML = wa[i];
    document.getElementById('guess').appendChild(div);
  }
}

//if the letter exists in the the word, the div containing that word will become visible. If not, one of the divs that make up the hangman will become visible. If the entire hangman becomes visible, the user will be asked to start over.
function checkletter(l,answer){
  var c=0
  for (var i=0;i<answer.length;i++){
    if(l==answer[i]){
      c++;  document.getElementById('letter'+i).style.visibility='visible';
    }
  }
  if (c==0){
    alert('This character is not in the word or phrase.')
    document.getElementById('hm'+tries).style.visibility='visible';
    tries++;
    if (tries>8){
      var rel=confirm('Too bad! You were unable to figure out the word, which was "'+wa.join('')+'". Do you want to play again?')
      if (rel==true){
        window.location.reload()
      }
    }
  }
  
}

//if no more letters remain to be found, the user will be asked to start over.
function checkifdone(){
  var j=0;
  for (var i=0;i<wa.length;i++){
    var visibility = document.getElementById('letter'+i).style.visibility;
    if (visibility == 'hidden'){
      j++;
    }
  }
  if (j==0){
    var rel=confirm('Congratulations! You completed the word. Do you want to play again?');
    if (rel==true){
      window.location.reload();
    }
  }
}

//allows user to input a guess, checks if that letter is in the word, and lets the user know if they won or lost.
function altogether(){
  var guess = prompt('Enter a single lowercase letter or space.');
  checkletter(guess,wa);
  checkifdone();
}


