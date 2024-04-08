import {Graph} from './graph.js';
import {GRAPH_HEIGHT, GRAPH_WIDTH} from './constants.js';

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const myGraph = new Graph(GRAPH_WIDTH, GRAPH_HEIGHT, ctx);
const mouse = {
  x : undefined,
  y : undefined
}
myGraph.createGraph();
myGraph.drawGraph();
myGraph.init(0, 0);
myGraph.end(0, 1);
myGraph.empty(0, 2);
myGraph.wall(0, 3);
myGraph.searching(0, 4);
myGraph.searched(0, 5);
myGraph.path(0, 6);




