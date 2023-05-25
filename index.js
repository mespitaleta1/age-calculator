/* CONSTANTS */
const DAY = 1000*60*60*24;  
const MONTH = 1000*60*60*24*30.5; 
const YEAR = 1000*60*60*24*365; // or 31557600000 
const DEFAULT_STAMP_TEXT = "- -";
const CELEBRATE = "Happy Birthday you turned"
const ERROR_STATE = {
    DAY_ERROR_TEXT: "Must be a valid day",
    MONTH_ERROR_TEXT: "Must be a valid Month",
    YEAR_ERROR_TEXT: "Must be in the past", 
    VALID_YEAR: "Must be a valid year",
    VALID_DATE: "Insert a valid date",
};
const INVALID_INPUT = {
    DAY: 32, 
    MONTH: 13, 
    VALUE: 0,
}


/* NODE ELEMENTS */ 
const app = document.getElementById("app"); 
const dayInput = document.getElementById("day"); 
const monthInput = document.getElementById("month"); 
const yearInput = document.getElementById("year"); 
const btn = document.getElementById("button");

const dayLabel = document.getElementById("label-day"); 
const monthLabel = document.getElementById("label-month");
const yearLabel = document.getElementById("label-year");

const dayStamp = document.getElementById("days_text");
const monthStamp = document.getElementById("months_text"); 
const yearStamp = document.getElementById("years_text");



/* VARIABLES */
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

const showErrorMessage = (inputElem, labelElem, textError) => {
    const errorMessage = document.createElement("span"); 

    inputElem.classList.add("warning");
    labelElem.classList.add("error_text_state");        
    labelElem.append(errorMessage);
    errorMessage.innerHTML = textError;  
    errorMessage.classList.add("error_state");
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

    /* DATE VALIDATIONS */
    //if all the inputs are empty
    if(!inputValues.day || !inputValues.month || !inputValues.year){
        showErrorMessage(dayInput, dayLabel, ERROR_STATE.VALID_DATE); 
        showErrorMessage(monthInput, monthLabel, ""); 
        showErrorMessage(yearInput, yearLabel, ""); 
    }
    
    if(inputValues.day && inputValues.month && inputValues.year ){
        //if day is 31 on a month that has not 31 days ex: feb
         


        //if day is zero or greater than 31 is an invalid day
        if(Number(inputValues.day) == INVALID_INPUT.VALUE || Number(inputValues.day) >= INVALID_INPUT.DAY) {
            showErrorMessage(dayInput, dayLabel, ERROR_STATE.DAY_ERROR_TEXT); 
        }

        //if month is zero or greater than 12 is an invalid month
        if(Number(inputValues.month) == INVALID_INPUT.VALUE || Number(inputValues.month) >= INVALID_INPUT.MONTH) {
            showErrorMessage(monthInput, monthLabel, ERROR_STATE.MONTH_ERROR_TEXT);
        }

        //if year is zero is an invalid year
        if(Number(inputValues.year) == INVALID_INPUT.VALUE) {
            showErrorMessage(yearInput, yearLabel, ERROR_STATE.VALID_YEAR); 
        }

        //if the getInputYear is greater than the getCurrentYear is an invalid year
        if(getInputYear >= getCurrentYear) {
            showErrorMessage(yearInput, yearLabel, ERROR_STATE.YEAR_ERROR_TEXT);
        }

    };
     /* END OF DATE VALIDATIONS */


    /* CURRENT AGE CALC */
    const age = currentDay - inputDate;
    const days = Math.floor((age / 1000) / DAY); 
    const months = Math.floor((age % YEAR) / MONTH);
    const years = Math.floor(age / YEAR);
     /* END OF CURRENT AGE CALC */

    //render a default value if the year, month and day are not calculated
    if(years && months && years) {
        yearStamp.innerHTML = String(years); 
        monthStamp.innerHTML = String(months); 
        dayStamp.innerHTML = String(days); 
    } else {
        yearStamp.innerHTML = DEFAULT_STAMP_TEXT; 
        monthStamp.innerHTML = DEFAULT_STAMP_TEXT; 
        dayStamp.innerHTML = DEFAULT_STAMP_TEXT;
    }

    console.log(`${years} years, ${months} months, ${days} days`);


    //if the day and month is the same of the currenteDay day and month is your birthday!
    if(getCurrentDay == getInputDay && getCurrentMonth == getInputMonth) {            
        alert(`${CELEBRATE} ${years}!!!`); 
    }
}

dayInput.addEventListener("change", (e) => inputTextValue(e));
monthInput.addEventListener("change", (e) => inputTextValue(e));
yearInput.addEventListener("change", (e) => inputTextValue(e));
btn.addEventListener("click", calculateAge);