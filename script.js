import {Graph} from './graph.js';
import {GRAPH_HEIGHT, GRAPH_WIDTH, NODE_HEIGHT, NODE_WIDTH} from './constants.js';

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const myGraph = new Graph(GRAPH_WIDTH, GRAPH_HEIGHT, ctx);
const mouse = {
  x : undefined,
  y : undefined
}

export function getMousePosition(event){
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  return {mouseX, mouseY};
}
function getColumnAndRow(mouseY, mouseX){
  const column = Math.trunc(mouseY / NODE_HEIGHT);
  const row = Math.trunc(mouseX / NODE_WIDTH);
  return {column, row};
}

canvas.addEventListener('mousedown', (event) => {
  const {mouseX, mouseY} = getMousePosition(event);
  const {column, row} = getColumnAndRow(mouseY, mouseX);
  myGraph.handleMouseDown(column, row);
})
canvas.addEventListener('mouseup', (event) => {
  const {mouseX, mouseY} = getMousePosition(event);
  const {column, row} = getColumnAndRow(mouseY, mouseX);
  myGraph.handleMouseUp(column, row);
})

canvas.addEventListener('mousemove', (event) => {
  const {mouseX, mouseY} = getMousePosition(event);
  const {column, row} = getColumnAndRow(mouseY, mouseX);
  myGraph.handleMouseOver(column, row);
  myGraph.changeMousePosition(mouseY, mouseX);
});

document.addEventListener('keypress', (event) => {
  const {key} = event;
  if(key === 'b'){
    myGraph.breathFirst();
  }
  if(key === 'a'){
    myGraph.aStarSearch();
  }
  if(key === 'r'){
    myGraph.clearGraph();
  }
})

myGraph.createGraph();
myGraph.init(0, 0);
myGraph.end(0, 2);




