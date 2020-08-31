//Check if It is operator is not
const CheckforOperator = (x) =>{
	if(x=='=' || x=='*' || x=='/' || x=='-' || x=='+')
        return true;
    return false;
}
//simplify the expression
const OppOperator = (op)=> {
	if(op=="+")
		return "-";
	if(op=="-")
		return "+";
	if(op=="*")
		return "/";
	if(op=="/")
		return "*";
    return op
}
//remove empty string from array
const removeEmp = (temp)=>{
    for(var i = temp.length - 1; i >= 0; i--) {
        if(temp[i].length === 0)
           temp.splice(i, 1);
    }
    return temp
}
const gettingX = (right,result) =>{
    let s = [];
    result = result.split(' ').join(",").replace(/[\s''x()]/g,'').split(",");
    result = removeEmp(result)
    let length = result.length;
    if(length>3){
        for (let i = 1; i < length; i++) {
            if (CheckforOperator(result[i]) && CheckforOperator(result[i+1])) {
                s.push(OppOperator(result[i])+result[i-1]+")"+OppOperator(result[i+1]));
                i++
            }else if(CheckforOperator(result[i]))
                s.push(OppOperator(result[i])+result[i-1]);
            else 
                s.push(result[i]);
        }
        return "("+right+s.join('');
    }
    return right+result.slice(0,result.length-1);
}
//Function that extracts each element from the object
let ans =[]
const Conversion = function(op){
	if(op=="subtract")
		return "-";
	if(op=="add")
		return "+";
	if(op=="divide")
		return "/";
	if(op=="multiply")
		return "*";
	if(op=="equal")
		return "=";
	return op
}
const partition = function (temp){
    for (var i in temp)
    {
        if (typeof temp[i] == "object" && temp[i] !== null)
            partition(temp[i]);
        else
                ans.push(Conversion(temp[i]));
    }
    return ans
}
// Convert to expression
const gettingExp = (pre_exp) =>{
    let s = [];
    let length = pre_exp.length;
    
    for (let i = length - 1; i >= 0; i--) {
    	if (CheckforOperator(pre_exp[i])) {
			let op1 = s[s.length-1]; s.pop();
		    let op2 = s[s.length-1]; s.pop();
	        let temp =''
	        if(i <= 1)
	            temp = op1 + " " + pre_exp[i] + " " + op2;
	        else 
	            temp = "(" + op1 + " " + pre_exp[i]+ " " + op2 + ")";
	        s.push(temp);
        }
        else
        	s.push((1, pre_exp[i]));
    }
    return s[s.length-1]
}

const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('input.JSON', 'utf8'));

let answer = gettingExp(partition(arr));
console.log(answer)
let left = answer.split('=')[0];
let right = answer.split('=')[1].trim();
let x = gettingX(right,left);
console.log("x = "+x);
console.log("x = ",eval(x));