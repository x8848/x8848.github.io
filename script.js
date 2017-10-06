var exerciseCount = 1;
var exercise = document.getElementById( "exercise" );

var beep = document.getElementById( "beep" );
var end = document.getElementById( "end" );
var count = document.getElementById( "count" );
var go = document.getElementById( "go" );
var thanks = document.getElementById( "thanks" );
var applause = document.getElementById( "applause" );
var current = document.getElementById( "current" );

function start() {
    count.play();
}

var activityTime = 60000;

var Timer = {
    current: 0,
    count: function () {
        if( Timer.active && Timer.current > 0 ) {
            setTimeout( Timer.count, 1000 );
            Timer.current--;
            current.innerHTML = Timer.current;
        }
    },
    reset: function () {
        Timer.current = Math.round( activityTime / 1000 );
        current.innerHTML = Timer.current;
    },
    stop: function () {
        Timer.active = false;
    },
    start: function () {
        Timer.reset();
        Timer.active = true;
        Timer.count();
    }
}

function play() {
    setTimeout( function () {
        beep.play();
    }, activityTime / 2 );
    setTimeout( function () {
        beep.play();
    }, activityTime - 5000 )
    setTimeout( function () {
        player.pauseVideo();
        Timer.stop();
        if( updateActivityCount() ) {
            end.onended = function () {
                count.play();
            }
        } else {
            end.onended = function () {
                thanks.play();
            };
        }
        end.play();
    }, activityTime );
    player.playVideo();
    Timer.start();
}

function updateActivityCount() {
    exerciseCount++;
    if( exerciseCount < 6 ) {
        exercise.innerHTML = exercise.innerHTML + ", " + exerciseCount;
        return true;
    }
    return false;
}

count.onended = function () {
    go.play();
};

go.onended = function () {
    play();
};

thanks.onended = function () {
    applause.play();
};

//load yt api
var tag = document.createElement( 'script' );
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName( 'script' )[0];
firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

function onYouTubeIframeAPIReady() {
    document.getElementById( 'loadbtn' ).removeAttribute( "disabled" );
}

// 2. This code loads the IFrame Player API code asynchronously.

var player;

function load() {
    var id = document.getElementById( 'ytcode' ).value;
    player = new YT.Player( 'player', {
        height: '390',
        width: '640',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    } );

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    document.getElementById( "startbtn" ).removeAttribute( "disabled" );
    player.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var init = true;

function onPlayerStateChange(event) {
    if( event.data == YT.PlayerState.PLAYING && init ) {
        player.pauseVideo();
        init = false;
    } else if( event.data == YT.PlayerState.ENDED ) {
        player.playVideo();
    }
}
