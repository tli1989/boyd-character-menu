document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('click-overlay');
    
    // Modal Elements
    const modal = document.getElementById('audio-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalCharName = document.getElementById('modal-char-name');
    const trackTitle = document.getElementById('track-title');
    
    // iPod Elements
    const centerBtn = document.getElementById('center-btn');
    const menuBtn = document.getElementById('menu-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const wheelPlayBtn = document.getElementById('wheel-play-btn');
    
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    
    // Gate Elements
    const emailGate = document.getElementById('email-gate');
    const emailForm = document.getElementById('email-form');

    // Easter Egg Elements
    const eggModal = document.getElementById('easter-egg-modal');
    const closeEggBtn = document.getElementById('close-egg');
    const eggTitle = document.getElementById('egg-title');
    const eggText = document.getElementById('egg-text');

    // State
    let currentAudio = null;
    let isUnlocked = false; 
    const FREE_LIMIT = 15; 
    let currentCharacterIndex = 0;
    
    // Store character data in an array for easy navigation
    const characters = [
        { 
            name: 'Ghost Grumpy',
            audioFile: 'ghost1.MP3',
            clipPath: 'polygon(1.30% 9.76%, 3.54% 9.57%, 4.99% 9.27%, 6.04% 8.72%, 5.38% 7.93%, 4.46% 7.39%, 4.59% 6.23%, 4.72% 4.89%, 5.78% 4.35%, 7.09% 3.37%, 9.86% 2.95%, 11.17% 2.95%, 13.01% 3.25%, 14.99% 3.80%, 15.51% 5.14%, 16.30% 5.62%, 16.30% 6.90%, 16.44% 7.20%, 16.30% 8.42%, 14.86% 8.91%, 14.99% 9.33%, 16.57% 10.12%, 18.28% 10.79%, 20.65% 11.09%, 21.96% 12.01%, 22.88% 13.65%, 23.41% 14.44%, 23.28% 15.53%, 23.54% 16.57%, 24.59% 17.05%, 24.86% 17.60%, 25.65% 19.42%, 27.36% 20.76%, 27.49% 21.61%, 27.75% 22.71%, 27.49% 23.56%, 25.91% 24.04%, 24.99% 22.89%, 24.20% 22.52%, 22.49% 21.55%, 21.04% 20.88%, 20.38% 19.73%, 20.38% 18.45%, 19.59% 17.84%, 18.94% 17.24%, 18.67% 17.84%, 18.67% 19.42%, 18.67% 20.64%, 18.67% 21.61%, 19.33% 22.59%, 19.86% 23.31%, 19.99% 23.86%, 22.49% 30.25%, 21.70% 26.54%, 22.49% 31.22%, 21.44% 31.70%, 19.86% 33.35%, 19.86% 34.32%, 19.07% 35.05%, 19.20% 35.84%, 15.25% 36.02%, 14.20% 36.02%, 14.46% 34.62%, 14.07% 33.77%, 12.75% 31.83%, 12.36% 30.55%, 10.91% 27.94%, 10.91% 26.48%, 10.65% 25.38%, 10.38% 24.41%, 10.78% 22.71%, 8.15% 22.59%, 5.25% 22.59%, 3.15% 21.79%, 2.22% 20.58%, 1.96% 19.61%, 1.44% 17.72%, 1.30% 16.81%, 1.30% 15.59%, 0.12% 13.47%, 0.12% 11.58%)',
            hasContent: true,
            secret: `You're an intelligence analyst. You've never met in person, but you've been the voice in his ear for months, guiding him, helping him, and quietly, under your breath, praying for him.

You don't realize he's become obsessed with the sound of your voice. You take a sick day and Ghost realizes you aren't there. 12 hours later… he's at your door.`
        },
        { 
            name: 'Boyd Crowder', 
            clipPath: 'polygon(26.70% 29.39%, 28.94% 27.21%, 31.44% 24.77%, 32.75% 21.55%, 34.46% 19.12%, 35.51% 16.57%, 37.09% 15.23%, 37.75% 13.89%, 34.46% 13.10%, 32.36% 12.31%, 30.25% 11.40%, 32.49% 9.94%, 33.54% 8.85%, 29.72% 8.48%, 27.09% 7.45%, 26.30% 5.50%, 27.62% 3.80%, 30.51% 3.25%, 32.75% 3.13%, 34.20% 3.56%, 37.09% 4.10%, 38.41% 4.83%, 40.65% 3.92%, 43.15% 3.56%, 46.30% 3.68%, 48.94% 4.29%, 49.46% 5.99%, 49.72% 7.45%, 47.88% 9.03%, 48.28% 9.15%, 51.04% 8.97%, 53.01% 9.27%, 55.12% 10.12%, 38.15% 5.99%, 38.15% 7.39%, 38.67% 8.36%, 40.25% 8.54%, 40.78% 8.85%, 40.78% 10.00%, 41.83% 10.91%, 38.01% 8.91%, 36.96% 10.37%, 36.70% 10.91%, 38.94% 11.52%, 39.72% 11.58%, 41.17% 11.34%, 41.57% 11.16%, 56.17% 10.79%, 57.62% 11.70%, 58.54% 12.13%, 58.54% 12.86%, 57.62% 13.65%, 56.44% 14.13%, 55.51% 14.80%, 53.41% 15.05%, 52.09% 15.41%, 50.12% 15.59%, 48.80% 16.32%, 48.01% 17.24%, 46.04% 18.39%, 45.25% 20.28%, 45.38% 21.86%, 45.78% 23.01%, 45.78% 24.04%, 45.51% 25.32%, 45.51% 27.15%, 45.51% 28.24%, 45.51% 29.46%, 46.04% 30.31%, 44.46% 30.85%, 42.49% 31.22%, 39.46% 32.25%, 35.38% 32.19%, 31.70% 31.83%, 29.20% 30.79%, 26.30% 30.73%, 26.30% 29.94%)',
            secret: 'Walton keeps a journal of every sunset he\'s ever seen. He\'s on volume 12.'
        },
        { 
            name: 'Mafia Prince', 
            clipPath: 'polygon(69.99% 1.55%, 73.28% 0.33%, 80.38% 0.21%, 87.75% 1.43%, 92.49% 4.83%, 94.20% 6.66%, 98.28% 8.78%, 99.46% 15.35%, 98.41% 19.55%, 96.70% 21.25%, 92.88% 21.31%, 91.30% 19.42%, 86.57% 18.33%, 81.17% 16.32%, 82.36% 15.78%, 84.86% 15.35%, 86.57% 14.86%, 87.09% 14.44%, 84.99% 12.98%, 83.54% 13.71%, 82.62% 14.26%, 81.96% 14.26%, 78.41% 12.74%, 76.30% 12.61%, 73.94% 11.95%, 73.01% 10.55%, 70.78% 10.30%, 68.28% 9.82%, 66.44% 8.85%, 65.78% 8.78%, 64.72% 7.75%, 63.80% 6.47%, 63.80% 5.62%, 64.07% 4.53%, 67.09% 2.58%, 65.65% 3.56%)',
            secret: 'OC1\'s favorite color changes depending on the weather.'
        },
        { 
            name: 'Crushing Ghost', 
            clipPath: 'polygon(65.25% 32.13%, 61.04% 31.22%, 58.28% 29.64%, 58.80% 28.54%, 60.78% 28.06%, 59.72% 26.54%, 59.72% 25.08%, 59.46% 24.29%, 58.28% 23.98%, 59.33% 23.19%, 61.70% 23.01%, 62.62% 22.46%, 64.20% 21.61%, 66.30% 19.97%, 66.30% 18.57%, 67.36% 17.78%, 65.38% 16.87%, 63.94% 16.69%, 61.96% 15.17%, 60.25% 13.77%, 60.12% 11.70%, 61.17% 10.67%, 62.62% 10.18%, 64.72% 9.45%, 67.88% 9.94%, 69.20% 10.61%, 71.30% 11.58%, 73.94% 13.83%, 73.94% 14.74%, 75.51% 15.29%, 77.88% 15.65%, 79.72% 15.96%, 81.96% 15.96%, 84.20% 16.57%, 86.17% 17.11%, 88.41% 17.72%, 89.59% 18.69%, 91.96% 20.28%, 93.28% 22.16%, 93.67% 24.41%, 93.67% 26.17%, 93.67% 28.18%, 93.67% 29.46%, 93.67% 30.79%, 92.36% 31.83%, 89.07% 31.77%, 86.70% 31.40%, 85.12% 30.31%, 84.07% 29.64%, 84.59% 28.54%, 84.72% 27.51%, 84.72% 26.90%, 84.20% 26.11%, 83.80% 25.50%, 81.83% 25.26%, 79.86% 24.77%, 77.75% 24.83%, 76.17% 25.32%, 75.38% 25.81%, 74.99% 26.78%, 74.99% 27.21%, 74.99% 27.51%, 74.99% 28.00%, 74.46% 28.24%, 72.62% 29.82%, 71.17% 30.18%, 70.38% 30.49%, 69.33% 30.85%, 69.07% 30.91%, 67.88% 31.58%, 67.22% 31.64%)',
            secret: 'Ghost2 is actually Ghost1\'s cousin. They don\'t talk about it.'
        },
        { 
            name: 'Young Bucky', 
            clipPath: 'polygon(81.17% 25.02%, 76.70% 25.50%, 75.38% 27.33%, 75.38% 28.60%, 75.38% 29.27%, 75.38% 29.82%, 74.20% 30.79%, 74.07% 31.28%, 70.78% 31.58%, 69.33% 32.31%, 69.07% 33.47%, 68.80% 34.68%, 66.57% 36.45%, 66.57% 37.85%, 66.04% 39.55%, 64.59% 41.19%, 64.46% 42.65%, 65.51% 42.77%, 66.57% 41.92%, 66.83% 41.37%, 67.62% 40.03%, 68.54% 39.37%, 69.86% 37.91%, 71.04% 37.05%, 71.57% 36.99%, 71.57% 37.72%, 71.57% 38.70%, 71.57% 39.91%, 71.57% 41.25%, 71.57% 42.16%, 70.51% 43.07%, 69.99% 44.53%, 69.99% 46.66%, 69.99% 47.15%, 69.99% 48.00%, 69.99% 49.58%, 69.99% 50.37%, 70.91% 51.40%, 73.41% 50.31%, 76.17% 49.82%, 77.22% 49.76%, 77.49% 49.76%, 80.12% 49.70%, 81.57% 49.70%, 82.36% 49.70%, 82.62% 49.76%, 83.94% 50.19%, 85.12% 50.19%, 85.51% 48.91%, 85.91% 47.88%, 86.04% 47.03%, 86.30% 44.53%, 87.22% 42.83%, 87.22% 42.22%, 87.22% 40.82%, 87.22% 39.37%, 87.62% 37.85%, 87.49% 37.30%, 87.49% 36.08%, 87.75% 35.96%, 89.59% 36.14%, 89.86% 36.08%, 92.49% 36.02%, 92.49% 35.29%, 92.22% 33.29%, 90.65% 32.68%, 88.15% 31.95%, 85.65% 31.58%, 84.20% 31.22%, 83.15% 30.31%, 82.36% 29.21%, 82.88% 28.18%, 82.88% 27.15%, 82.88% 26.54%, 82.88% 25.69%, 80.25% 25.02%, 78.41% 25.20%, 76.04% 25.99%, 75.91% 26.60%)',
            secret: 'Actor1 has never broken character. Not once. Not even at breakfast.'
        },
        { 
            name: 'Old Money Draco', 
            clipPath: 'polygon(35.25% 40.52%, 36.17% 39.43%, 37.36% 37.97%, 38.01% 37.05%, 39.33% 35.29%, 41.30% 35.29%, 43.01% 35.11%, 44.59% 34.74%, 47.36% 33.41%, 48.41% 32.74%, 48.41% 31.52%, 47.75% 30.98%, 47.75% 29.76%, 48.01% 28.91%, 49.46% 28.30%, 51.30% 28.00%, 52.36% 28.06%, 53.41% 28.24%, 55.78% 28.60%, 56.57% 28.85%, 56.17% 29.88%, 56.17% 31.16%, 56.04% 31.77%, 56.04% 32.56%, 56.44% 33.16%, 56.70% 33.77%, 58.54% 34.32%, 60.65% 34.99%, 61.44% 35.23%, 62.88% 35.66%, 63.41% 36.08%, 63.41% 36.87%, 63.41% 38.45%, 63.41% 39.67%, 63.41% 40.70%, 63.15% 41.61%, 62.62% 42.89%, 61.70% 43.99%, 61.04% 44.72%, 58.41% 45.63%, 56.44% 45.75%, 54.33% 45.93%, 52.88% 45.93%, 51.96% 44.96%, 50.51% 43.99%, 48.41% 42.89%, 44.72% 42.53%, 41.70% 42.47%, 39.86% 42.83%, 36.70% 40.70%, 38.94% 41.19%, 38.94% 41.74%, 38.94% 42.10%)',
            secret: 'Draco1 secretly loves muggle music. Especially Taylor Swift.'
        },
        { 
            name: 'Assassin', 
            clipPath: 'polygon(15.12% 38.57%, 16.83% 38.70%, 18.67% 39.30%, 19.33% 39.61%, 21.04% 40.22%, 22.09% 41.13%, 22.09% 42.34%, 23.54% 42.77%, 24.86% 43.32%, 25.51% 43.99%, 25.91% 44.59%, 25.91% 45.69%, 26.44% 47.03%, 24.59% 47.88%, 24.20% 48.79%, 24.46% 49.64%, 25.25% 50.25%, 26.96% 50.61%, 28.15% 50.86%, 29.99% 50.86%, 31.57% 50.86%, 33.15% 49.82%, 33.67% 48.42%, 35.12% 46.96%, 36.04% 46.24%, 36.57% 44.96%, 37.49% 43.92%, 38.41% 43.26%, 38.28% 41.74%, 36.57% 41.31%, 35.38% 40.95%, 33.67% 40.64%, 31.96% 40.09%, 30.78% 39.79%, 29.07% 39.18%, 27.62% 38.88%, 29.07% 38.21%, 29.59% 37.66%, 30.78% 36.87%, 32.22% 35.78%, 32.62% 34.20%, 31.44% 32.80%, 30.25% 31.83%, 28.15% 30.98%, 25.12% 30.98%, 21.83% 31.28%, 20.12% 31.83%, 18.94% 33.04%, 19.07% 34.44%, 19.07% 35.53%, 19.07% 36.08%, 18.15% 37.18%, 17.36% 37.48%, 16.44% 37.78%, 15.91% 38.03%)',
            secret: 'OC2 collects vintage postcards from places they\'ve never been.'
        },
        { 
            name: 'Richard Harrow', 
            clipPath: 'polygon(-0.01% 48.39%, 1.96% 48.39%, 4.72% 48.27%, 5.12% 47.66%, 5.12% 47.00%, 4.46% 46.08%, 3.01% 45.54%, 1.30% 44.38%, 1.17% 42.68%, 4.20% 42.31%, 6.83% 42.25%, 6.83% 41.22%, 8.15% 40.79%, 10.25% 40.06%, 13.54% 39.88%, 15.25% 39.88%, 16.96% 39.88%, 18.15% 40.13%, 18.94% 40.49%, 19.59% 41.04%, 19.59% 41.65%, 19.59% 42.56%, 19.86% 43.16%, 21.30% 43.53%, 23.54% 44.08%, 23.94% 44.08%, 24.07% 44.87%, 24.86% 45.72%, 24.86% 46.51%, 24.07% 46.93%, 22.75% 46.93%, 21.17% 47.24%, 20.51% 47.54%, 19.20% 48.09%, 18.94% 48.88%, 20.65% 49.24%, 22.49% 49.61%, 23.67% 50.16%, 24.33% 50.76%, 23.94% 52.16%, 22.22% 52.77%, 20.91% 53.62%, -0.01% 49.00%, -0.01% 50.16%, 0.12% 51.55%, 0.12% 53.62%, -0.01% 55.57%, -0.01% 56.72%, 0.25% 57.88%, 0.25% 59.03%, 0.25% 59.94%, 0.91% 61.10%, 0.91% 62.50%, 1.57% 62.50%, 3.54% 61.46%, 4.99% 61.46%, 7.22% 61.10%, 8.28% 60.80%, 9.86% 59.70%, 11.57% 58.85%, 13.67% 57.57%, 15.38% 56.72%, 16.04% 55.99%, 18.01% 54.47%, 19.07% 54.35%)',
            secret: 'Richard has read every book in his library twice. Alphabetically.'
        },
        { 
            name: 'Jax Teller', 
            clipPath: 'polygon(59.46% 65.72%, 60.12% 65.17%, 60.65% 64.32%, 61.70% 63.35%, 63.94% 62.38%, 64.99% 61.46%, 65.91% 60.55%, 67.36% 59.40%, 68.67% 58.55%, 71.04% 58.55%, 72.22% 58.24%, 72.22% 56.91%, 73.41% 56.05%, 73.41% 54.47%, 73.28% 53.01%, 73.15% 51.62%, 75.12% 50.64%, 77.36% 50.34%, 78.28% 50.34%, 82.49% 50.95%, 83.80% 51.62%, 85.91% 53.01%, 85.78% 55.20%, 85.91% 55.81%, 88.67% 56.24%, 89.07% 57.15%, 91.57% 57.45%, 93.01% 57.94%, 96.17% 58.91%, 98.41% 59.82%, 99.20% 60.61%, 58.41% 66.94%, 58.41% 67.97%, 58.15% 69.49%, 58.01% 70.71%, 58.15% 71.86%, 58.15% 72.04%, 60.51% 72.96%, 62.09% 72.59%, 64.20% 72.23%, 64.72% 72.23%, 65.25% 72.29%, 64.99% 73.08%, 65.38% 73.99%, 66.96% 73.87%, 69.99% 73.20%, 75.12% 73.02%, 79.46% 73.02%, 82.49% 72.96%, 84.59% 72.96%, 87.36% 72.71%, 89.59% 72.65%, 89.72% 74.60%, 89.33% 73.50%, 89.59% 75.63%, 92.75% 75.63%, 93.67% 75.39%, 95.12% 75.20%, 97.22% 74.05%, 99.20% 74.05%, 99.20% 73.38%, 99.07% 72.53%, 98.67% 70.46%, 98.54% 69.25%, 98.54% 67.79%, 98.80% 66.63%, 98.80% 65.42%, 98.67% 63.47%, 98.67% 62.19%, 98.67% 61.22%)',
            secret: 'Jax once won a staring contest against a statue. The statue blinked first.'
        },
        { 
            name: 'Happy Bucky',
            audioFile: 'bucky.MP3', 
            clipPath: 'polygon(39.07% 80.04%, 39.07% 81.62%, 39.07% 82.47%, 39.07% 83.20%, 39.07% 84.29%, 39.07% 85.63%, 39.07% 85.87%, 39.07% 86.66%, 39.07% 87.46%, 39.07% 88.85%, 39.07% 89.95%, 39.07% 90.43%, 39.07% 91.77%, 39.07% 92.56%, 39.07% 92.81%, 40.65% 92.81%, 43.41% 92.81%, 45.51% 92.81%, 48.15% 92.81%, 51.04% 92.99%, 54.72% 92.99%, 57.49% 92.99%, 59.07% 92.99%, 60.25% 92.81%, 60.25% 91.22%, 60.25% 90.19%, 60.12% 87.88%, 60.12% 86.30%, 60.12% 85.21%, 60.25% 84.17%, 60.25% 81.86%, 60.25% 80.46%, 60.25% 79.79%, 56.83% 79.79%, 54.86% 79.79%, 53.15% 79.79%, 50.25% 79.86%, 47.88% 79.86%, 46.70% 79.86%, 44.86% 79.86%, 43.54% 79.86%, 41.83% 79.86%, 41.30% 79.86%)',
            hasContent: true,
            secret: `Bucky's been disappearing at nights. People are worried. Where's he going? To find you– the last person on his amends list. Well…technically….the grand-daughter of the last person. As close as it's going to get. At first it really was about making amends, but now he just really wants to spend time with you.`
        },
        { 
            name: 'Drake the Enforcer',
            audioFile: 'oc3.MP3', 
            clipPath: 'polygon(0.91% 88.61%, 3.01% 87.70%, 5.65% 87.27%, 7.88% 86.66%, 10.51% 86.36%, 13.15% 85.75%, 14.33% 85.08%, 15.38% 84.29%, 14.72% 83.75%, 14.72% 82.04%, 14.86% 80.83%, 14.86% 80.10%, 14.20% 78.94%, 14.33% 77.24%, 15.65% 76.03%, 15.65% 75.05%, 17.22% 73.47%, 21.04% 72.32%, 23.54% 72.56%, 26.57% 72.62%, 29.33% 72.32%, 31.57% 72.44%, 31.57% 74.75%, 32.49% 75.90%, 32.49% 77.00%, 31.96% 73.47%, 32.49% 78.88%, 32.09% 80.10%, 32.09% 80.16%, 29.99% 81.50%, 30.12% 82.35%, 30.25% 83.75%, 31.96% 84.29%, 33.67% 84.42%, 35.51% 84.54%, 36.83% 84.84%, 37.49% 85.69%, 37.49% 86.66%, 37.36% 87.33%, 37.36% 88.12%, 37.36% 88.73%, 37.36% 89.16%, 37.36% 89.77%, 37.36% 90.68%, 37.36% 91.77%, 37.36% 92.44%, 37.36% 92.81%, 37.62% 93.53%, 42.49% 93.84%, 40.12% 93.66%, 45.65% 93.78%, 47.36% 93.90%, 46.83% 94.87%, 46.83% 95.97%, 46.83% 97.73%, 46.83% 99.13%, 44.99% 99.25%, 42.09% 99.25%, 38.28% 99.25%, 35.65% 99.25%, 32.36% 99.19%, 28.67% 99.31%, 26.30% 99.37%, 23.28% 99.37%, 18.67% 99.25%, 15.78% 99.25%, 12.36% 99.49%, 8.01% 99.49%, 4.72% 99.49%, 2.75% 99.61%, 1.57% 99.61%, 1.44% 98.09%, 1.44% 97.37%, 1.44% 96.39%, 1.17% 95.30%, 1.17% 93.90%, 1.17% 93.41%, 1.17% 92.44%, 1.17% 91.41%, 1.17% 90.43%, 1.17% 90.01%)',
            hasContent: true,
            secret: `You live after The Fall. Years of terrifying chaos made you willing to try anything to get out of the woods (literally). So you enter The Compound, a locked down paramilitary region controlled by Captain Forrest, and kept safe by forces led by the Compound's chief attack dog… Drake. Think mute scarred feral alpha vibes. Drake's barely ever said two words to anyone besides the Captain…until you get there.

The first job you're assigned, you mess up. But before you get thrown out of the Compound, Drake steps in.

"Thank you?"`
        },
        { 
            name: 'King Arthur', 
            clipPath: 'polygon(56.04% 99.61%, 56.04% 97.73%, 56.04% 94.87%, 56.17% 93.53%, 58.15% 93.53%, 60.78% 93.05%, 60.78% 91.16%, 60.78% 89.77%, 60.65% 88.55%, 60.78% 87.09%, 61.30% 86.18%, 64.72% 85.33%, 66.44% 84.96%, 68.80% 84.29%, 68.28% 82.83%, 68.28% 81.38%, 67.36% 80.46%, 67.36% 79.13%, 67.22% 78.09%, 66.17% 77.12%, 66.17% 75.66%, 68.28% 74.93%, 70.25% 74.69%, 72.36% 74.44%, 74.86% 74.38%, 75.51% 74.44%, 77.75% 74.51%, 82.36% 74.75%, 82.88% 76.03%, 82.88% 77.00%, 82.88% 79.07%, 82.75% 80.71%, 82.75% 81.92%, 83.41% 82.83%, 85.91% 82.96%, 89.07% 83.75%, 93.28% 84.17%, 95.91% 85.02%, 99.59% 86.00%, 97.62% 85.57%, 99.20% 86.85%, 99.20% 87.94%, 99.20% 89.40%, 99.20% 90.80%, 99.20% 91.65%, 99.20% 92.14%, 99.07% 92.99%, 99.07% 93.90%, 99.07% 94.81%, 99.07% 96.03%, 98.94% 96.88%, 98.94% 98.28%, 99.07% 99.31%, 95.12% 99.43%, 91.83% 99.55%, 88.01% 99.55%, 85.51% 99.55%, 83.01% 99.55%, 79.33% 99.80%, 76.70% 99.80%, 73.54% 99.80%, 70.78% 99.80%, 67.36% 99.80%, 64.99% 99.74%, 61.57% 99.74%, 58.15% 99.74%)',
            secret: 'Knight polishes his armor every night. It\'s not vanity, it\'s ritual.'
        },
        { 
            name: 'Bucky', 
            clipPath: 'polygon(34.72% 54.02%, 36.17% 53.77%, 37.36% 53.17%, 38.80% 52.62%, 42.09% 52.38%, 43.94% 52.07%, 44.20% 51.04%, 43.41% 50.79%, 42.88% 49.82%, 41.96% 48.67%, 41.17% 48.00%, 40.51% 46.66%, 39.46% 45.93%, 38.01% 45.20%, 39.86% 44.59%, 40.78% 44.17%, 42.62% 43.62%, 44.86% 43.44%, 47.62% 43.50%, 49.33% 43.99%, 50.65% 44.72%, 51.83% 45.69%, 51.70% 47.57%, 51.57% 49.15%, 51.70% 50.25%, 52.49% 50.73%, 55.25% 51.22%, 59.20% 52.31%, 61.96% 52.80%, 63.67% 53.59%, 65.38% 55.48%, 66.30% 56.63%, 66.96% 57.91%, 66.83% 58.94%, 64.99% 60.46%, 64.33% 61.43%, 62.88% 62.59%, 61.57% 63.38%, 59.72% 63.99%, 57.22% 64.47%, 55.78% 65.57%, 50.91% 66.24%, 53.94% 65.75%, 49.33% 66.36%, 45.38% 66.30%, 43.67% 66.12%, 43.01% 64.90%, 40.38% 64.11%, 39.20% 63.56%, 36.57% 62.16%, 34.86% 61.80%, 34.46% 60.89%, 34.86% 59.98%, 35.65% 58.39%, 35.65% 56.69%, 35.65% 55.48%)',
            secret: 'Bucky2 is from a different timeline. Don\'t ask which one.'
        },
        { 
            name: 'Winter Soldier', 
            clipPath: 'polygon(-0.14% 69.09%, 0.78% 67.70%, 1.44% 66.24%, 2.88% 65.02%, 4.99% 63.32%, 7.36% 61.92%, 10.65% 61.56%, 14.59% 61.62%, 16.17% 60.64%, 16.44% 59.06%, 17.09% 58.03%, 18.15% 57.12%, 20.25% 55.60%, 21.96% 54.38%, 23.01% 53.59%, 24.46% 53.11%, 25.65% 52.50%, 27.62% 52.50%, 29.07% 52.56%, 31.30% 52.74%, 31.30% 53.65%, 33.01% 54.69%, 33.67% 55.23%, 33.80% 56.33%, 33.80% 57.91%, 33.80% 58.64%, 33.41% 59.98%, 33.15% 60.83%, 33.28% 61.62%, 33.94% 62.04%, 35.38% 62.47%, 36.70% 63.26%, 38.28% 63.68%, 40.51% 64.47%, 40.78% 65.75%, 41.17% 66.78%, 41.30% 68.12%, 41.70% 69.70%, 42.49% 70.74%, 43.15% 72.50%, 44.07% 74.02%, 44.86% 75.24%, 43.94% 75.54%, 42.88% 75.54%, 42.09% 75.60%, 40.65% 75.54%, 40.38% 74.75%, 40.38% 73.78%, 39.86% 72.68%, 38.67% 71.59%, 37.75% 70.01%, 37.36% 69.03%, 36.04% 69.89%, 35.12% 70.68%, 34.07% 71.89%, 32.22% 72.38%, 28.28% 71.95%, 25.65% 71.95%, 20.51% 71.89%, 18.54% 71.89%, 16.57% 72.44%, 15.38% 73.96%, 14.59% 74.93%, 12.22% 77.06%, 12.22% 77.97%, 10.91% 78.82%, 8.67% 78.82%, 6.70% 78.82%, 3.54% 78.70%, 2.09% 78.70%, 2.09% 77.67%, 1.70% 76.51%, 1.04% 75.24%, 1.04% 74.38%, 0.91% 73.35%, 0.91% 72.13%, 0.65% 70.92%, 0.65% 69.89%)',
            secret: 'The Winter Soldier dreams in Russian but thinks in plums.'
        }
    ];

    // --- INITIALIZE HOTSPOTS ---
    characters.forEach((char, index) => {
        createCharacter(char, index);
    });

    function createCharacter(char, index) {
        const charDiv = document.createElement('div');
        charDiv.className = 'character-hotspot';
        charDiv.title = char.name;
        charDiv.style.clipPath = char.clipPath; 
        
        charDiv.addEventListener('click', () => {
            currentCharacterIndex = index;
            openModal(char);
        });

        overlay.appendChild(charDiv);
    }


    // --- MODAL LOGIC ---

    function openModal(char) {
        modalCharName.textContent = char.name;
        trackTitle.textContent = `${char.name}'s Story`; 
        modal.classList.remove('hidden');
        emailGate.classList.add('hidden'); 
        
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        
        // Audio path logic - use audioFile if defined, otherwise generate from name
        let audioPath = char.audioFile || `${char.name.toLowerCase().replace(/\s+/g, '')}.mp3`;

        currentAudio = new Audio(audioPath);
        
        // Reset UI
        progressBar.style.width = '0%';
        currentTimeDisplay.textContent = "0:00";
        totalTimeDisplay.textContent = "-0:00";

        // Event Listeners
        currentAudio.addEventListener('timeupdate', handleTimeUpdate);
        currentAudio.addEventListener('loadedmetadata', () => {
            totalTimeDisplay.textContent = `-${formatTime(currentAudio.duration)}`;
        });
        currentAudio.addEventListener('ended', () => {
            progressBar.style.width = '0%';
            currentTimeDisplay.textContent = "0:00";
        });
    }

    function closeModal() {
        modal.classList.add('hidden');
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- CONTROLS LOGIC ---

    function togglePlay() {
        if (!currentAudio) return;
        if (currentAudio.paused) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }

    function playNext() {
        currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
        openModal(characters[currentCharacterIndex]);
    }

    function playPrev() {
        currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
        openModal(characters[currentCharacterIndex]);
    }

    function openMenu() {
        if (currentAudio) currentAudio.pause();
        
        // Get current character
        const currentChar = characters[currentCharacterIndex];
        
        // If character has content, show secret menu
        // Otherwise, show email signup
        if (currentChar.hasContent) {
            eggTitle.textContent = currentChar.name;
            eggText.textContent = currentChar.secret;
            eggModal.classList.remove('hidden');
        } else {
            // Show coming soon signup
            showComingSoonModal(currentChar.name);
        }
    }
    
    function showComingSoonModal(charName) {
        eggTitle.textContent = charName;
        eggText.innerHTML = `<span style="display:block;margin-bottom:15px;">Be the first to know when it's live</span>
            <form id="coming-soon-form" style="display:flex;flex-direction:column;gap:8px;">
                <input type="email" placeholder="your.email@example.com" required style="padding:10px;border:1px solid #8ba4c4;border-radius:4px;font-family:Arial,sans-serif;">
                <button type="submit" style="padding:10px;background:#5a7a9a;color:white;border:none;border-radius:4px;font-family:Arial,sans-serif;cursor:pointer;">Notify Me</button>
            </form>`;
        eggModal.classList.remove('hidden');
        
        // Add form handler
        setTimeout(() => {
            const form = document.getElementById('coming-soon-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = form.querySelector('input').value;
                    console.log(`Coming soon signup: ${email} for ${charName}`);
                    alert('Thanks! We\'ll let you know when it\'s ready.');
                    eggModal.classList.add('hidden');
                });
            }
        }, 100);
    }

    function closeMenu() {
        eggModal.classList.add('hidden');
    }


    // Button Listeners
    centerBtn.addEventListener('click', togglePlay);
    wheelPlayBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);
    menuBtn.addEventListener('click', openMenu);
    closeEggBtn.addEventListener('click', closeMenu);


    // --- AUDIO HANDLING ---

    function handleTimeUpdate() {
        if (!currentAudio) return;

        const currentTime = currentAudio.currentTime;
        const duration = currentAudio.duration;

        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeDisplay.textContent = formatTime(currentTime);
        const remaining = duration - currentTime;
        totalTimeDisplay.textContent = `-${formatTime(remaining)}`;

        if (!isUnlocked && currentTime >= FREE_LIMIT) {
            currentAudio.pause();
            currentAudio.currentTime = FREE_LIMIT;
            emailGate.classList.remove('hidden');
        }
    }

    progressContainer.addEventListener('click', (e) => {
        if (!currentAudio || !currentAudio.duration) return;
        
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left; 
        const width = rect.width;
        let newTime = (clickX / width) * currentAudio.duration;

        if (!isUnlocked && newTime > FREE_LIMIT) {
            newTime = FREE_LIMIT; 
            emailGate.classList.remove('hidden'); 
        }

        currentAudio.currentTime = newTime;
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailForm.querySelector('input').value;
        if (email) {
            console.log(`User subscribed: ${email}`);
            isUnlocked = true;
            emailGate.classList.add('hidden');
            currentAudio.play();
            alert("Unlocked!");
        }
    });
});
