const DAY = 1000*60*60*24;  
const MONTH = 1000*60*60*24*30.5; 
const YEAR = 1000*60*60*24*365; // or 31557600000 
const DEFAULT_SPAN_TEXT = "- -";
const CELEBRATE = "Happy Birthday you turned";
const ERROR_MESSAGE = {
    DAY: "Must be a valid day",
    MONTH: "Must be a valid Month",
    YEAR: "Must be in the past", 
    VALID_YEAR: "Must be a valid year",
    VALID_DATE: "Must be valid date",
    EMPTY_FIELDS: "This field is required",
};

const INVALID_INPUT = {
    DAY: 32,
    MONTH: 13, 
    VALUE: 0,
};


const app = document.getElementById("app"); 
const dayInput = document.getElementById("day"); 
const monthInput = document.getElementById("month"); 
const yearInput = document.getElementById("year"); 
const btn = document.getElementById("button");

const dayLabel = document.getElementById("label-day"); 
const monthLabel = document.getElementById("label-month");
const yearLabel = document.getElementById("label-year");

const daySpan = document.getElementById("days_text");
const monthSpan = document.getElementById("months_text"); 
const yearSpan = document.getElementById("years_text");
const initialValues = {
    day: "",
    month: "",
    year: "",
}

yearSpan.innerHTML = DEFAULT_SPAN_TEXT; 
monthSpan.innerHTML = DEFAULT_SPAN_TEXT; 
daySpan.innerHTML = DEFAULT_SPAN_TEXT;


let days; 
let months; 
let years;
let birthDate;
let daysInMonth;
let dayCounter = INVALID_INPUT.VALUE;
let yearCounter = INVALID_INPUT.VALUE;
let monthCounter = INVALID_INPUT.VALUE;
let inputValues = {...initialValues};

let errors = {
    day: {
        input: dayInput,
        label: dayLabel,
        text: "",
    },
    month: {
        input: monthInput,
        label: monthLabel,
        text: "",
    },
    year: {
        input: yearInput,
        label: yearLabel,
        text: "",
    },
};


const inputTextValue = (e) => {
    const value = e.target.value;
    const inputName = e.target.id; 
    inputValues[inputName] = value;
    btn.removeAttribute('disabled');
};

const showErrorState = (inputElem, labelElem, textError) => {
    const errorMessage = document.createElement("span"); 

    inputElem.classList.add("error__state_warning");
    labelElem.classList.add("error__state_title");        
    labelElem.append(errorMessage);
    errorMessage.innerHTML = textError;  
    errorMessage.classList.add("error__state_text");
    btn.setAttribute("disabled", "");
};

const removeErrorState = (key, keyInput, keyLabel) => {

    if(key == "day") {
        dayInput.addEventListener("change", ()=>{
            keyInput.classList.remove("error__state_warning");
            keyLabel.classList.remove("error__state_title");

            spanElem = document.getElementsByClassName("error__state_text");
            spanElem[0]?.remove();

            monthInput.classList.remove("error__state_warning");
            monthLabel.classList.remove("error__state_title"); 
            yearInput.classList.remove("error__state_warning");
            yearLabel.classList.remove("error__state_title");
            btn.removeAttribute('disabled');
        }); 
    }

    if(key == "month") {
        monthInput.addEventListener("change", ()=>{
            keyInput.classList.remove("error__state_warning");
            keyLabel.classList.remove("error__state_title");

            spanElem = document.getElementsByClassName("error__state_text");

           if(spanElem[1].innerHTML == ERROR_MESSAGE.MONTH) {
                spanElem[1].remove();
            };

            spanElem[0]?.remove();

            dayInput.classList.remove("error__state_warning");
            dayLabel.classList.remove("error__state_title");
            yearInput.classList.remove("error__state_warning");
            yearLabel.classList.remove("error__state_title"); 
            btn.removeAttribute('disabled');
        }); 
    }

    if(key == "year") {
        yearInput.addEventListener("change", ()=>{
            keyInput.classList.remove("error__state_warning");
            keyLabel.classList.remove("error__state_title"); 
            
            spanElem = document.getElementsByClassName("error__state_text");
            spanElem[0]?.remove();

            dayInput.classList.remove("error__state_warning");
            dayLabel.classList.remove("error__state_title"); 
            monthInput.classList.remove("error__state_warning");
            monthLabel.classList.remove("error__state_title"); 
            btn.removeAttribute('disabled');
        }); 
    }
}

const getDaysInMonth = (yearValue, monthValue) => new Date(yearValue, monthValue, 0).getDate(); 

const calculateAge = () => {
    const currentDay = new Date();
    birthDate = new Date(`${inputValues.month}/${inputValues.day}/${inputValues.year}`);
    
    const getCurrentYear = currentDay.getFullYear();
    const getInputYear = birthDate.getFullYear();
    daysInMonth = getDaysInMonth(getInputYear, inputValues.month); 


    Object.keys(inputValues).map((key) => {
        const currentValue = inputValues[key];

        //if all the fields are empty
        if(!currentValue) {
            errors[key].text = ERROR_MESSAGE.EMPTY_FIELDS;
            showErrorState(errors[key].input, errors[key].label, errors[key].text);
            removeErrorState(key,errors[key].input, errors[key].label);
        } else {

            //if one or all the fields are zero
            if(currentValue == INVALID_INPUT.VALUE) {
                errors.day.text = ERROR_MESSAGE.DAY;
                errors.month.text = ERROR_MESSAGE.MONTH;
                errors.year.text = ERROR_MESSAGE.VALID_YEAR;
                showErrorState(errors[key].input, errors[key].label, errors[key].text);
                removeErrorState(key,errors[key].input, errors[key].label);
            }

            /*Validating the day field: */
            if(key == "day" && currentValue > daysInMonth ) {
                //if the day fields is greater than the limit of day per month eg: 30/feb/2020
                errors[key].text = ERROR_MESSAGE.VALID_DATE;
                showErrorState(errors[key].input, errors[key].label, errors[key].text); 
                showErrorState(monthInput, monthLabel, "");
                showErrorState(yearInput, yearLabel, "");
                
                if(errors[key].text == ERROR_MESSAGE.VALID_DATE) {
                    birthDate = new Date(`${inputValues.month}/0/${inputValues.year}`);
                }

                removeErrorState(key,errors[key].input, errors[key].label);
               
            } else if(key == "day" && currentValue >= INVALID_INPUT.DAY) {
                //if the day fields is greater than 31
                errors[key].text = ERROR_MESSAGE.DAY;
                showErrorState(errors[key].input, errors[key].label, errors[key].text); 
                showErrorState(monthInput, monthLabel, "");
                showErrorState(yearInput, yearLabel, "");

                removeErrorState(key,errors[key].input, errors[key].label);
            }

            //if the month field is greater or equal to 13 
            if(key == "month" && currentValue >= INVALID_INPUT.MONTH) {
                errors[key].text = ERROR_MESSAGE.MONTH;
                showErrorState(errors[key].input, errors[key].label, errors[key].text);
                showErrorState(dayInput, dayLabel, "");
                showErrorState(yearInput, yearLabel, "");

                removeErrorState(key, errors[key].input, errors[key].label);
            }

            //if the year field is greater or equal to the actual year
            if(key == "year" && currentValue >= getCurrentYear) {
                errors[key].text = ERROR_MESSAGE.YEAR;
                showErrorState(errors[key].input, errors[key].label, errors[key].text);
                showErrorState(dayInput, dayLabel, "");
                showErrorState(monthInput, monthLabel, "");
                if(errors[key].text == ERROR_MESSAGE.YEAR) {
                   // inputValues[key] = '0';
                    birthDate = new Date("0/0/0");
                    console.log("hey is a wrong year", birthDate, inputValues);
                }

                removeErrorState(key,errors[key].input, errors[key].label);
            }
        }
    });  

    let age = currentDay - birthDate;
    console.log(age, birthDate); 
    const hasBDateErrors =  errors.day.text || errors.month.text || errors.year.text
    if(age && !hasBDateErrors ) {


        daySpan.innerHTML = Math.floor((age / 1000) / DAY); 
        monthSpan.innerHTML = Math.floor((age % YEAR) / MONTH); 
        yearSpan.innerHTML = Math.floor(age / YEAR); 


/*        
Setting animation:
        const incrementDayAnimation = () => {
            dayCounter++;
            daySpan.innerHTML = dayCounter; 
            days = Math.floor((age / 1000) / DAY);
            if(dayCounter == days) {
                clearInterval(animateDay);
            }
        };

        
        const incrementMonthAnimation = () => {
            monthCounter++;
            monthSpan.innerHTML = monthCounter; 
            months = Math.floor((age % YEAR) / MONTH);
            if(monthCounter == months) {
                clearInterval(animateMonth);
            } 
        };

       
        const incrementYearAnimation = () => {
            yearCounter++;
            yearSpan.innerHTML = yearCounter; 
            years = Math.floor(age / YEAR);
            if(yearCounter == years) {
                clearInterval(animateYear);
            }     
       }
    
        const animateDay = setInterval(incrementDayAnimation, 40);
        const animateMonth = setInterval(incrementMonthAnimation, 40);
        const animateYear = setInterval(incrementYearAnimation, 40); 
        */
        btn.setAttribute("disabled", "");
    }

    //inputValues = {...initialValues}
}

dayInput.addEventListener("change", (e) => inputTextValue(e));
monthInput.addEventListener("change", (e) => inputTextValue(e));
yearInput.addEventListener("change", (e) => inputTextValue(e));
btn.addEventListener("click", calculateAge);