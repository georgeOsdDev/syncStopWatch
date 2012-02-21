var sec = 0.0;
var dispsec;
var timerId;
var on = false;
function start(){
        if (on){
                return;
        }
        on = true;
	$('#startBtn').addClass('success');
	$('#stopBtn').removeClass('danger');

	timerId = setInterval(function() {
		sec += 0.1;
		dispsec = (Math.round(sec*10)/10).toFixed(1);
		$('#timer').html(dispsec);
	}, 100);
}

function stop(){
        if (!on) {
            return;
        }
        on = false;
	$('#startBtn').removeClass('success');
	$('#stopBtn').addClass('danger');
	clearInterval(timerId);
}

function reset(){
        on = false;
	$('#startBtn').removeClass('success');
	$('#stopBtn').removeClass('danger');
	$('#startBtn').addClass('disabled');
	$('#stopBtn').addClass('disabled');
	$('#resetBtn').addClass('disabled');

	clearInterval(timerId);
	sec = 0.0;
	dispsec = "Reset!";
	$('#timer').html(dispsec);
	setTimeout(function(){
		$('#timer').fadeOut(300,function(){
			dispsec = 0.0;
			$('#timer').html(dispsec);
			$('#timer').fadeIn(300)
			$('#startBtn').removeClass('disabled');
			$('#stopBtn').removeClass('disabled');
			$('#resetBtn').removeClass('disabled');
		});
	}, 500);
}

