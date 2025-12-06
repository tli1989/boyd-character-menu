document.addEventListener('DOMContentLoaded', () => {
    const waltonHead = document.getElementById('walton-head');
    const modal = document.getElementById('actor-modal');
    const closeButton = document.querySelector('.close-button');
    const audio = document.getElementById('walton-audio');
    const userNameInput = document.getElementById('user-name');

    waltonHead.addEventListener('click', () => {
        // Show Modal
        modal.classList.remove('hidden');
        
        // Focus input
        userNameInput.focus();

        // Play Audio
        // Note: Browsers often block audio autoplay unless triggered by a user interaction.
        // Since this is a 'click' event, it should generally work.
        audio.play().catch(error => {
            console.log("Audio play failed (maybe no file yet?):", error);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        audio.pause();
        audio.currentTime = 0;
    });

    // Close modal if clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
            audio.pause();
            audio.currentTime = 0;
        }
    });
});
