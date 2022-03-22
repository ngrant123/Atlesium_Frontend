
export default class DragFunctionality{

	initializeDrag=(divElement,parentDiv)=>{
		this.currentElement=divElement;
		this.parentDiv=parentDiv;
		divElement.onmousedown = this.dragMouseDown;
	}

	dragMouseDown=(e)=>{
		e = e || window.event;
	    e.preventDefault();
	    this.startingPositionX=e.clientX;
	    document.onmouseup = this.closeDragElement;
	    document.onmousemove = this.elementDrag;
	}

	elementDrag=(e)=>{
		e = e || window.event;
	    e.preventDefault();

	    const nextXCoordinatesIncrement=e.clientX-this.startingPositionX;
	    this.startingPositionX=e.clientX;

	    const correspondingXCoordinates=this.currentElement.computedStyleMap().get('left').value+nextXCoordinatesIncrement;
	    this.currentElement.style.left = correspondingXCoordinates + "px";
	}

	closeDragElement=()=>{
	    document.onmouseup = null;
	    document.onmousemove = null;
	}
}
