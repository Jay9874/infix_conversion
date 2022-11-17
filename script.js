var prioArray = [
    {
        sign : "(",
        value : 1,
    },
    {
        sign : "+",
        value : 2,
    },
    {
        sign : "-",
        value : 2,
    },
    {
        sign : "*",
        value : 3,
    },
    {
        sign : "/",
        value : 3,
    },
    {
        sign : "^",
        value : 4,
    },
]

var infix = "";
var numberButton = document.querySelectorAll(".conv-btn").length;
for(var i=0; i<numberButton; i++){
    document.querySelectorAll(".conv-btn")[i].addEventListener("click", function(){
        infix = document.getElementById("infixExp").value;
        var askedConv = this.innerHTML;
        if(askedConv == "Convert" || askedConv == "Evaluate"){
            var postfix = toPostfix(infix);
            var prefix = toPrefix(infix);
            document.querySelector(".postfix-answer-text").innerHTML = postfix;
            document.querySelector(".prefix-answer-text").innerHTML = prefix;
        }
    });
}



// Checks the preference of the scanned element with stack top element
function priorityChecker(topElement, scnElement){
    var topVal;
    var scnVal;
    for(var i=0; i<6; i++){
        if(prioArray[i].sign == topElement){
            topVal = prioArray[i].value;
        }
        if(prioArray[i].sign == scnElement){
            scnVal = prioArray[i].value;
        }
    }
    if(topVal < scnVal){
        return false;
    }
    else {
        return true;
    }
}


// Do all the conversions.
function doCalculation(postfix, n, st, infix){

    var asciiVal;
    for(var i=0; i<n; i++){
        asciiVal = infix[i].charCodeAt(0);
        if((asciiVal >= 65 && asciiVal <= 90) || (asciiVal >= 97 && asciiVal <=122) || (asciiVal >= 48 && asciiVal <= 57)){
            postfix += infix[i];
            console.log("scanned ele: "+infix[i]+" stack: "+st+" postfix: "+postfix);
        }
        else if(infix[i] == "("){
            st.push(infix[i]);
            console.log("scanned ele: "+infix[i]+" stack: "+st+" postfix: "+postfix);
        }
        else if(infix[i] == ")"){
            var topElement = st[st.length-1];
            console.log("stack: "+st+" postfix: "+postfix);
            while(topElement != "("){
                console.log("top in while is: "+topElement);
                var tmp = st.pop()
                postfix += tmp;
                topElement = st[st.length-1];
            }
            console.log("top in while is: "+topElement);
            st.pop();
        }
        else {
            var isGreater = priorityChecker(st[st.length-1], infix[i]);
            while(isGreater){
                var tmp = st.pop();
                postfix += tmp;
                console.log("scanned ele: "+infix[i]+" stack: "+st+" postfix: "+postfix);
                isGreater = priorityChecker(st[st.length-1], infix[i]);
            }
            st.push(infix[i]);
            console.log("scanned ele: "+infix[i]+" stack: "+st+" postfix: "+postfix);
        }
    }
    return postfix;
}


// Reverse the given expression with conditions
function strrev(strng){
    var tmp = "";
    console.log("given str: "+strng);
    for(var i=strng.length-1; i>=0; i--){
        if(strng[i] == "(") strng[i] = ")";
        else if(strng[i] == ")") strng[i] = "(";
        tmp += strng[i];
    }
    console.log("reversed: "+tmp);
    return tmp;
}





// Carry out the postfix conversion
function toPostfix(infix){
    var st = [];
    var postfix = "";
    var n = infix.length;
    return doCalculation(postfix, n, st, infix);
}



//  Carry out the prefix conversion

function toPrefix(infix){
    var tmpArr = infix.split("");
    infix = strrev(tmpArr);
    var st = [];
    var prefix = "";
    var n = infix.length;
    prefix = doCalculation(prefix, n, st, infix);
    tmpArr = prefix.split("");
    prefix = strrev(tmpArr);
    return prefix;
}









