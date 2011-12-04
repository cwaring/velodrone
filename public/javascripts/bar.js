var ColorBar = function(id) {
  this.id = id;
	this.element;
  
	this.createBar = function() {
    
    if($("#bars").length == 0) {
      $("body").prepend("<ul id=\"bars\">");
    }
    this.element = $("#bars").append("<li class=\"bar-container\"><div id=\"bar-" + id + "\" class=\"bar-style-" + (id % 5) + "\"></div></li>");
   
  };
  
  this.changeSize = function(percentage) {
    
    $(this.element).find("div").width((percentage / 100 * 40) + 40).height((percentage) + 50);
  
  };
  
};

var ColorBars = function() {
  this.bars;
 
  this.ColorBars = function() {
    return this.bars.push(new Colorbar(this.bars.length).createBar());
  }

};
