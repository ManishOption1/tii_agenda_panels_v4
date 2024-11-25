((window) => {
  let now = moment()
  // JSON DATA
  /*
**  9:00 AM - 10:45 AM    === Foundation Models 1
------------------------------
** 10:45 AM - 11:00 AM   === Networking and Coffee Break
-----------------------------
11:00 AM - 12:45 PM  ===  Foundation Models 2
                        Talk #12: Gamification of large language models (LLMs)
                        Dr. Michal Valko, Principal Llama Engineer, Meta Paris, France
                          -----------------------------
                          Talk #13: Falcon Mamba: The first competitive attention-free 7B language model
                          Dr. Jingwei Zuo, Researcher, Technology Innovation Institute, UAE
                          -----------------------------
                          Talk #14: Moshi: An open-source, real-time speech-to-speech LLM
                          Dr. Neil Zeghidour, Co-Founder and Chief Modeling Officer, Kyutai, France
-----------------------------
12:45 PM - 2:00 PM   === Lunch
------------------------------
2:00 PM - 3:15 PM   === Open Source for Business Opportunities
                        Talk #15: The importance of open source for entrepreneurship, talent and resilience
                        Dr. Nicolas Granatino, Co-Founder, Andurance Ventures, UK
                          -----------------------------
                          Talk #16: DeepThought: Teaching models to “reason”
                          Dr. Farouk Elghamry, Founding Engineer, Ruliad, UAE
                          -----------------------------
-------------------------                          
3:15 PM - 3:30 PM   === Networking and Coffee Break
--------------------------------
3:30 PM - 4:45 PM    === AI for Future Systems
                            Talk #17: How do we make the next PDB? Introducing Align to Innovate's data platform
                            Dr. Erika DeBenedictis, Chief Executive Officer, Pioneer Labs, USA
                                -----------------------------
                                Talk #18: Building an AI scientist to automate discovery
                                Dr. Samuel Rodriques, Director & Chief Executive Officer, FutureHouse, USA
-----------------------------
4:45 PM - 6:00 PM   === Panel: TII and the Open Source AI Vision
-----------------------------
6:00 PM - 6:15 PM   === Closing Remarks
  */
  let schedule = [
    {
      date: moment(now).add(1, 'day'),
      agenda: [
        {current_li_id: 'current_li_0', mid: 'op0', mcls: 'op', range: ['09:00', '10:45'], display: { h: 9, m: '00', a: 'am', hto: 10, mto: '45', ato: 'am' }, desc: 'Foundation Models 1' },
        {current_li_id: 'current_li_1', mid: 'op1', mcls: 'op', range: ['10:45', '11:00'], display: { h: 10, m: '45', a: 'am', hto: 11, mto: '00', ato: 'am' }, desc: 'Networking and Coffee Break' },
        {current_li_id: 'current_li_2', mid: 'op2', mcls: 'op', range: ['11:00', '12:45'], display: { h: 11, m: '00', a: 'am', hto: 12, mto: 45, ato: 'am' }, desc: 'Foundation Models 2' },
        {current_li_id: 'current_li_3', mid: 'op3', mcls: 'op', range: ['12:45', '14:00'], display: { h: 12, m: '45', a: 'am', hto: 2, mto: '00', ato: 'pm' }, desc: 'Lunch' },
        {current_li_id: 'current_li_4', mid: 'op4', mcls: 'op', range: ['14:00', '15:15'], display: { h: 2, m: '00', a: 'pm', hto: 3, mto: '15', ato: 'pm' }, desc: 'Open Source for Business Opportunities' },
        {current_li_id: 'current_li_5', mid: 'op5', mcls: 'op', range: ['15:15', '15:30'], display: { h: 3, m: '15', a: 'pm', hto: 3, mto: '30', ato: 'pm' }, desc: 'Networking and Coffee Break' },
        {current_li_id: 'current_li_6', mid: 'op6', mcls: 'op', range: ['15:30', '16:45'], display: { h: 3, m: '30', a: 'pm', hto: 4, mto: '45', ato: 'pm' }, desc: 'AI for Future Systems' },
        {current_li_id: 'current_li_7', mid: 'op7', mcls: 'op', range: ['16:45', '18:00'], display: { h: 4, m: '45', a: 'pm', hto: 6, mto: '00', ato: 'pm' }, desc: 'Panel: TII and the Open Source AI Vision' },
        {current_li_id: 'current_li_8', mid: 'op8', mcls: 'op', range: ['18:00', '18:15'], display: { h: 6, m: '00', a: 'pm', hto: 6, mto: '15', ato: 'pm' }, desc: 'Closing Remarks' },
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
          $(".op").hide();
          let whichDiv = document.querySelector("#tmpl_" + mid);
          if (whichDiv) {
            //console.log(whichDiv.innerHTML);
            $("#" + mid).fadeIn('slow');
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