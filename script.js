const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
const text = document.getElementById("txt");
const logoWidth = 400;
const logoHeight = 250;
const speed = 7;
const myImage = new Image(logoWidth, logoHeight);
myImage.src = 'dvd.png';



let check = true;
let timeGone = 0;
let osumat = 0;
let height = 1000;
let width = 1800;
let release = false;
function setCanvasSize(height, width)
{
    canvas.width = width;
    canvas.height = height;
}

setCanvasSize(height, width);

let rect1 = {
    x: 200,
    y: 200,
    w: logoWidth,
    h: logoHeight,
    xSpeed: speed,
    ySpeed: speed,
}
let rect2 = {
    x: 500,
    y: 500 - 250,
    w: logoWidth,
    h: logoHeight,
    xSpeed: speed,
    ySpeed: -speed,
}

function draw()
{
    if (osumat >= 5)
    {
        drawRect(rect2);
    }
    drawRect(rect1);
}
draw();

function drawRect(rectangle)
{
    checkDir(rectangle);
    rectangle.x += rectangle.xSpeed;
    rectangle.y += rectangle.ySpeed;

    context.drawImage(myImage, rectangle.x, rectangle.y, rectangle.w, rectangle.h);
}

function checkDir(rectangle)
{
    let xCheck = false;
    let yCheck = false;
    let cornerCheck1 = false
    let cornerCheck2 = false;
    // vaihtaa suunnan x koordinaatilla
    if (rectangle.x < 0 || width < rectangle.x + rectangle.w)
    {
        rectangle.xSpeed *= -1;
        xCheck = true;
        
        if (rectangle.x < 0)
        {
            cornerCheck1 = true;
        }
    }
    // vaihtaa suunnan y koordinaatilla
    if (rectangle.y < 0 || height < rectangle.y + rectangle.h)
    {
        rectangle.ySpeed *= -1;
        yCheck = true;
        
        if (rectangle.y < 0)
        {          
            cornerCheck2 = true;
        }
    }
    // jos neliö osuu täydellisesti kulmaan tämä lisää juoman
    if (xCheck && yCheck)
    {
        osumat += 1;
    }
    // röllikulma
    if (cornerCheck1 && cornerCheck2)
    {
        console.log("osui " + timeGone + "s kohdalla.")
        canvasAnimation();
        
    }
}
function canvasAnimation()
{
    if (width - (rect1.w - rect1.h) > height)
    {
        width += -speed * 1.5
        setTimeout(canvasAnimation, 10)
    }
    else {
        width = height + (rect1.w - rect1.h)
    }
    setCanvasSize(height, width);
}

function update()
{
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw()

    if (check)
    {
        setTimeout(update, 10);
    }
}
function timeUpdate()
{
    timeGone += 1;
    if (timeGone >= 60)
    {
        let secs = timeGone % 60;
        let mins = Math.floor(timeGone / 60);
        text.innerHTML = "Aikaa kulunut: " + mins +"m " +
         secs + "s\nosumia: " + osumat;
    }
    else 
    {
        text.innerHTML = "osumia: " + osumat  + " Aika: "+ timeGone + "s";
    }
    setTimeout(timeUpdate, 1000)
}
timeUpdate();
update();