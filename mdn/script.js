
var para = document.querySelector('p');

function createParagraph(){
  var para = document.createElement('p');
  para.textContent = 'ボタンが押されました！' ;
  document.body.appendChild(para);
}

var buttonsp= document.querySelectorAll('button');

for(var i = 0;i<buttons.length;i++){
  buttons[i].addEventListener('click',createParagraph);
}
