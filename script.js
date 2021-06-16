const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let r = 0, g = 0, b = 255;
let secret = false;

class DVD {
    constructor(x, y, dx, dy, radiusX, radiusY, rotation) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    draw() {
        c.beginPath();
        c.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation * Math.PI / 180, 0, Math.PI * 2);
        c.fillStyle = "rgba(" + r + ',' + g + ',' + b + ", 1)";
        c.fill();
        c.fillStyle = 'black';
        c.font = "50px Arial";
        c.textAlign = "center";
        c.fillText("DVD", this.x, this.y + this.radiusY / 3);
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (secret) {
            if (this.rotation >= 360) {
                this.rotation = 0;
            }
            this.rotation++;
        }
    }

    edges() {
        if (this.x + this.radiusX >= canvas.width || this.x - this.radiusX <= 0) {
            this.dx = -this.dx;
            color();
        }
        if (this.y + this.radiusY >= canvas.height || this.y - this.radiusY <= 0) {
            this.dy = -this.dy;
            color();
        }
    }
}

let dvd = new DVD(innerWidth / 2, innerHeight / 2, 1, 1, 100, 60, 10);

function color() {
    r = Math.random() * 256 | 0;
    g = Math.random() * 256 | 0;
    b = Math.random() * 256 | 0;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    dvd.update();
    dvd.edges();
    dvd.draw();
}

let log = [];
let code = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";

document.onkeydown = function (event) {
    log.push(event.key);
    if (log.toString().trim().includes(code.trim())) {
        secret = true;
        log = [];
    }
}

animate();
