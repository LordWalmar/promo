	(function($){
	  $.fn.wbtComparator = function(options){
			options = $.extend({
				srcTop: "img/bigBoard_0.jpg",
		    	srcBottom: "img/bigBoard_1.jpg",
		    	border: "vertical"  //vertical or horizontal
	    	}, options);

	    var make = function(){
      			$(this).append('<div class="wrapper"><img src="'+options.srcTop+'"/><div class="topArea"><img src="'+options.srcBottom+'" /></div></div>');	
    			console.log("make" + this);
    			var topArea = $(this).find('.topArea');
    			var bottomArea = $(this).find('.wrapper');

    			// console.log(this);
    			(options.border == 'vertical') ? topArea.addClass('vertical_border') : topArea.addClass('horiontal_border');  //Задали границу внизу или сбоку

    		var disabled = {
			transmision : function(){
						if(options.border == 'vertical') {
							var widthTopImg = topArea.width();
							var widthImg = bottomArea.find('img').first().width();
							( widthTopImg <= widthImg/2) ? topArea.animate({'width': (widthImg - widthTopImg)}, 1500) : topArea.animate({'width': widthTopImg/4}, 1500);
							topArea.animate({'width': widthTopImg}, 1500)
						}else{
							var widthTopImg = topArea.height();
							var widthImg = bottomArea.find('img').first().height();	
							var position = 'height';			
							( widthTopImg <= widthImg/2) ? topArea.animate({'height': (widthImg - widthTopImg)}, 1500) : topArea.animate({'height': widthTopImg/4}, 1500);
							topArea.animate({'height': widthTopImg}, 1500)			
						}
							 // console.log(widthImg/2);
							 // console.log(widthTopImg);
							
			            	topArea.toggleClass('topArea_disabled');
			},

			stopTransmision : function(){
					clearInterval(timeOut);
					console.log('cleatTimeout');
			},

			timeOutt : function(){ 
				timeOut = setInterval(function () {
				disabled.transmision();
				}, 3100);
			}

		};
		
		disabled.timeOutt();
		
		bottomArea.mousemove(function(e) {
			disabled.stopTransmision();
			topArea.stop();
			// Для браузера IE
			if (document.all)  { 
				x = event.x + document.body.scrollLeft; 
				y = event.y + document.body.scrollTop; 
			// Для остальных браузеров
			} else {
				x = e.pageX; // Координата X курсора
				y = e.pageY; // Координата Y курсора
			}

			var coord;
			var position2;
			if(options.border == 'vertical'){
				coord = x;
				position2 = 'width';
			} else { 
				coord =  y;
				position2 = 'height';
			}
			topArea.css(position2, coord);
			topArea.removeClass('topArea_disabled');
		});

		bottomArea.mouseleave(function() {
			disabled.timeOutt();
			});

    	};

    	return this.each(make); 
	}})(jQuery)
