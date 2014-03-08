window.onload = function() {
	// Initialize the option controls.
	options.hostlist.value = localStorage.hostlist || '';
	
	document.getElementById('fe_save').onclick = function() {
		localStorage.hostlist = options.hostlist.value;
		document.getElementById('results').innerHTML = '<b>Saved.</b>';
	};
};
