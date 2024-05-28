document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // Hide the preloader after a delay
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000); // Adjust this value for longer or shorter preloader display

    const audioIcon = document.getElementById('audio-icon');
        const audio = document.getElementById('audio');

        audio.volume = 0.08;

        audioIcon.addEventListener('mouseenter', () => {
            audio.play();
            audioIcon.src = 'images/music2.gif'; // Change to the new icon
        });

        audioIcon.addEventListener('mouseleave', () => {
            audio.pause();
            audio.currentTime = 0;
            audioIcon.src = 'images/music2.png'; // Revert to the original icon
        });
});
