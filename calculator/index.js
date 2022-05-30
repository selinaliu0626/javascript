//greetings
let name=prompt("welcome,please enter you name");
if(name!=null){
  // set first char to uppercase
  var first=name.slice(0,1).toUpperCase();
  //resign name with first uppercase and others lower case
  name=first+name.slice(1,name.length).toLowerCase();
  //change h1
  document.querySelector("h1").innerHTML = "Welcome "+ name;
}
document.getElementById("form").style.display="none";

//--------------------------------------------

//show
function show(){
    var x=document.getElementById("form");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


// get sum function
function getSum() {
    var first=Number(document.getElementById("first").value);
    var second =Number(document.getElementById("second").value);
    var sum =Math.floor((first+second)*100)/100;
    document.getElementById("sum").innerText =sum;
    if(sum>10) {
        document.getElementById("alert").innerHTML = "This is a big number!";
    }else{
        document.getElementById("alert").innerHTML = "This is a small number!";
    }
}
//try again
//clear all inputs
function tryAgain(){
    document.getElementById("first").value ='';
    document.getElementById("second").value ='';
    document.getElementById("sum").innerText ='';
    document.getElementById("alert").innerHTML = '';
}

//goodbyc
function goodbye(){
    var form=document.getElementById("form");
    form.style.display="none";
    document.getElementById("alert").innerHTML = "Thanks for using this program!";
    document.getElementById("alert").style.color="#C70A80";
}













//-----------------------------------------------------------
var Calculator = {
    init: function () {
        var that = this;
        if (!that.isInited) {
            that.isInited = true;
            // record the info
            // total: Number,
            // next: String, next and total
            // action: String, operator
            that.data = {total: 0, next: '', action: ''};
            that.bindEvent();
        }
    },
    bindEvent: function () {
        var that = this;
        // get ckeys
        var keyboardEl = document.querySelector(".keys");
        keyboardEl && keyboardEl.addEventListener('click', function (event) {
            // get current dom
            var target = event.target;
            // get data-action
            var action = target.dataset.action;
            // get content
            var value = target.innerText;
            if (action === 'num' || action === 'operator') {
                that.result(value, action === 'num');
            }
        });
    },
    result: function (action, isNum) {
        var that = this;
        var data = that.data;
        if (isNum) {
            data.next = data.next === '0' ? action : (data.next + action);
            !data.action && (data.total = 0);
        } else if (action === 'AC') {
            // clear all cntent
            data.total = 0;
            data.next = "";
            data.action = "";
        } else if (action === '=') {
            if (data.next || data.action) {
                data.total = that.calculate(data.total, data.next, data.action);
                data.next = '';
                data.action = '';
            }
        } else if (!data.next) {
            data.action = action;
        } else if (data.action) {
            data.total = that.calculate(data.total, data.next, data.action);
            data.next = '';
            data.action = action;
        } else {
            data.total = +data.next || 0;
            data.next = '';
            data.action = action;
        }

        // get the value show in display
        var valEl = document.querySelector(".display");
        // print(data)
        valEl && (valEl.innerHTML = data.next || data.total || '0');
    },
    calculate: function (n1, n2, operator) {
        n1 = +n1 || 0;
        n2 = +n2 || 0;
        if (operator === '÷') {
            // divide
            return n2 === 0 ? 0 : Math.floor((n1 / n2) * 100) / 100;
        } else if (operator === 'x') {
            // mutiple
            return Math.floor((n1 * n2) * 100) / 100;
        } else if (operator === '+') {
            // add
            return Math.floor((n1 + n2) * 100) / 100;
        } else if (operator === '-') {
            // subtract
            return Math.floor((n1 - n2) * 100) / 100;
        }
    }
};
Calculator.init();