$(document).on('ready', function() {
	// Link to Firebase
	var form = new Firebase("https://matt-bajorek.firebaseio.com/");
	
	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	}

	function showModal(header,body,color) {
		// Put text in modal body
		$('.modal-header>h4').text(header);
		$('.modal-body>p').text(body);
		// Change modal background
		$('.modal-content').css('background', color);
		// Show modal
		$('#modal').modal('show');
	}
	
	function submission() {
		// Turn off click handler and disable
		$('#submit').off('click').addClass('disabled');
		// Get name, email, and userform
		var name = $('#name').val();
		var email = $('#email').val();
		var userform = $('#userform').val();
		// Validate email
		if (validateEmail(email)) {
			// Send to firebase
			form.push({
				name: name,
				email: email,
				userform: userform
			});
			$('#name').val('');
			$('#email').val('');
			$('#userform').val('');
			showModal('THANKS!','I will contact you shortly.','#e68a00');
		} else {
			showModal('ERROR!','Please enter a valid email','#f00');
			// Relisten for submit button to be pressed
			$('#submit').on('click', submission).removeClass('disabled');
		}
		return false;
	}

	// Listen for submit button to be pressed
	$('#submit').on('click', submission);
});