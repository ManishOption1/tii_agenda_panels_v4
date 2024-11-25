((window) => {
  let now = moment()
  // JSON DATA
  /*
  8:00 AM - 9:30 AM     Opening Ceremony and address
  9:30 AM - 10:45 AM    AI and Open Source
  10:45 AM - 11:00 AM   Networking and coffee break 
  11:00 AM - 12:45 PM   Compute for AI Models
  12:45 PM - 2:00 PM    Lunch
  --
  2:00 PM - 3:15 PM     AI Governanc
  3:15 PM - 3:30 PM     Networking and coffee break 
  3:30 PM - 3:45 PM     Foundation Models and Machine Learning
  4:45 PM - 6:00 PM     Panel discussion #1
  7:00 PM - 10:00 PM    Gala dinner
  */
  let schedule = [
    {
      date: moment(now).add(1, 'day'),
      agenda: [
        {current_li_id: 'current_li_0', mid: 'op0', mcls: 'op', range: ['09:00', '10:00'], display: { h: 9, m: 30, a: 'am', hto: 10, mto: '00', ato: 'am'  },   desc: 'Opening Ceremony and Address' },
        {current_li_id: 'current_li_1', mid: 'op1', mcls: 'op', range: ['10:00', '11:15'], display: { h: 10, m: '00', a: 'am', hto: 11, mto: '15', ato: 'am'  },   desc: 'AI and Open Source' },
        {current_li_id: 'current_li_2', mid: 'op2', mcls: 'op', range: ['11:15', '11:30'], display: { h: 11, m: '15', a: 'am', hto: 11, mto: 30, ato: 'am' }, desc: 'Networking and Coffee Break' },
        {current_li_id: 'current_li_3', mid: 'op3', mcls: 'op', range: ['11:30', '13:15'], display: { h: 11, m: '30', a: 'am', hto: 1, mto: '15', ato: 'pm' }, desc: 'Compute for AI Models' },
        {current_li_id: 'current_li_4', mid: 'op4', mcls: 'op', range: ['13:15', '14:30'], display: { h: 1, m: '15', a: 'pm', hto: 2, mto: '30', ato: 'pm' }, desc: 'Lunch' },
        {current_li_id: 'current_li_5', mid: 'op5', mcls: 'op', range: ['14:30', '15:45'], display: { h: 2, m: '30', a: 'pm', hto: 3, mto: '45', ato: 'pm' }, desc: 'AI Governance' },
        {current_li_id: 'current_li_6', mid: 'op6', mcls: 'op', range: ['15:45', '16:00'], display: { h: 3, m: '45', a: 'pm', hto: 4, mto: '00', ato: 'pm' }, desc: 'Networking and Coffee Break' },
        {current_li_id: 'current_li_7', mid: 'op7', mcls: 'op', range: ['16:00', '17:15'], display: { h: 4, m: '00', a: 'pm', hto: 5, mto: '15', ato: 'pm' }, desc: 'Foundation Models and Machine Learning' },
        {current_li_id: 'current_li_8', mid: 'op8', mcls: 'op', range: ['17:15', '18:30'], display: { h: 5, m: '15', a: 'pm', hto: 6, mto: '30', ato: 'pm' }, desc: 'Panel: The Future of Open-Source AI in the Real World.' },
        {current_li_id: 'current_li_9', mid: 'op9', mcls: 'op', range: ['19:00', '22:00'], display: { h: 7, m: '00', a: 'pm', hto: 10, mto: '00', ato: 'pm' }, desc: 'Gala Dinner' },
      ]
    }
  ]
  let timeFromNum = (num, sep, ampm) => {
    let hh = parseInt(num)
    let mm = Math.round((num-hh) * 60)
    sep = sep || ''
    return (hh>12&&ampm?hh-12:hh)+sep+('00'+mm).substr(-2)+(ampm?(hh>11?' pm':' am'):'')
  }
  let numFromTime = (time) => {
    let set = time.split(/[.:]/)
    let hh = parseInt(set[0])
    let mm = set[1] ? parseInt(set[1]) : 0
    return parseFloat((hh + mm / 60).toFixed(2))
  }
  let app = new Vue({
    el: 'aside',
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      time: moment().format('h:mm a'),
      showTimeTraveller: false
    }
  })
  let sked = new Vue({
    el: 'main',
    filters: {
      date: function(date) {
        return date.format('ddd, MMM D');
      }
    },
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      schedule: schedule
    },
    methods: {
      handleClick:function (ts, te, mid,current_li_id) {
        //console.log('This current_li_id.' + current_li_id);
       // console.log(ts + " " + te + " " + mid);
          let opClass = document.querySelector(".op");
          //console.log("-----------");
          //console.log("-----------");
          //alert(mid);
          //$("#op5").fadeIn(slow);
          $(".op").hide();
          let whichDiv = document.querySelector("#tmpl_" + mid);
          if (whichDiv) {
            //console.log(whichDiv.innerHTML);
            $("#" + mid).fadeIn('slow');
          //  $("#" + mid).show();
            $("#" + mid).html(whichDiv.innerHTML);
          }
        //alert(current_li_id);  
        $(".current").removeClass("current");
        $("#" + current_li_id).addClass("current");
      },
      checkTime: function (ts, te, mid) {
        if (this.now >= numFromTime(ts) && this.now < numFromTime(te)) {
          console.log(ts + " " + te + " " + mid);
          //let mid = document.querySelector('.mid');
          //let myElement = document.querySelector('.op3');
          let opClass = document.querySelector(".op");
          //console.log("-----------");
         // console.log("opClass");
         // console.log(opClass);
          console.log("-----------");
          //opClass.style.display = "none";
          $(".op").FadeOut(10000);
          let whichDiv = document.querySelector("#tmpl_" + mid);
          if (whichDiv) {
           // console.log(whichDiv);
            //whichDiv.style.display = "block";
            console.log(whichDiv.innerHTML);
            $("#" + mid).show();
            $("#" + mid).html(whichDiv.innerHTML);
          }
          return true;
        }
        return (this.now >= numFromTime(ts) && this.now < numFromTime(te))
      }
    }
  })
  let setClockPos = () => {
    setTimeout(() => {
      let anchor = document.querySelector('.current')
      let t = '1em'
      if (anchor) {
        t = Math.round(anchor.getBoundingClientRect().top) + 'px'
      }
      document.documentElement.style.setProperty('--y', t)
    }, 350)
  }
  let timeTraveler
  let setTime = function() {
    let now = moment()
    app.now = sked.now = numFromTime(moment(now).format('HH:mm'))
    app.time = moment(now).format('h:mm a')
  }
  let runTimer = () => {
    setClockPos()
    timeTraveler = setInterval(function() {
      setTime()
    }, 30000)
  }
  runTimer()
  let randum = function(min, max) {
    return Math.round((Math.random() * min) + (Math.random() * max));
  }
  let randex = function() {
    return '#' + ( '00' + Math.floor( Math.random() * 16777216 ).toString(16) ).substr(-6)
  }
  let colorizer = () => {
    let hex = randex()
    let reverseHex = '#' + hex.replace('#', '').split("").reverse().join("")
    document.documentElement.style.setProperty('--bg', hex)
    document.documentElement.style.setProperty('--accent', reverseHex)
  }
  let transformer = () => {
    document.documentElement.style.setProperty('--transform', 'translate(-50%, -50%) rotate(' + randum(-360, 360) + 'deg)');
  }
  setTimeout(() => {
    colorizer()
  }, 1000)  
  setTimeout(() => {
    transformer()
  }, 100)
  let adventureTime = window.setInterval(function() {
    colorizer()
  }, 7500);
  let partyTime = window.setInterval(function() {
    transformer()
  }, 12000);
  // resize capture
  let resizeTimer
  window.addEventListener('resize', (e) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setClockPos()
    }, 60);
  }, false)
})(window)