document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('theme')) {
        document.body.classList.add(sessionStorage.getItem('theme'));
    }
})