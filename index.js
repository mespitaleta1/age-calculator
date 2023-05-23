const root = document.getElementById("root"); 
const dayInput = document.getElementById("day"); 
const monthInput = document.getElementById("month"); 
const yearInput = document.getElementById("year"); 
const btn = document.getElementById("button");
const INVALID_DAY = 32; 
const INVALID_MONTH = 13; 
const INVALID_VALUE = 0;
const day = 1000*60*60*24;  
const month = 1000*60*60*24*30.5; 
const year = 1000*60*60*24*365;
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
    const age = currentDay - inputDate;

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

    const days = Math.floor((age / 1000) / day); 
    const months = Math.floor((age % 31557600000) / month);
    const years = Math.floor(age / year);

    const yourAge = `${years} years, ${months} months, ${days} days`; 
    const renderAge = document.createElement("h1"); 
    renderAge.innerHTML = yourAge;
    root.appendChild(renderAge);
}

dayInput.addEventListener("change", (e) => inputTextValue(e));
monthInput.addEventListener("change", (e) => inputTextValue(e));
yearInput.addEventListener("change", (e) => inputTextValue(e));
btn.addEventListener("click", calculateAge);