function addEventListeners() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].id = i
        squares[i].addEventListener('click', controller)
    }
}

function removeEventListeners () {
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', controller)
    }
}

function onload() {
    addEventListeners()
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })
    displayAIPlayer.textContent = game.player2.name
}

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}