class Blob {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.nextX = 0;
        this.nextY = 0;

        this.step = -0.2;
        this.resistance = Math.random() * 0.99;

        this.raio = Math.random() * 10;

        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.opacity = 0;

        this.inView = true;

        return this;
    }

    movement() {
        this.x += this.nextX;
        this.y += this.nextY;

        this.nextX *= this.resistance;
        this.nextY *= this.resistance;

        let aux = Math.random() * this.step;
        this.nextX += aux;
        this.nextY += aux;
        if(this.opacity < 1)
            this.opacity += 0.01;
    }

    correctPosition() {
        if (this.x > window.innerWidth + 100) {
            this.inView = false;
        } else if (this.x < -100) {
            this.inView = false;
        }
    
        if (this.y > window.innerHeight + 100) {
            this.inView = false;
        } else if (this.y < -100) {
            this.inView = false;
        }
    }

    render(context) {

        context.globalAlpha = this.opacity;
        context.globalCompositeOperation = 'source-over';

        context.beginPath();
        context.arc(this.x, this.y, this.raio, 0, (2 * Math.PI));

        context.fillStyle = this.color;
        context.fill();

        context.globalAlpha = 1;
    }

}


let nblobs = 250;
let colours = ['#D7D7D9','#133340','#18778C','#5BCCD9','#A66B56','#C9EBF2','#7EBFB3', '#96B3D9'];

let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.className = 'blob-generator';

document.body.appendChild(canvas);

let blobs = [];

for (let i = 0; i < nblobs; i++) {
    blobs.push(blobCreator());
}

(function att () {

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nblobs; i++) {

        if (blobs[i].inView) {
            blobs[i].movement();
            blobs[i].correctPosition();
            blobs[i].render(context);
        }else{
            blobs.splice(i, 1);
            blobs.push(blobCreator());
        }  
    }

    requestAnimationFrame(att);

})();

function blobCreator(){
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    return new Blob(x, y);
}

window.addEventListener('resize', () => {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

document.body.addEventListener('pointermove', (event) => {
    blobs.forEach(blob => {
        blob.x += event.movementX * 0.01;
        blob.y += event.movementY * 0.01;
    });
})