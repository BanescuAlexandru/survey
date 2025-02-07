let yesButtonSize = 1; // Track the size of the Yes button
let hoverCount = 0;
let imageSize = 1;
let placedImages = [];
let isButtonFixed = false;
let gifDisplayed = false; // Track if the GIF has been displayed at least once

function moveButton() {
    const button = document.getElementById('noButton');

    if (hoverCount >= 15) {
        button.style.position = 'fixed';
        button.style.left = '50%';
        button.style.top = '50%';
        button.style.transform = 'translate(-50%, -50%)';
        button.style.fontSize = '12px';
        button.style.cursor = 'pointer';
        isButtonFixed = true;

        // Reset the Yes button to its original size
        resetYesButton();

        // Set the background to your-image.jpg
        document.body.style.backgroundImage = 'url("your-image.jpg")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';

        // Remove all other instances of your-image.jpg
        placedImages.forEach(image => image.remove());
        placedImages = []; // Clear the array

        // Add hover event listener to show the GIF
        button.addEventListener('mouseover', showGif);
        return;
    }

    if (!isButtonFixed) {
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;

        let randomX, randomY;
        let overlap = true;

        while (overlap) {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;

            overlap = placedImages.some(image => {
                const imageRect = image.getBoundingClientRect();
                return randomX < imageRect.right && randomX + button.offsetWidth > imageRect.left &&
                    randomY < imageRect.bottom && randomY + button.offsetHeight > imageRect.top;
            });
        }

        button.style.position = 'absolute';
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;

        // Grow the Yes button by 20% every time the No button moves
        growYesButton();
    }
}

function growYesButton() {
    const yesButton = document.getElementById('yesButton');
    yesButtonSize *= 1.2; // Increase size by 20%
    yesButton.style.transform = `scale(${yesButtonSize})`;
}

function resetYesButton() {
    const yesButton = document.getElementById('yesButton');
    yesButtonSize = 1; // Reset the size to original
    yesButton.style.transform = 'scale(1)'; // Reset the scale
}

function trackHover() {
    hoverCount++;

    if (hoverCount % 3 === 0 && hoverCount < 15) {
        const newImage = document.createElement('img');
        newImage.src = 'your-image.jpg'; // Replace with your image path
        newImage.classList.add('new-image');

        imageSize *= 1.15;
        newImage.style.transform = `scale(${imageSize})`;

        let overlap = true;
        let randomX, randomY;

        while (overlap) {
            randomX = Math.random() * (window.innerWidth - 100);
            randomY = Math.random() * (window.innerHeight - 100);

            overlap = placedImages.some(image => {
                const imageRect = image.getBoundingClientRect();
                return randomX < imageRect.right && randomX + 100 > imageRect.left &&
                    randomY < imageRect.bottom && randomY + 100 > imageRect.top;
            });
        }

        newImage.style.left = `${randomX}px`;
        newImage.style.top = `${randomY}px`;

        document.body.appendChild(newImage);
        newImage.style.display = 'block';
        placedImages.push(newImage);
    }
}

function showGif() {
    if (isButtonFixed && hoverCount >= 15) {
        const button = document.getElementById('noButton');
        const gifImage = document.createElement('img');
        gifImage.src = 'your-gif.gif'; // Replace with your GIF path
        gifImage.classList.add('new-image');
        gifImage.style.width = '200px'; // Adjust the size of the GIF
        gifImage.style.height = 'auto';
        gifImage.style.position = 'fixed';

        // Position the GIF to the right of the button
        gifImage.style.left = `${button.offsetLeft + button.offsetWidth + 10}px`; // 10px spacing
        gifImage.style.top = `${button.offsetTop}px`;

        gifImage.style.display = 'block';
        document.body.appendChild(gifImage);

        // Track that the GIF has been displayed
        gifDisplayed = true;

        // Remove the GIF after 3 seconds (optional)
        setTimeout(() => {
            gifImage.remove();
        }, 3000);
    }
}

function showConfirmationPopup() {
    if (isButtonFixed && gifDisplayed) {
        // Create a blur overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.backdropFilter = 'blur(5px)';
        overlay.style.zIndex = '1000';
        document.body.appendChild(overlay);

        // Create the pop-up message
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '20px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popup.style.zIndex = '1001';
        popup.style.textAlign = 'center';

        popup.innerHTML = `
            <p>Really?</p>
            <button id="confirmYes">Yes</button>
            <button id="confirmNo">No</button>
        `;
        document.body.appendChild(popup);

        // Handle "Yes" button click
        document.getElementById('confirmYes').addEventListener('click', () => {
            // Display sad face
            popup.innerHTML = '<p>:(</p>';
            setTimeout(() => {
                // Redirect to the previous page
                window.history.back();
            }, 1000);
        });

        // Handle "No" button click
        document.getElementById('confirmNo').addEventListener('click', () => {
            // Remove the pop-up and overlay
            popup.remove();
            overlay.remove();
        });
    }
}

function showConfetti() {
    // Add confetti animation
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
    }

    // Remove the "Yes" and "No" buttons
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    if (yesButton) yesButton.remove();
    if (noButton) noButton.remove();

    // Display the new image (your-image2.jpg) in the center of the screen
    showNewImage();
}

function showNewImage() {
    const newImage = document.createElement('img');
    newImage.src = 'your-image2.jpg'; // Replace with your image path
    newImage.style.position = 'fixed';
    newImage.style.top = '50%';
    newImage.style.left = '50%';
    newImage.style.transform = 'translate(-50%, -50%)';
    newImage.style.zIndex = '1002'; // Ensure it's on top of everything else
    newImage.style.maxWidth = '90%'; // Ensure it doesn't overflow the screen
    newImage.style.maxHeight = '90%';
    document.body.appendChild(newImage);
}

function showGifs() {
    // Create the first GIF
    const gif1 = document.createElement('img');
    gif1.src = 'gif1.gif'; // Ensure this path is correct
    gif1.classList.add('new-image');
    gif1.style.width = '200px';
    gif1.style.height = 'auto';
    gif1.style.position = 'fixed';
    gif1.style.left = '10px'; // Position on the left side
    gif1.style.top = '50%';
    gif1.style.transform = 'translateY(-50%)';
    gif1.style.display = 'block'; // Ensure visibility
    document.body.appendChild(gif1);
    console.log("GIF 1 added:", gif1.src);

    // Create the second GIF
    const gif2 = document.createElement('img');
    gif2.src = 'gif2.gif'; // Ensure this path is correct
    gif2.classList.add('new-image');
    gif2.style.width = '200px';
    gif2.style.height = 'auto';
    gif2.style.position = 'fixed';
    gif2.style.right = '10px'; // Position on the right side
    gif2.style.top = '50%';
    gif2.style.transform = 'translateY(-50%)';
    gif2.style.display = 'block'; // Ensure visibility
    document.body.appendChild(gif2);
    console.log("GIF 2 added:", gif2.src);
}

// Add click event listener to the "Yes" button on the first screen
document.getElementById('yesButton').addEventListener('click', () => {
    // Show confetti
    showConfetti();

    // Show two different GIFs on the left and right sides of the page
    showGifs();
});

// Add click event listener to the "No" button
document.getElementById('noButton').addEventListener('click', () => {
    if (isButtonFixed && gifDisplayed) {
        showConfirmationPopup();
    }
});
