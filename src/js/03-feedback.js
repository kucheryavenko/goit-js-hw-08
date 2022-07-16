import throttle from 'lodash.throttle'; // Импортируем throttle

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateFormInput();

// Сабмитим форму
function onFormSubmit(evt) {
    evt.preventDefault();

    if (formEl.email.value === '') {
        return alert('Email field must be filled!');
    }

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);  
}

// Отслеживаем инпуты на форме и добавляем их значения в хранилище
function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Возвращаем значения из хранилища в форму
function populateFormInput() {
    const savedValueInput = localStorage.getItem(STORAGE_KEY);
    const parseValueInput = JSON.parse(savedValueInput);
    
    if (savedValueInput) {
        formEl.email.value = parseValueInput.email || '';
        formEl.message.value = parseValueInput.message || '';
    }
}

