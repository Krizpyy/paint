//============================
//  Paint
//============================

var drawingCanvas
var colorPicker;
var slider;
var clearButton;
var saveButton;
var brushPicker;
var brushType;

var pumpkin;
var basketball;
var nug;
var Bape;



function preload(){
    pumpkin = loadImage("images/pumpkin.png");
    imageMode(CENTER);
    basketball = loadImage("images/basketball.png");
    imageMode(CENTER);
    nug = loadImage("images/nug.png");
    imageMode(CENTER);
    Bape = loadImage("images/Bape.png");
    imageMode(CENTER);
}

  
function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(800, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");
    
    //set up the color picker
    colorPicker = select("#ColorPicker");
    
    //set up the paintbrush width slider
    slider = createSlider(1, 50, 10);
    slider.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush type
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('spray can');
    brushPicker.option('image');
    brushPicker.option('image2');
    brushPicker.option('image3');
    brushPicker.option('image4');
    brushPicker.changed(changeBrush);
    brushType = brushPicker.value();
}

function draw() {
    
    if (mouseIsPressed) {
        if (brushType == "spray can"){
            sprayCan();
        } else if(brushType == "paint brush"){
            standardStroke(); 
        } else if(brushType == "image"){
            drawImage(); 
        }else if(brushType == "image2"){
            drawBasketball();
        }else if(brushType == "image3"){
            drawNug();
        }else if(brushType == "image4"){
            drawBape();
        }
        
    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }
}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(slider.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255, 
    //         colorPicker.elt.color.rgb[1]*255, 
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

function sprayCan(){
    var sliderVal = slider.value();
    stroke( "#"+colorPicker.value() );

    //draw points in a grid that is the size of the brush slider
    //and draw those points 4 pixes from each other

    for (var x = 0; x < sliderVal; x+=4){
        for (var y = 0; y < sliderVal; y+=4){
            point(mouseX+x, mouseY+y);
        }
    }    
}

function drawImage(){
    //draw the image where the mouse is and set the size to the brush size
    image(pumpkin,mouseX,mouseY, slider.value(), slider.value());
}


function drawBasketball(){
    image(basketball,mouseX,mouseY, slider.value(), slider.value());
}

function drawNug(){
    image(nug,mouseX,mouseY, slider.value(), slider.value());
}

function drawBape(){
    image(Bape,mouseX,mouseY, slider.value(), slider.value());
}
//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    brushType = brushPicker.value();
}


function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction() {
    clear(drawingCanvas);
}
