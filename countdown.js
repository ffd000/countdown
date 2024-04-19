var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var w = canvas.width;
var h = canvas.height;
var cw = w / 2;  // center of canvas
var ch = h / 2;
var scaleFactor = window.devicePixelRatio || 1;

const end = "2024-10-24T06:40:00";
const e = new Date(end).getTime();

function format_time_remainder() {
    const t = new Date().getTime();

    let r = e - t;
    if (r < 0) {
        return;
    }
    const d = Math.floor(r / (1e3 * 60 * 60 * 24));
    r %= 1e3 * 60 * 60 * 24;
    const h = Math.floor(r / (1e3 * 60 * 60));
    r %= 1e3 * 60 * 60;
    const m = Math.floor(r / (1e3 * 60));
    r %= 1e3 * 60;
    const s = Math.floor(r / 1e3);
    const ms = r % 1e3;
    return `${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}.${pad3(ms)}`
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}

function pad3(n) {
    if (n < 10) {
        return '00' + n;
    } else if (n < 100) {
        return '0' + n;
    }
    return n;
}


var particles = []
for (var i = 0; i < 50; i++) {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    particles.push({ x: 100+x, y: 100+y});
}

function drawParticles() {
    particles.forEach((particle) => {
        ctx.fillStyle = 'black';
        ctx.fillRect(particle.x, particle.y, 5, 5);
    });
}

(function setText() {
    ctx.font = "400 4vw 'Shippori Mincho'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
})();

var startpos = 0;
var endpos = 100;
var definition = 1;
var alpha  = 0.15;
var cosdiv = 1;
var cosmult = 0.5;

function update() {
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        resize();
    }
    var time = format_time_remainder();

    // clear canvas
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw digits
    ctx.setTransform(1,0,0,1,cw,ch);
    ctx.fillStyle = 'white';
    ctx.font = "400 4vw 'Shippori Mincho'";

    var i = 50;
    var n = 0;
    while(i--) {
        if (n > endpos) break;
        n += definition;
        ctx.globalAlpha = (0.5 - (n + startpos) / endpos) * alpha;
        var x = Math.cos(n / cosdiv) * n * cosmult; // cosine
        ctx.fillText(time, x, 0);
    }
    ctx.globalAlpha = 1; // reset alpha
    ctx.fillText(time, 0, 0);

    ctx.font = "400 2vw 'Shippori Mincho'";
    ctx.fillText("カウントダウン", 0, -50);

    drawParticles();

    requestAnimationFrame(update);
}

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    w = canvas.width;
    h = canvas.height;
    cw = w / 2;
    ch = h / 2;

    ctx.scale(scaleFactor, scaleFactor);
    setText();
}

requestAnimationFrame(update);