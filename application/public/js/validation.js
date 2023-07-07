function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var cPassword = document.getElementById("cpassword").value;

    var condition = false;

    if (username[0].match(/[a-zA-z]/i) == null){
        window.alert("Enter a username that begins with a character.");
        document.getElementById("username").focus();
        return false;
    }
    if (username.match(/(.*[a-zA-Z0-9].*){3}/gi) == null){
        window.alert("Enter a username that is 3 or more alphanumeric characters.");
        document.getElementById("username").focus();
        return false;
    }
    if (password.match(/(?=.*[A-Z])(?=.*\d)(?=.*[-/*+!@#$^&])[A-Za-z\d-/*+!@#$^&]{8}/gi) == null){
        window.alert("enter a password that is 8 or more characters AND contains at least 1 upper case letter AND 1 number and 1 of the following special characters.");
        document.getElementById("password").focus();
        return false;
    }
    if (password.match(cPassword) == null){
        window.alert("the password and confirm password inputs should be the same.");
        document.getElementById("cpassword").focus();
        return false;
    }
    return true;
}

const imgObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
        document.getElementById("jump-to-top-button").style.display = "none";
    } else{
        document.getElementById("jump-to-top-button").style.display = "inline-block";
    }
});





var prodList = document.getElementById("product-list");
var photoCount = 0;

//format the innerHTML for each photo  
function createTemplate(photoTitle, photoURL, photoID) {
    return `<div id = "${photoID}" onclick = "fadeOut(${photoID})">
    <img src = "${photoURL}" width = "200px" height = "200px"/>
    <h3> "${photoTitle}"</h3>
    </div>`
}

if (prodList) {
    var api_url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(api_url)
        .then((response) => { return response.json() })
        .then((photos) => {
            photoCount = photos.length;
            console.log(photos);
            photos.forEach((photo) => {
                let photoTitle = photo.title;
                let photoURL = photo.url;
                let photoID = photo.id;
                let oldHTML = prodList.innerHTML;
                prodList.innerHTML = oldHTML + createTemplate(photoTitle, photoURL, photoID);
            });

            document.getElementById("photo-counter").innerHTML = `There are ${photoCount} photos being shown`
        })
}

function fadeOut(photoID) {
    let post = document.getElementById(photoID);
    let countdown = setInterval(() => {
        clearInterval(countdown);
        post.style.opacity -= 0.5;
        post.remove();
        photoCount--;
        document.getElementById("photo-counter").innerHTML = `There are ${photoCount} photos being shown`
    }, 200)
}

