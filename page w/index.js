//Modal
document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.querySelector('#signup');
    const modalBg = document.querySelector('.modal-background');
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector('.modal-close');

    signupButton.addEventListener('click', () => {
        modal.classList.add('is-active');
    });

    modalBg.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });
});

// <div class="modal is-active">
// <div class="modal-background"></div>
// <div class="modal-content has-background-white py-5 px-5">
    // <h3 class="title mb-6"> travel to where?</h3>
// </div>

// </div>