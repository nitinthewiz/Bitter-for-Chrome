(function ($) {

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	
	function process_post(post_container) {
		var too_old = false;
		console.log("came here");
        $(post_container).find(".timestamp").each(function() {
            try{
				var text = $(this).text().replace(/\s/, '');
				//console.log(text);
				var timer = text.match(/\d+/)[0];
				//console.log(timer);
				var currency = text.match(/\D+/)[0];
				//console.log(currency);
				if(currency != 'm'){
					too_old = true;
				}
				if (text >= 3){
					too_old = true;
				}
			}catch(e){
				console.log("Too Early to tell");
			}
        });
		if (too_old){
			var found = $(post_container).find(".in-reply-to");
			if (found.length == 0) {
				$(post_container).hide();
			}
		}
		console.log("the end");
    }

    if (MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                $(mutation.addedNodes).each(function() {
                    if ($(this).is(".post-container")) {
                        process_post($(this));
                    } else {
                        $(this).find(".post-container").each(function() {
                            process_post($(this));
                        });
                    }
                });
            });
        });

        var config = { subtree: true, childList: true, characterData: false, attributes: false }
        $("body").each(function() {
            observer.observe(this, config);
        });
    }

    $(".post-container").each(function() {
        process_post(this);
    });

})(jQuery);