$.fn.inputFilter = function(inputFilter) {
  /**
  * Added Jquery function
  * From:  https://jsfiddle.net/emkey08/tvx5e7q3
  * @param {inputFilter} inputFilter
  * @return {function} $.input()
  * @return {function} $.keydown()
  * @return {function} $.mousedown()
  * @return {function} $.mouseup()
  * @return {function} $.contextmenu()
  * @return {function} $.drop()
  */ 
  return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
    if (inputFilter(this.value)) {
      this.oldValue = this.value;
      this.oldSelectionStart = this.selectionStart;
      this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty("oldValue")) {
      this.value = this.oldValue;
      this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    }
  });
};

const Alarm = {
  checkAlarmOn: function(){
    /**
    * Checks "alarmOn" attribute
    * @return {string} alarmOnState
    */ 
    let $alarmContainer = $("#alarm-container"),
        alarmOnState = $alarmContainer.attr("alarmOn");

    return alarmOnState;
  },
  checkAlarmTriggered: function(){
    /**
    * Checks "alarmTriggered" attribute
    * @return {string} alarmTriggeredState
    */ 
    let $alarmContainer = $("#alarm-container"),
        alarmTriggeredState = $alarmContainer.attr("alarmTriggered");

    return alarmTriggeredState;
  },
  checkAlarmVals: function() {
    /**
    * Checks if alarm values are equal to clock values
    * @return {boolean}
    */ 
    let alarmVals = Alarm.getFormValues(),
        clockVals = AnalogClock.RunClock.init();

    if (  (alarmVals.hours === clockVals.hours) &&
          (alarmVals.minutes === clockVals.minutes) &&
          (alarmVals.seconds === clockVals.seconds) &&
          (alarmVals.amPM === clockVals.amPM) ) {
      return true;
    } else { 
      return false;
    }
  },
  checkAlarmValsFilledIn: function(){
    /**
    * Checks if alarm values are all filled in
    * @return {function} $.removeClass()
    * @return {function} $.attr()
    * @return {boolean} isAlarmReady
    */ 
    let hours   = $('#alarm-container input[name="hour"]').val(),
        minutes = $('#alarm-container input[name="minute"]').val(),
        seconds = $('#alarm-container input[name="second"]').val(),
        isAlarmReady = (hours.length && minutes.length && seconds.length) ? true : false,
        $alarmBtn = $('#alarm-container button');

    if (isAlarmReady) {
      $alarmBtn.removeClass('disabled');
      $alarmBtn.attr('isReady', 'true');
    } else {
      $alarmBtn.addClass('disabled');
      $alarmBtn.attr('isReady', 'false');
    }

    return isAlarmReady
  },
  getFormValues: function(){
    /**
    * Gets hour, minute, second, and am-pm values from form 
    * @return {object}
    */ 
    let hourInt   = parseInt($('#alarm-container input[name="hour"]').val()),
        minuteVal = parseInt($('#alarm-container input[name="minute"]').val()),
        secondVal = parseInt($('#alarm-container input[name="second"]').val()),
        amPmVal = $('#alarm-container input[name="amPm"]').val();

    return {
      hours: hourInt,
      minutes: minuteVal,
      seconds: secondVal,
      amPm: amPmVal
    };
  },
  init: function(){
    /**
    * Parent function that initializes the alarm
    * @return {function} $.removeClass()
    * @return {function} Alarm.setAlarmOn()
    * @return {function} Alarm.setAlarm()
    */ 
    let isAlarmReady = $('#alarm-container button').attr('isReady', 'true');

    if (isAlarmReady) {
      Alarm.setAlarmOn();
      Alarm.setAlarm();
    }
  },
  lessThanNum: function(value, num) {
    /**
    * Returns integer of num value, when > 0 && < num
    * @param {string} value 
    * @param {string} num
    * @return {function} $.append()
    */ 
    return (value === "" || parseInt(value) <= num && parseInt(value) > 0);
  },
  numericOnly: function(value) {
    /**
    * Returns only numbers
    * @param {string} value
    * @return {function} regex.test()
    */ 
    return /^\d*$/.test(value);
  },
  setAlarm: function() {
    /**
    * Sets the alarm
    * @return {function} $.attr()
    * @return {function} $.removeClass()
    * @return {function} $.html()
    * @return {function} $.addClass()
    * @return {function} $.fadeIn()
    */ 
    let isAlarmTrue = Alarm.checkAlarmVals(),
        alarmAlert = isAlarmTrue ? "Yep!!" : "Nope",
        alarmClass = isAlarmTrue ? "yep" : "nope",
        $alarmContainer = $('#alarm-container'),
        $alarmResponse = $('.alarm-response p');

    if (isAlarmTrue) {
      $alarmContainer.attr('alarmTriggered', 'true');
    }

    $alarmResponse.removeClass();
    $alarmResponse.html(alarmAlert);
    $alarmResponse.addClass(alarmClass);
    $alarmResponse.fadeIn('fast');
  },
  setAlarmOn: function() {
    /**
    * Sets "alarmOn" attribute
    * @return {function} $.attr()
    */ 
    let $alarmContainer = $("#alarm-container");
    $alarmContainer.attr("alarmOn", "true");
  },
  setAlarmTriggered: function(){
    /**
    * Sets "alarmTriggered" attribute
    * @return {function} $.attr()
    */ 
    let $alarmContainer = $("#alarm-container");
    $alarmContainer.attr("alarmTriggered", "true");
  },
};

const AnalogClock = {
  RunClock: {
    init: function() {
      /**
      * Initialize the clock with new Date()
      * @return {function} AnalogClock.RunClock.showClockMeta()
      * @return {object}
      */ 
      let date = new Date(),
          hours = date.getHours()
          twelveHours = hours % 12 || 12,
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

      AnalogClock.RunClock.showClockMeta(hours, minutes, seconds);

      return {
        amPm: hours >= 12 ? "pm" : "am",
        hours: twelveHours,
        minutes: minutes,
        seconds: seconds,
        secondsDegree: seconds * 6,
        minutesDegree: minutes * 6 + seconds * (360/3600),
        hoursDegree: hours * 30 + minutes * (360/720)
      };
    },
    run: function(){
      /**
      * Run the clock
      * @return {function} Alarm.setAlarm()
      * @return {function} $.html()
      * @return {function} $.css()
      */ 
      let clockInit = AnalogClock.RunClock.init(),
          isAlarmOn = Alarm.checkAlarmOn(),
          isAlarmTriggered = Alarm.checkAlarmTriggered();

      if ((isAlarmOn === "true") && (isAlarmTriggered === "false")) {
        Alarm.setAlarm();
      }

      $(".am-pm-container span").html(clockInit.amPm);
      $(".second").css("transform", `rotate(${clockInit.secondsDegree}deg`);
      $(".minute").css("transform", `rotate(${clockInit.minutesDegree}deg`);
      $(".hour").css("transform", `rotate(${clockInit.hoursDegree}deg`);
    },
    showClockMeta: function(hours, minutes, seconds) {
      /**
      * Displays hours, minutes, and seconds from current time, 
      * in order to make manual testing eaiser
      * @param {string} hours
      * @param {string} minutes
      * @param {string} seconds
      * @return {function} $.html()
      */ 

      let $currentContainer = $('#current-time-container');

      $currentContainer.find('span.cur-hours').html(hours);
      $currentContainer.find('span.cur-minutes').html(minutes);
      $currentContainer.find('span.cur-seconds').html(seconds);


    }
  },
  SetUpClock: {
    createNums: function() {
      /**
      * Create clock numbers and place in HTML
      * @return {function} $.append()
      */ 
      const $list = $('.clock-nums-container ol');
      for (let i=0; i<12; i++) {
        let num = i + 1;
        let liEl = `<li>${num}</li>`;

        if (num % 3 === 0 ) {
          liEl = `<li class="big-num">${num}</li>`;
        }

        $list.append(liEl);
      }
    },
    placeClockNumbers: function(){
      /**
      * Place the clock numbers around a circle
      * Admittedly, my trig. skills are more than rusty.  
      * Thus, adapted from: 
      * http://jsfiddle.net/ThiefMaster/LPh33/4/
      * http://jsfiddle.net/x03f61db/2/
      * http://math2.org/math/geometry/circles.htm
      *
      * @param {object} calEvents
      * @return {function} $.css()
      */
      AnalogClock.SetUpClock.createNums();

      let $container  = $('.clock-nums-container'),
          $nums       = $container.find("li"),
          diameter    = $container.width(),
          radius      = diameter/2,
          angle       = -60 * Math.PI/180,
          step        = (2 * Math.PI) / $nums.length;

      $nums.each(function() {
          let x = Math.round(diameter/2 + radius * Math.cos(angle) - $(this).width()/2);
          let y = Math.round(diameter/2 + radius * Math.sin(angle) - $(this).height()/2);
          
          $(this).css({
              left: x + 'px',
              top: y + 'px'
          });
          angle += step;
      });
    }
  }
};


$(document).ready(function(){

  AnalogClock.SetUpClock.placeClockNumbers();
  setInterval(AnalogClock.RunClock.run, 1000);

  $('.form-element input[limit="twelve"]').inputFilter(function(value){
    return Alarm.numericOnly(value) && Alarm.lessThanNum(value, 12);
  });

  $('.form-element input[limit="sixty"]').inputFilter(function(value){
    return Alarm.numericOnly(value) && Alarm.lessThanNum(value, 60);
  });

  $('.form-element input').keyup(function(){
    Alarm.checkAlarmValsFilledIn();
  })

  $('.form-element button').click(function(event){
    event.preventDefault();
    Alarm.init();
  });

});






