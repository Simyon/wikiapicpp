/*
 Generating of chain fo classes.
 <!--«•—©฿»-->

 versionMajor = 201512290030
 versionMinor = 201512290030

 Public Domain by authors: Alexander Krassotkin (http://www.krassotkin.com/) and Simon Krassotkin.
 Since 2015-12-29.
*/
var arrowLength = 50;
var blockAddY = 50;
var firstChainX = 30, firstChainY = 100;
var paddingBottom = 10, paddingLeft = 10, paddingRight = 10, paddingTop = 10;
var rectHeight = 50, rectWidth = 300;
var titleY = 50;

function getHeight(chains) {
 var height = paddingBottom+paddingTop+2*firstChainY;
 var chainsCount = chains["chains"].length;
 height += chainsCount*(rectHeight*2+blockAddY)
 return height;
}

function getWidth(chains) {
 var width = paddingLeft+paddingRight+2*firstChainX;
 var maxBlocksCount = 1;
 for(var ic = 0; ic < chains["chains"].length; ++ic) {
  var blocksCount = chains["chains"][ic]["chain"].length;
  maxBlocksCount = maxBlocksCount>blocksCount ? maxBlocksCount : blocksCount;
 }
 width += maxBlocksCount*(arrowLength+rectWidth);
 return width;
}

function generateBlock(block, firstX, y, where) {
 var content = "";
 var x = firstX;
 content += "  <line x1=\""+x+"\" y1=\""+(y+rectHeight)+"\" x2=\""+(x+arrowLength)+"\" y2=\"" + (y+rectHeight) + "\" stroke=\"black\" ";
 content += where<0 ? "marker-start=\"url(#markerCircle)\" " : "";
 content += where>0 ? "marker-end=\"url(#markerArrowCircle)\" " : "marker-end=\"url(#markerArrow)\" ";
 content += " />\n\n";
 x+=arrowLength;
 if(where<=0) {
  content += "  <rect x=\"" + x + "\" y=\"" + (y+rectHeight/2) + "\" width=\"" + rectWidth + "\" height=\"" + rectHeight + "\" fill=\"none\" stroke=\"black\" stroke-width=\"2\" />\n";
  content += "  <text x=\"" + (x+10) + "\" y=\"" + (y+rectHeight) + "\">" + block["title"] + "</text>\n\n";
  x+=rectWidth;
 }
 return {content:content, x:x};
}

function generateChain(chain, firstX, firstY) {
 var content = "";
 var y = firstY;
 content += "<text x=\"" + firstChainX + "\" y=\"" + y + "\" font-size=\"1.2em\">" + chain["title"] + "</text>\n";
 var result = {content:"", x:firstX};
 for(var ib = 0; ib<chain["chain"].length; ++ib) {
  var where = ib==0 ? -1 : 0;
  result = generateBlock(chain["chain"][ib], result.x, y, where);
  content+=result.content;
 }
 if(chain["chain"].length > 0) {
  result = generateBlock(chain["chain"][chain["chain"].length-1], result.x, y, 1);
  content+=result.content;
 }
 y+=rectHeight*2+blockAddY;
 return {content:content, y:y};
}

function generateChains(placeId, chains) {
 var height = getHeight(chains);
 var width = getWidth(chains);
 var svgTitle = chains["commons"]["title"];
 var content = "\n\n<!-- autogenerated by generateChain(placeId, chains) begin -->\n";
 content += "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\""+width+"px\" height=\""+height+"px\">\n";
 content += " <title>"+svgTitle+"</title>\n";
 content += "\n <defs>\n";
 content += "  <marker id=\"markerCircle\" markerWidth=\"5\" markerHeight=\"5\" refX=\"2.5\" refY=\"2.5\">\n";
 content += "   <circle cx=\"2.5\" cy=\"2.5\" r=\"2.5\" fill=\"black\" stroke=\"black\"/>\n"; 
 content += "  </marker>\n";
 content += "  <marker id=\"markerArrow\" markerWidth=\"20\" markerHeight=\"10\" refX=\"20\" refY=\"5\" orient=\"auto\">\n";
 content += "   <path d=\"M0,0 L20,5 0,10 5,5 Z\" style=\"fill: black;\"/>\n";
 content += "  </marker>\n";
 content += "  <marker id=\"markerArrowCircle\" markerWidth=\"22.5\" markerHeight=\"10\" refX=\"22.5\" refY=\"5\" orient=\"auto\">\n";
 content += "   <circle cx=\"20\" cy=\"5\" r=\"2.5\" fill=\"black\" stroke=\"black\"/>\n";
 content += "   <path d=\"M0,0 L20,5 0,10 5,5 Z\" style=\"fill: black;\"/>\n";
 content += "  </marker>\n";
 content += " </defs>\n";
 content += "\n <text x=\""+(width/2-svgTitle.length*2)+"\" y=\""+titleY+"\" font-size=\"1.44em\" stroke=\"black\">"+svgTitle+"</text>\n";
 var result =  {content:"", y:firstChainY}
 for(var ic = 0; ic < chains["chains"].length; ++ic) {
  var chain = chains["chains"][ic];
  result = generateChain(chain, firstChainX, result.y);
  content += result.content;
 }
 content += "</svg>\n";
 content += "<!-- autogenerated by generateChain(placeId, chains) end -->\n\n";
 document.getElementById(placeId).innerHTML = content;
}

