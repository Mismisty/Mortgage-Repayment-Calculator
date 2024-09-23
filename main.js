const form = document.getElementById('form');
const clearBtn = document.querySelector('.clear-btn');

const input1 = document.getElementsByClassName('input1');
const inputs = document.getElementsByClassName('input');

const mortgageAmountInput = document.getElementById('mortgage-amount');
const mortgageTermInput = document.getElementById('mortgage-term');
const interestRateInput = document.getElementById('interest-rate');

const mortgageTypeInputs = document.querySelectorAll('input[name="mortgage type"]');//repaymentTypeRadio
//const inputRadio = document.querySelectorAll('.input-radio');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');

const errorMsgs = document.querySelectorAll('.error-msg');

const resultsContainer = document.querySelector('.results');//SECOND CARD
const resultsHere = document.querySelector('.results-here');//FIRST CARD

const monthlyRepayments = document.querySelector('.monthly-repayments');//monthlyRepaymentDisplay
const totalRepay = document.querySelector('.total-repay');//totalRepaymentDisplay

const calculateBtn = document.querySelector('.calculate-btn');

const dollarSign = document.querySelector('.dollar-sign');
const years = document.querySelector('.years');
const percentage = document.querySelector('.percentage');





clearBtn.addEventListener('click', clearForm);

function clearForm() {
  
  //inputs.forEach(input => input.style.backgroundColor = 'none');
  console.log(dollarSign.value);
    form.reset();
    //resultsContainer.style.display = 'none';
    errorMsgs.forEach(errorMsg => errorMsg.textContent = '');
    dollarSign.style.backgroundColor = 'blue';
    
}



form.addEventListener('submit', (event) => {
    event.preventDefault();

   if (mortgageAmountInput.value.trim() === "") {
       input1[0].style.borderColor = 'hsl(4, 69%, 50%)';
       errorMsgs[0].style.display = 'block';
       dollarSign.style.backgroundColor = 'hsl(4, 69%, 50%)';
       dollarSign.style.color = 'white';
      
   } else{
       input1[0].style.borderColor = '';
       errorMsgs[0].style.display = 'none';
   }

   if (mortgageTermInput.value.trim() === "") {
       inputs[0].style.borderColor = 'hsl(4, 69%, 50%)';
       errorMsgs[1].style.display = 'block';
       years.style.backgroundColor = 'hsl(4, 69%, 50%)';
       years.style.color = 'white';
 }else{
      inputs[0].style.borderColor = '';
      errorMsgs[1].style.display = 'none';
 }

 if (interestRateInput.value.trim() === "") {
     inputs[1].style.borderColor = 'hsl(4, 69%, 50%)';
     errorMsgs[2].style.display = 'block';
     percentage.style.backgroundColor = 'hsl(4, 69%, 50%)';
     percentage.style.color = 'white';
}else{
     inputs[1].style.borderColor = '';
     errorMsgs[2].style.display = 'none';
}

  if(!mortgageTypeInputs.checked){
     errorMsgs[3].style.display = 'block';

  }else{
      errorMsgs[3].style.display = '';
  }

      
       

  const mortgageAmount = parseFloat(mortgageAmountInput.value);
  const mortgageTerm = parseFloat(mortgageTermInput.value) * 12; // Convert years to months
  const interestRate = parseFloat(interestRateInput.value) / 100 / 12; // Convert annual rate to monthly decimal
  const selectedOption = Array.from(mortgageTypeInputs).find((radio) => radio.checked);
  let monthlyPayment;

  if(selectedOption.value === 'repayment'){
    monthlyPayment = calculateRepayment(mortgageAmount, mortgageTerm, interestRate);
  }else{
    monthlyPayment = calculateInterestOnly(mortgageAmount, mortgageTerm, interestRate);
  }

  const totalRepayment = monthlyPayment * mortgageTerm;

  monthlyRepayments.textContent = `$${monthlyPayment.toFixed(2)}`;
  totalRepay.textContent = `$${totalRepayment.toFixed(2)}`;

  resultsHere.style.display = 'none';
  resultsContainer.style.display = 'block';
  
});

function calculateRepayment(principal, months, interest) {
  const numerator = principal * interest * Math.pow(1 + interest, months);
  const denominator = Math.pow(1 + interest, months) - 1;
  return numerator / denominator;
}

function calculateInterestOnly(principal, months, interest) {
  return principal * interest;
}

const inputRadio = option1.parentNode;


option1.addEventListener('click', () => {
  if(option1.checked) {
    option1.parentNode.style.borderColor ="hsl(61, 70%, 52%)";
    option1.parentNode.style.backgroundColor = 'hsla(65, 62%, 87%, 0.938)';
    option2.parentNode.style.backgroundColor = '';
    option2.parentNode.style.borderColor = '';
    
  }else{
    inputRadio.style.backgroundColor = ''; 
    
  }

});

const inputRadio2 = option2.parentNode;

option2.addEventListener('click', () => {
  if(option2.checked) {
    option2.parentNode.style.borderColor ="hsl(61, 70%, 52%)";
    option2.parentNode.style.backgroundColor = 'hsla(65, 62%, 87%, 0.938)';
    option1.parentNode.style.backgroundColor = '';
    option1.parentNode.style.borderColor = '';
  }else{
    inputRadio.style.backgroundColor = '';
  }


});



/*mortgageAmountInput.addEventListener('input', (e) => addCommas (e.target))
    

  function addCommas(el) {
    let regex = /\B(?=(\d{3})+(?!\d))/g
    if (typeof el === 'number') return el.toString().replace(regex, ',')
  console.log(addCommas);
    // check if el is an HTML element (e.g., e.target)
    if (el instanceof HTMLElement) {
      let val = el.value.replace(/[^0-9]/g, '')
  
      const parts = el.value.replace(/[^0-9]/g, '').split('.')
      parts[0] = parts[0].replace(regex, ',')
  
      el.value = parts.join('.')
    }
  }*/



