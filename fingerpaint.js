var drawing = false;
var context;
var brushColor='000';
var restore=[];
var currentIndex=-1;

window.onload=function()
{

    //Clear Button
    document.getElementById('btnClear').addEventListener('click', function(){
            context.clearRect(0,0, context.canvas.width, context.canvas.height);    
            restore=[];
            currentIndex=-1;   
    }, false);
    
    //Width Scale
    document.getElementById('lineWidth').addEventListener('change', function(){
            context.lineWidth = document.getElementById('lineWidth').value;
    }, false);
    
    //Color
    document.getElementById('colorChange').addEventListener('change', function(){
            context.strokeStyle = document.getElementById('colorChange').value;
            brushColor=document.getElementById('colorChange').value;;
    }, false);


    //Eraser Button
    document.getElementById('eraser').addEventListener('click', function(){
        context.strokeStyle = "#fff"; 
        // restore.push(context.getImageData(0,0,context.canvas.width, context.canvas.height))   
    }, false);

    //Brush Button
    document.getElementById('brush').addEventListener('click', function(){
        context.strokeStyle = document.getElementById('colorChange').value;
        // restore.push(context.getImageData(0,0,context.canvas.width, context.canvas.height))
    }, false);

    //Undo Button
    document.getElementById('undo').addEventListener('click', function(){
        if(currentIndex<=0){
            context.clearRect(0,0, context.canvas.width, context.canvas.height);    
            currentIndex=-1;     
        }else{
            currentIndex--;
            context.putImageData(restore[currentIndex],0,0);
        }
    }, false);

    //Redo Button
    document.getElementById('redo').addEventListener('click', function(){
        console.log(currentIndex,restore.length);
        if(currentIndex<restore.length-1){
            currentIndex++;
            context.putImageData(restore[currentIndex],0,0);
        }
    }, false);

    //Size Canvas
    context = document.getElementById('myCanvas').getContext("2d");
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight-150;
    
    //Mouse movement
    document.getElementById('myCanvas').onmousemove = handleMouseMove;
    document.getElementById('myCanvas').onmousedown = handleDown;
    document.getElementById('myCanvas').onmouseup = handleUp;

    document.getElementById('myCanvas').ontouchmove = handleMouseMove;
    document.getElementById('myCanvas').ontouchstart = handleDown;
    document.getElementById('myCanvas').ontouchend = handleUp;
    
    //Style line
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;
    
    //Hide Save Area
    document.getElementById('saveArea').style.display = "none";
}

function handleMouseMove(e)
{
    if(e.type=='touchmove'){
        if(drawing)
        {
           
            context.lineTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
            context.closePath();
            context.stroke();
            context.moveTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
        } else
        {
            context.moveTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
        }
    }else{
        if(drawing)
        {
           
            context.lineTo(e.clientX, e.clientY);
            context.closePath();
            context.stroke();
            context.moveTo(e.clientX, e.clientY);
        } else
        {
            context.moveTo(e.clientX, e.clientY);
        }
    }
    
}

function handleDown(e)
{
    if(e.type=='touchdown'){
        drawing = !drawing; 
        console.log('handleDown',drawing);
        context.moveTo(e.targetTouches[0].clientX,e.targetTouches[0].clientY);
        context.beginPath();
    }else{
        drawing = !drawing; 
        console.log('handleDown',drawing);
        context.moveTo(e.clientX, e.clientY);
        context.beginPath();
    }
     
}

function handleUp()
{
    drawing = !drawing;
    restore.push(context.getImageData(0,0,context.canvas.width, context.canvas.height))
    currentIndex++;
    console.log(restore);
}