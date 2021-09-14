const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const phone = document.getElementById('phone');

function error(input,message){
    input.classList.add('is-invalid');// bootstrap is-invalid class'ını ekledim. Eski class'lar duruyor
    const div = input.nextElementSibling; // her inputa göre aynı seviyedeki bir sonraki elemanını seçtim
    div.innerText = message; // hata mesajını içerisine yazdım
    div.classList.add('invalid-feedback');
}

function success(input){
    input.classList.add('is-valid');// bootstrap is-valid class'ını ekledim. Eski class'lar duruyor
}

// email validation kontrolü
function checkEmail(input) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return regex.test(String(email).toLowerCase());

    if(regex.test(input.value)){ //input value'sunu regex'e göre kontrol ediyorum
        success(input);
    }else{
        error(input,'Geçerli mail adresi giriniz.')
    }
}

function checkRequired(inputs){
    inputs.forEach(function(input){ // inputs array'i ile gelen herbir input için
        if(input.value === ''){ // herbir input'un değeri boş ise
            error(input, `${input.id} zorunlu alandır.`);
        }else{
            success(input);
        }
    }); 
}

function checkLength(input,min,max){
    if(input.value.length < min){ // input değeri min'den küçük ise
        error(input,`${input.id} ${min} karakter olmalıdır.`);
    }else if(input.value.length > max){ // input değeri max'dan büyük ise
        error(input,`${input.id} ${max} karakter olabilir.`);
    }else{
        success(input);
    }
}

function checkPasswords(input1,input2){
    if(input1.value !== input2.value){ // input1 ve input2 eşit değilse
        error(input2,'Şifreler Eşleşmedi');
    }
} 


function checkPhone(input) {
    const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // regex formatım 123-456-7890

    if(reg.test(input.value)){ // reg'e göre değeri kontrol ediyorum
        success(input);
    }else{
        error(input,'Geçerli telefon giriniz')
    }
}
    

form.addEventListener('submit',function(e){
    e.preventDefault();
    /* if(username.value === ''){
        error(username,'Boş bırakılamaz.');
    }else{
        success(username);
    }
    if(email.value === ''){
        error(email,'Boş bırakılamaz.');
    }else if(!validateEmail(email.value)){ // email validate kontrolü yapıyorum
        error(email,'Mail adresi geçerli değil.') // formatı geçerli değilse yeni bir hata mesajı gönderiyorum.
    }else{
        success(email);
    }
    if(password.value === ''){
        error(password,'Boş bırakılamaz.');
    }else{
        success(password);
    }
    if(repassword.value === ''){
        error(repassword,'Boş bırakılamaz.');
    }else{
        success(repassword);
    } */

    checkRequired([username,email,password,repassword]);
    checkEmail(email);
    checkLength(username,7,15);
    checkLength(password,7,10);
    checkPasswords(password,repassword);
    checkPhone(phone);
   
});