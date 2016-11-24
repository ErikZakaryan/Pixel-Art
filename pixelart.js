var myPixelDraw = {
	colorPicked: 0,
	cellColor: "#ecf0f1",
	defaultCells: 30,
	coloring: false,

	fns: {
		calcSize: function(cantidadCeldas) {
          if (cantidadCeldas == 0) {
          	cantidadCeldas = "defaultCells"
          }
          var cantidadCeldasTotales = cantidadCeldas * cantidadCeldas;
          $("#container").empty();
          for (var i = 0; i < cantidadCeldasTotales; i++) {
          	$("#container").append("<div class='cell cellBorder' draggable></div>");
          }
          var anchoDeCell = parseInt($("#container").css("width"),10) / cantidadCeldas;
          var largoDeCell = parseInt($("#container").css("height"),10) / cantidadCeldas;

          $(".cell").css({"width": anchoDeCell + "px", 
          	"height": largoDeCell + "px", 
          	"background-color": "#ecf0f1",  
          	"cursor": "pointer"
          });
          

        },
		reSize: function() {
        $('#sizeit').on('click', function() {
                var tamanoGrilla = $('#resize').val();
                if (tamanoGrilla == 0 || tamanoGrilla > 50) {
                    alert("Solo se pueden elegir numeros entre 0 y 50");
                    var tamanoGrilla = defaultCells;
                }
            });  
        },
		detectMouseUp: function() {
			$(document).on("mouseup",function(){
				myPixelDraw.coloring = false;
			});
        },
		colorPalette: function() {
          $("#color-pick > *").each(function(indice,valor){
          	var colorDeCadaPunto = $(valor).attr("id");
          	$(valor).css({"background-color": colorDeCadaPunto});
          })
        },
		pickColor: function() {
       $('#color-pick > div').on('click', function() {
                myPixelDraw.colorPicked = $(this).attr('id');
                $(this).parent().find('.select').removeClass("select");
                $(this).addClass("select");
            });
        },
		colorIt: function() {
        $(document).on('mousedown', '#container .cell', function(elemento) {
                elemento.preventDefault();
                myPixelDraw.coloring = true;
                if (elemento.button == 2) {
                    $(this).css('background-color', myPixelDraw.cellColor);
                    return false;
                } else {
                    $(this).css('background-color', myPixelDraw.colorPicked);
                }
            });
        },
		colorOnDrag: function() {
        $(document).on('mousemove', function(elemento) {
                if (myPixelDraw.coloring == true) {
                    var x = elemento.clientX;
                    var y = elemento.clientY;
                    var colorDraggedTo = document.elementFromPoint(x, y);
                    if ($(colorDraggedTo).hasClass('cell') && elemento.button != 2) {
                        $(colorDraggedTo).css('background-color', myPixelDraw.colorPicked);
                    } else if ($(colorDraggedTo).hasClass('cell') && elemento.button == 2) {
                        $(colorDraggedTo).css('background-color', myPixelDraw.cellColor);
                    }
                }
            });
        },
		reset: function() {
        $('#reset').on('click', function() {
                $('.cell').css('background-color', myPixelDraw.cellColor);
            });
        },
		toggleBorders: function() {
        $('#toggle-border').on('click', function() {
                $('.cell').toggleClass('cellBorder');
            });
        },
		disableRightClick: function() {
        myPixelDraw.container.on('contextmenu', function() {
                return false;
            })
        },
    grabImage: function() {
        $('#grabIt').on('click', function(e) {
                var container = document.getElementById('container');
                html2canvas(container, {
                    onrendered: function(canvas) {
                        $(".screens").append(canvas);
                    }
                });
            });
        }

	},
	init:function(container){
      this.container = container;
      for (var i = 0; i < Object.keys(myPixelDraw.fns).length; i++) {
      	var nombre = Object.keys(myPixelDraw.fns)[i];
      	this.fns[nombre]();
      }
    }
}

$(document).ready(function(){
	var $container = $("#container");
	myPixelDraw.init($container);
	myPixelDraw.fns.calcSize(20);

	$("#sizeit").click(function(){
       var celdasElegidas = $("#resize").val();
       if (celdasElegidas <= 50 && celdasElegidas >= 0) {
          	myPixelDraw.fns.calcSize(celdasElegidas);
       } else {
       	alert("Solo se pueden elegir numeros entre 0 y 50");
       }
    });

});
