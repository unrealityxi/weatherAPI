var async1 = function(){
	return setTimeout(function(){
  	return 10;
  },1000);
}

var async2 = function(){
	return setTimeout(function(){
  	return 50;
  },2000);
}

var async3 = function(){
	return setTimeout(function(){
  	return 100;
  },3000);
}

var curryMeBaby = function(x){
	return function(y){
  	return function(z){
    	return x + y + z;
    }
  }
}

console.log(curryMeBaby(async1())(async2())(async3()));