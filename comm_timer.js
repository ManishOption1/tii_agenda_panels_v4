const TIME_INTERVAL_SPEED=20000;
function toggleProfilePopup(action, eno) {
    // popup.classList.toggle('visible');
     // Remove the 'highlight' class
     if(action=="show")  {
       clearInterval(active_agenda_interval);
       active_agenda_interval ="";
       const popup = document.getElementById('profilePopup_op'+eno);
       popup.classList.remove('visible_not');
       popup.classList.add('visible');
       $("#box_op"+eno).hide();
       $("#profilePopup_op"+eno).show();
     }else {
       const popup = document.getElementById('box_op'+eno);
       popup.classList.remove('visible_not');
       popup.classList.add('visible');
       $("#box_op"+eno).show();
       $("#profilePopup_op"+eno).hide();
       start_auto_timer();
     }
   }
   let active_agenda_no=-1;
   let active_agenda_interval;
   function op_auto_agenda() {
     //console.log(active_agenda_no);
     $("#current_li_"+active_agenda_no+ " .click_to_expand").click();
   }
 $(document).ready(function () {
       start_auto_timer();
       // Add a new button dynamically
       $(".click_to_expand").click(function (o) {
         clicked_id=$(this).parent().parent().attr("id");
         active_agenda_no = clicked_id.replace("current_li_","");
         //console.log(active_agenda_interval);
         if(active_agenda_interval=="") {}
         start_auto_timer();
       });
     });
 function start_auto_timer(){
   clearInterval(active_agenda_interval);
   active_agenda_interval=setInterval(() => {
     active_agenda_no++;
     if(active_agenda_no>9) {
       active_agenda_no=0;
     }
     op_auto_agenda();
   }, TIME_INTERVAL_SPEED)  ;
 }