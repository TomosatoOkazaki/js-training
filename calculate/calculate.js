function createCalculateModel(){
  var memory = 0;
  var current = 0;
  var isInput = false;
  var point = 0;
  var m = {};

  m.toString = function(){
    var str = "";
    str += "isInput " + isInput + " ";
    str += "current " + current + " ";
    str += "memory " + memory + " ";
    return str;
  }

  m.all_clear = function(){
    memory = 0;
    current = 0;
    m.calc = null;
    isInput = false;
    point = 0;
  }

  m.point = function(){
    if(point ==0){
      point = 1;
    }
  }

  m.number = function(num){
    if(isInput == false){
      isInput = true;
      current = 0;
    }

    if(0<=current){
      //plus
      if(0<point){
        current += num * Math.pow(10,-point);
        point++;
      }
      else{
        current = current * 10;
        current += num;
      }
    }
    else{
      //minus
      if(0<point){
        current -= num * Math.pow(10,-point);
        point++
      }
      else{
        current = current * 10;
        current -= num;
      }
    }
  }

  m.equal = function(){
    if(m.calc != null){
      m.calc();
    }
    m.calc = null;
    memory = current;
    isInput = false;
    point = 0;
  }

  m.add = function(){
    m.equal();
    m.calc = function(){
      current = memory + current;
    }
  }

  m.minus = function(){
    current = -current;
  }

  m.sub = function(){
    m.equal();
    m.calc = function(){
      current = memory - current;
    }
  }

  m.multi = function(){
    m.equal();
    m.calc = function(){
      current = memory * current;
    }
  }

  m.getDisp = function(){
    return current;
  }

  m.clear = function(){
    current = 0;
    point = 0;
  }

  m.divide = function(){
    m.equal();
    m.calc = function(){
      if(current == 0){
        current = "err div 0";
        return;
      }
      current = memory / current;
    }
  }

  return m;
}
var calculate_model = createCalculateModel();

function createViewControl(){
  //フォーム作成
  var form = document.createElement("form");
  form.className = "top";
  //bodyの最後にformを追加
  document.body.appendChild(form);

  //top
  var top = document.createElement("table");
  top.className = "top";
  //formの最後にtopを追加
  form.appendChild(top);

  var tr = null;


  //テキストボックス
  function textbox(){
    var element = document.createElement("input");
    element.type = "text";
    element.value = 0;
    element.size = "100";
    element.readOnly = true;
    element.className = "text"
    var tde = td();
    tde.colSpan = 4;
    tde.appendChild(element);
    return element
  }

  var disp = null;
  
  function row(){
    var element = document.createElement("tr");
    element.className = "row";
    top.appendChild(element);
    tr = element;
  }

  function td(id){
    var tde = document.createElement("td");
    tde.className = "cell";
    tde.id = id;
    tr.appendChild(tde);
    return tde;
  }

  function out(){
    disp = textbox();
  }

  var debug_disp = null;
  function debug(){
    debug_disp = textbox();
  }

  function key(ch){
    var element = document.createElement("input");
    element.className = "button";
    element.type = "button";
    element.value = ch;
    td(ch).appendChild(element);
    return element;
  }

  function refresh(){
    disp.value = calculate_model.getDisp();
    debug_disp.value = calculate_model.toString();
  }

  function sp(){
    tr.appendChild(td());
  }

  function c(){
    key("C").onclick = function(){ calculate_model.clear(); refresh(); }
  }
  
  function ac(){
    key("AC").onclick = function(){ calculate_model.all_clear(); refresh(); }
  }

  function d(){
    key("/").onclick = function(){ calculate_model.divide(); refresh(); }
  }

  function m(){
    key("*").onclick = function(){ calculate_model.multi(); refresh(); }
  }

  function s(){
    key("-").onclick = function(){ calculate_model.sub(); refresh(); }
  }

  function a(){
    key("+").onclick = function(){ calculate_model.add(); refresh(); }
  }

  function e(){
    key("=").onclick = function(){ calculate_model.equal(); refresh(); }
  }

  function p(){
    key(".").onclick = function(){ calculate_model.point(); refresh(); }
  }

  function n(num){
    key(num).onclick = function(){ calculate_model.number(num); refresh(); }
  }

  function pm(){
    key("+/-").onclick = function(){ calculate_model.minus(); refresh(); }
  }

  //レイアウト
  {
    row();  out();
    row();  c();  ac(); pm(); d();
    row();  n(7); n(8); n(9); m();
    row();  n(4); n(5); n(6); s();
    row();  n(1); n(2); n(3); a();
    row();  n(0); p();  e();
    //row();  debug();
    var zero = document.getElementById(0);
    zero.colSpan = 2;
  }
  refresh();

}

window.onload = function(){
  createViewControl();
}
