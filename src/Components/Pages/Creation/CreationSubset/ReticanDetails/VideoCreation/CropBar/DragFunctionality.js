
export default class DragFunctionality{

	initializeDrag=(divElement,parentDiv)=>{
		debugger;
		this.currentElement=divElement;
		this.parentDiv=parentDiv;
		divElement.onmousedown = this.dragMouseDown;
	}

	dragMouseDown=(e)=>{
		debugger;
		e = e || window.event;
	    e.preventDefault();
	    this.startingPositionX=e.clientX;
		console.log("Current starting position:",this.startingPositionX);
	    document.onmouseup = this.closeDragElement;
	    document.onmousemove = this.elementDrag;
	}

	elementDrag=(e)=>{
		e = e || window.event;
	    e.preventDefault();
	    console.log("=============")
	    console.log("Event x pixel coordinate:",e.clientX);
	    console.log("Current position:",this.startingPositionX);

	    const nextXCoordinatesIncrement=e.clientX-this.startingPositionX;
	    console.log("Next increment:",nextXCoordinatesIncrement);
	    this.startingPositionX=e.clientX;

	    const correspondingXCoordinates=this.currentElement.computedStyleMap().get('left').value+nextXCoordinatesIncrement;
	    console.log("Next coordinates:",correspondingXCoordinates)
	    this.currentElement.style.left = correspondingXCoordinates + "px";
	}

	closeDragElement=()=>{
	    document.onmouseup = null;
	    document.onmousemove = null;
	}
}
