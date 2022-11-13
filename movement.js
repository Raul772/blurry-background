const circles = document.querySelectorAll(".circle");

setInterval(() => {
    
    circles.forEach(circle => {
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.left = `${Math.random() * 100}%`;
    });

}, 2000);