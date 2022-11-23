var prioArray = [
    {
        sign: "(",
        value: 1,
    },
    {
        sign: "+",
        value: 2,
    },
    {
        sign: "-",
        value: 2,
    },
    {
        sign: "*",
        value: 3,
    },
    {
        sign: "/",
        value: 3,
    },
    {
        sign: "^",
        value: 4,
    },
]

var infix = "";
var numberButton = document.querySelectorAll(".conv-btn").length;
for (var i = 0; i < numberButton; i++) {
    document.querySelectorAll(".conv-btn")[i].addEventListener("click", function () {
        infix = document.getElementById("infixExp").value;
        console.log(typeof(infix));
        var askedConv = this.innerHTML;
        if (askedConv == "Convert") {
            var postfix = toPostfix(infix);
            var prefix = toPrefix(infix);
            document.querySelector(".postfix-answer-text").innerHTML = postfix;
            document.querySelector(".prefix-answer-text").innerHTML = prefix;
        }
        if (askedConv == "Evaluate") {
            let infixArr = infix.split(' ');
            console.log(infixArr);
            let evalPost  = whichCheckbox(infixArr);
            document.querySelector(".postfix-eval-text").innerHTML = evalPost;
        }
    });
}


// Checks the preference of the scanned element with stack top element
function priorityChecker(topElement, scnElement) {
    var topVal;
    var scnVal;
    for (var i = 0; i < 6; i++) {
        if (prioArray[i].sign == topElement) {
            topVal = prioArray[i].value;
        }
        if (prioArray[i].sign == scnElement) {
            scnVal = prioArray[i].value;
        }
    }
    if (topVal < scnVal) {
        return false;
    }
    else {
        return true;
    }
}


// Do all the conversions.
function doCalculation(postfix, n, st, infix) {

    var asciiVal;
    for (var i = 0; i < n; i++) {
        asciiVal = infix[i].charCodeAt(0);
        if ((asciiVal >= 65 && asciiVal <= 90) || (asciiVal >= 97 && asciiVal <= 122) || (asciiVal >= 48 && asciiVal <= 57)) {
            postfix += infix[i];
            console.log("scanned ele: " + infix[i] + " stack: " + st + " postfix: " + postfix);
        }
        else if (infix[i] == "(") {
            st.push(infix[i]);
            console.log("scanned ele: " + infix[i] + " stack: " + st + " postfix: " + postfix);
        }
        else if (infix[i] == ")") {
            var topElement = st[st.length - 1];
            console.log("stack: " + st + " postfix: " + postfix);
            while (topElement != "(") {
                console.log("top in while is: " + topElement);
                var tmp = st.pop()
                postfix += tmp;
                topElement = st[st.length - 1];
            }
            console.log("top in while is: " + topElement);
            st.pop();
        }
        else {
            var isGreater = priorityChecker(st[st.length - 1], infix[i]);
            while (isGreater) {
                var tmp = st.pop();
                postfix += tmp;
                console.log("scanned ele: " + infix[i] + " stack: " + st + " postfix: " + postfix);
                isGreater = priorityChecker(st[st.length - 1], infix[i]);
            }
            st.push(infix[i]);
            console.log("scanned ele: " + infix[i] + " stack: " + st + " postfix: " + postfix);
        }
    }
    return postfix;
}


// Reverse the given expression with conditions
function strrev(strng) {
    var tmp = [];
    for (var i = strng.length - 1; i >= 0; i--) {
        if (strng[i] == "(") strng[i] = ")";
        else if (strng[i] == ")") strng[i] = "(";
        tmp.push(strng[i]);
    }
    return tmp;
}


// Carry out the postfix conversion
function toPostfix(infix) {
    var st = [];
    var postfix = "";
    var n = infix.length;
    return doCalculation(postfix, n, st, infix);
}


//  Carry out the prefix conversion
function toPrefix(infix) {
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


// Function for Postfix Evaluation of Infix Expression

function evaluateExpression(Expression, str){
    // Input Infix Expression --> (9-((3*4)+8)/4) (8*8/3+4-(5/3^9))

    // Creating an Empty Array for the Postfix Evaluation
    var evalArr = [];


    // 88*4/9+-
    // For Iterating through entire passed Postfix Expression(Expression)
    for (var i = 0; i < Expression.length; ) {
        // Scanned Elements from the passed Postfix Expression(Expression)
        var scan = Expression[i];

        // If the Scanned Element(scan) is a operand, directly push it into stack(evalArr)
        if(i==0 && !isNaN(scan)){
            evalArr.push(Number(scan));
            evalArr.push(Number(Expression[++i]));
            i++;
        }
        else if(i !=0 && !isNaN(scan)){
            evalArr.push(Number(scan));
            i++;
        }
        // If the Scanned Element(scan) is an mathematical operator then perform the operand calculation with the two Popped value
        else {
            // Iniatialization & Declaration of popped operands
            let val1 = evalArr.pop();
            let val2 = evalArr.pop();
            if(str === 'prefix'){
                let tmp = val1;
                val1 = val2;
                val2 = tmp;
            }
            switch (scan) {
                case '+':
                    evalArr.push(val2 + val1);
                    break;

                case '-':
                    evalArr.push(val2 - val1);
                    break;

                case '/':
                    evalArr.push(val2 / val1);
                    break;

                case '*':
                    evalArr.push(val2 * val1);
                    break;

                case '^':
                    evalArr.push(Math.pow(val2, val1));
                    break;
            }
            i++;
        }
        console.log(`scanned: ${Expression[i]} stack: ${evalArr}`);
    }
    console.log(evalArr);
    //Converting Array to String for displaying the result through innerHTML
    if(evalArr.length >1) return false;
    else {
        var evalStr = evalArr.toString();
        console.log("Postfix Evaluation Result: " + evalStr);
        return evalStr;
    }
    

}


// For switching between postfix evaluation and prefix evaluation
function whichCheckbox(infix){
    let postfix = document.querySelector('.postfix-box').checked;
    let prefix = document.querySelector('.prefix-box').checked;
    if(prefix && postfix){
        alert("Please check only one box.")

    }else if(postfix){
        var calVal = evaluateExpression(infix, 'postfix');
        if(!calVal){
            alert('Sorry, Expression invalid.');
        } else {
            return calVal;
        }
    }
    else if(prefix){
        infix = strrev(infix);
        calVal = evaluateExpression(infix, 'prefix');
        if(!calVal){
            alert('Sorry, Expression invalid.');
        } else {
            return calVal;
        }
    }
    else {
        alert("Please, check at most one box.");
    }
}



infix = 8+(-2)*(-3)/(-4)
// function onlyOne(checkbox) {
//     console.log(checkbox);
//     var checkboxes = document.getElementsByName('check');
//     checkboxes.forEach((item) => {
//         if (item !== checkbox) {
//             item.checked = false
//         }

//     })
//     // To get value of selected checkbox
//     var checkedValue = null;
//     var inputElements = document.getElementsByClassName('operation');
//     for (var i = 0; inputElements[i]; ++i) {
//         if (inputElements[i].checked) {
//             checkedValue = inputElements[i].value;
//             break;
//         }
//     };
//     console.log(checkedValue);
//     return checkedValue;
// }
    
