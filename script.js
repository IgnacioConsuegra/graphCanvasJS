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

function getMousePosition(event){
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
canvas.addEventListener('click', (event) => {
  const {mouseX, mouseY} = getMousePosition(event);
  const {column, row} = getColumnAndRow(mouseY, mouseX);
  myGraph.handleClick(column, row);
})


canvas.addEventListener('mousemove', (event) => {
  const {mouseX, mouseY} = getMousePosition(event);
  const {column, row} = getColumnAndRow(mouseY, mouseX);
  myGraph.handleMouseOver(column, row);
});


myGraph.createGraph();
myGraph.drawGraph();
myGraph.init(0, 0);
myGraph.end(0, 1);
myGraph.empty(0, 2);
myGraph.wall(0, 3);
myGraph.searching(0, 4);
myGraph.searched(0, 5);
myGraph.path(0, 6);




