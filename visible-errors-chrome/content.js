(function() {

	var errors = [];
	var timer = null;
	var prefs = {};
	
	var find_object = function(arr, criteria) {
		// walk array looking for nested object matching criteria object
		var criteria_length = 0;
		for (var a in criteria) criteria_length++;

		for (var a = 0; a < arr.length; a++) {
			var matches = 0;

			for (var b in criteria) {
				if (arr[a][b] && (arr[a][b] == criteria[b])) matches++;
			}
			if (matches >= criteria_length) return arr[a];
		}
		return null;
	};
	
	var find_object_idx = function(arr, criteria) {
		// walk array looking for nested object matching criteria object
		// return index in outer array, not object itself
		var criteria_length = 0;
		for (var a in criteria) criteria_length++;

		for (var idx = 0; idx < arr.length; idx++) {
			var matches = 0;

			for (var b in criteria) {
				if (arr[idx][b] && (arr[idx][b] == criteria[b])) matches++;
			}
			if (matches >= criteria_length) return idx;
		}
		return -1;
	};
	
	var __next_id = 1;
	var get_unique_id = function() {
		// simple id counter
		return __next_id++;
	};
	
	var hires_time_now = function() {
		// epoch seconds with decimals
		return (new Date()).getTime() / 1000;
	};
	
	var delete_object = function(arr, criteria) {
		// walk array looking for nested object matching criteria object
		// delete first object found
		var idx = find_object_idx(arr, criteria);

		if (idx > -1) {
			arr.splice(idx, 1);
			return true;
		}
		return false;
	};
	
	var GrowlManager = {
		lifetime: 10,
		growls: [],

		growl: function(type, msg) {
			// prevent duplicate messages
			if (find_object(this.growls, { type: type, msg: msg })) return;
			if (this.growls.length >= 10) return; // spin control
			if (!check_host()) return; // bad host
			
			var body = document.getElementsByTagName('body')[0];
			if (!body) {
				// oops, fired too soon?  we have no choice but to abort
				console.log("Warning: Visible Errors caught the error, but could not find the BODY element to display an alert.");
				return;
			}
			
			var container = document.getElementById('ve_growl_wrapper');
			if (!container) {
				// first growl, create container
				container = document.createElement('div');
				container.id = 've_growl_wrapper';
				container.className = 've_reset_div';
				
				var growl_top = document.createElement('div');
				growl_top.id = 've_growl_top';
				growl_top.className = 've_reset_div';
				growl_top.style.height = '0px';
				container.appendChild(growl_top);
				
				body.appendChild(container);
			}
			else {
				container.style.display = 'block';
			}
			
			var div = document.createElement('div');
			div.className = 've_reset_div ve_growl_message ' + type;
			div.style.opacity = 1.0;
			div.innerHTML = '<div class="ve_reset_div ve_growl_message_inner">' + msg + '</div>';
			container.insertBefore( div, document.getElementById('ve_growl_top').nextSibling );
			
			var growl = { id:get_unique_id(), type: type, msg: msg, opacity:0.0, start:hires_time_now() };
			
			this.growls.push(growl);
			
			var self = this;
			
			setTimeout( function() {
				if (!growl.deleted) {
					delete_object(self.growls, { id: growl.id });
					container.removeChild( div );
					if (!self.growls.length) {
						container.style.display = 'none';
						body.removeChild(container);
					}
					growl.deleted = 1;
				}
			}, this.lifetime * 1000 );
			
			div.onclick = function() {
				if (!growl.deleted) {
					delete_object(self.growls, { id: growl.id });
					container.removeChild( div );
					if (!self.growls.length) {
						container.style.display = 'none';
						body.removeChild(container);
					}
					growl.deleted = 1;
				}
			};
		}
	};
	
	var check_host = function() {
		// make sure user wants notifications for the current host
		if (window.location.protocol == 'file:') return true; // always run on file://
		
		var current_hostname = '' + window.location.hostname;
		if (!prefs.hostlist) return true; // no hostlist, assume run on all
		
		var hosts = prefs.hostlist.toString().split(/\,\s*/);
		for (var idx = 0, len = hosts.length; idx < len; idx++) {
			var host_match = hosts[idx].replace(/([\.\-])/g, "\\$1").replace(/\*/g, '.+');
			var host_re = new RegExp(host_match);
			if (current_hostname.match(host_re)) return true;
		} // foreach host
		
		return false;
	};

	window.addEventListener('error', function(text, url, line) {
		if(text.filename) {
			url = text.filename;
		}
		if(text.lineno) {
			line = text.lineno;
		}
		if(text.target.chrome && !url && !line) {
			return; // ignore handling Google Chrome extensions errors
		}
		if(text.message) {
			text = text.message;
		}
		else {
			// draft fix of http://code.google.com/p/chromium/issues/detail?id=8939
			if(text.target && text.target.src) {
				url = window.location.href;
				text = 'File not found: ' + text.target.src;
			}
		}
		text = (typeof(text) != 'string' ? 'Unknown JavaScript error' : text.replace(/^Uncaught /g, '')) + (line ? '' : ' (see details in JavaScript console)');
		if(errors.length < 10 && (!errors.length || errors[errors.length - 1].text != text || errors[errors.length - 1].url != url || errors[errors.length - 1].line != line)) {
			errors.push({text: text, url: url, line: line});
			if(!timer) {
				timer = window.setTimeout(function() {
					timer = null;
					for (var idx = 0, len = errors.length; idx < len; idx++) {
						GrowlManager.growl( 'error', 
							'<div><strong>' + errors[idx].text + '</strong></div>' + 
							'<div>' + errors[idx].url + ':' + errors[idx].line + '</div>' 
						);
					}
					errors = [];
				}, 50);
			}
		}
	}, false);
	
	// get hostname match list from prefs
	chrome.extension.sendRequest({cmd: "get_prefs"}, function(response) {
	  prefs = response;
	});	
})();
