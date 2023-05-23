const root = document.getElementById("root"); 
const dayInput = document.getElementById("day"); 
const monthInput = document.getElementById("month"); 
const yearInput = document.getElementById("year"); 
const btn = document.getElementById("button");
const INVALID_DAY = 32; 
const INVALID_MONTH = 13; 
const INVALID_VALUE = 0;
let inputDate;

let inputValues = {
    day: "",
    month: "",
    year: "",
};

const inputTextValue = (e) => {
    const value = e.target.value;
    const inputName = e.target.id; 
    inputValues[inputName] = value;
}

const calculateAge = () => {
    const currentDay = new Date();
    inputDate = new Date(`${inputValues.month}/${inputValues.day}/${inputValues.year}`);

    const getInputDay = inputDate.getDate();
    const getInputMonth = inputDate.getMonth();
    const getInputYear = inputDate.getFullYear();

    const getCurrentDay = currentDay.getDate();
    const getCurrentMonth = currentDay.getMonth();
    const getCurrentYear = currentDay.getFullYear(); 

    //if the inputs are empty, alert to add a date:
    if(!inputValues.day || !inputValues.month  || !inputValues.year){
        alert("insert a date"); 
    }
    
    //if day is zero or greater than 31 is an invalid day
    if(Number(inputValues.day) == INVALID_VALUE || Number(inputValues.day) >= INVALID_DAY) {
        alert("must be a valid day"); 
    }

     //if month is zero or greater than 12 is an invalid month
    if(Number(inputValues.month) == INVALID_VALUE || Number(inputValues.month) >= INVALID_MONTH) {
        console.log(inputValues.month);
        alert("must be a valid month"); 
    }

    if(inputValues.year == INVALID_VALUE) {
        alert("must be a valid year");
    }

    //if the getInputYear is greater than the getCurrentYear is an invalid year
    if(getInputYear >= getCurrentYear) {
        alert("the year must be in the past");
    }

    //if the day and moth is the same of the currenteDay date and month is your birthday!
    if(getCurrentDay == getInputDay && getCurrentMonth == getInputMonth) {            
        alert ("HAPPY BIRTHDAY!"); 
    }

    console.log("inputDate=>", inputDate, "currentDate=>",currentDay);
    //const age = currentDay - birthday;
}

dayInput.addEventListener("change", (e) => inputTextValue(e));
monthInput.addEventListener("change", (e) => inputTextValue(e));
yearInput.addEventListener("change", (e) => inputTextValue(e));
btn.addEventListener("click", calculateAge);








/**
 * to check the NaN value
 function isItNaN(x) {
			return x !== x;
		}
 */

//alert("hello there");
/*const title = document.createElement("h1"); 
title.innerHTML = "this is a counter"
root.appendChild(title);*/




    //if the inputs of: day and month are NaN, means to need add a correct value to calculate your age *
      /*if(!getInputDay) {
        alert("must be a valid day"); 
    }if(!getInputMonth) {
        alert("must be a valid month"); 
    }*/

    /** check the error: when the input value is the first day of the month and when the is january 
     * This occurs when the input for day and month is "1" 0r "01": 
     *          getDate();  of "1" || "01" => // 0;
     *          getMonth(); of "1" || "01" => // 0;
     *    
    **/