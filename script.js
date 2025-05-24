document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".image-grid");
    const imageFolder = "images"; // Folder containing images
    const totalImages = 400; // Maximum number of images available
    let imageList = [];

    // Generate an array of image filenames (assuming "image1.jpg" to "image400.jpg")
    for (let i = 1; i <= totalImages; i++) {
        imageList.push(`${imageFolder}/image${i}.jpg`);
    }

    // Function to shuffle images using the Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    // Function to randomly generate an `object-position` value
    function getRandomPosition() {
        const positions = ["top left", "top right", "center", "bottom left", "bottom right"];
        return positions[Math.floor(Math.random() * positions.length)];
    }

    function updateGridSize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let cols, rows;

        // 🔹 Define viewport ranges and corresponding grid sizes
        if (width <= 500 && height <= 832) {
            cols = 2; rows = 2; // 2x2 grid for smallest viewport
        } else if (width <= 800 && height <= 900) {
            cols = 4; rows = 3; // Increase to 4x4
        } else if (width <= 1000 && height <= 1000) {
            cols = 6; rows = 4; // Medium screens, 6x6 grid
        } else if (width <= 1100 && height <= 1100) {
            cols = 8; rows = 5; // Medium screens, 8x8 grid    
        } else if (width <= 1200 && height <= 1300) {
            cols = 10; rows = 8; // Medium screens, 10x10 grid
        } else if (width <= 1300 && height <= 1400) {
            cols = 12; rows = 10; // Medium screens, 12x12 grid
        } else if (width <= 1400 && height <= 1600) {
            cols = 18; rows = 12; // Medium screens, 18x12 grid
        } else {
            cols = 20; rows = 13; // Maximum size, 20x13 grid
        }

        // 🔀 Shuffle images before displaying
        shuffleArray(imageList);

        // Apply new grid size
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // Clear existing images and generate new ones
        grid.innerHTML = "";
        let numCells = cols * rows;

        for (let i = 0; i < numCells; i++) {
            let imgSrc = imageList[i % imageList.length]; // Loop images if fewer than 400
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");

            let img = document.createElement("img");
            img.src = imgSrc;
            img.alt = `Image ${i + 1}`;
            
            // 🔀 Randomly adjust image positioning
            img.style.objectPosition = getRandomPosition();

            gridItem.appendChild(img);
            grid.appendChild(gridItem);
        }
    }

    function updateViewportSize() {
        let viewportBox = document.getElementById("viewport-size");
        if (!viewportBox) {
            viewportBox = document.createElement("div");
            viewportBox.id = "viewport-size";
            document.body.appendChild(viewportBox);
        }
        viewportBox.textContent = `Viewport: ${window.innerWidth}px × ${window.innerHeight}px`;
    }

    // Run on page load & window resize
    updateGridSize();
    updateViewportSize();
    window.addEventListener("resize", () => {
        updateGridSize();
        updateViewportSize();
    });
});
