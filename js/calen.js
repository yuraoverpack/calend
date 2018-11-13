class MyEvent {

  constructor(name_t, date_t, users_t, description_t, number_t, id_t) {
    this.name = name_t;
    this.date = date_t;
    this.users = users_t;
    this.description = description_t;
    this.number = number_t;
    this.id = id_t;
  }


}

var mySingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;
  var isOpen = false;
  var currentObj = null;
  var events = [];
  var currentEvent = null;

  function init() {
    return {

      // Public methods and variables
      changeForm: function (obj) {
        changeForm(obj);
      },
      closeForm: function () {
        closeForm();
      },
      addEvent: function (title, date, users,description) {
        addEvent(title, date, users,description);
      },
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
      getEvents: function() {
        return JSON.stringify(events);
      },
      saveEvent: function(title, date, users,description) {
        saveEvent(title, date, users,description);
      },
      deleteEvent: function(){
        deleteEvent();
      }
    };

  };

    function changeForm(obj){
      if (!isOpen){
        document.getElementById("myForm").classList.add("show");
        isOpen = true;
      }
      else{
        if (currentObj == obj){
          document.getElementById("myForm").classList.remove("show");
          clearForm();
          isOpen = false;
        }
        else
        {
          currentEvent = null;
        }
      }
      currentObj = obj;
    }

    function closeForm(obj){
      isOpen = false;
      document.getElementById("myForm").classList.remove("show");
    }

    function clearForm(){
      var elems=document.getElementsByTagName("input");
      for(var i=0; i<elems.length; i++){
        elems[i].value="";
      }
      var elems=document.getElementsByTagName("textarea");
      for(var i=0; i<elems.length; i++){
        elems[i].value="";
      }
    }

    function addEvent(title, date, users,description){
      isOpen = false;
      document.getElementById("myForm").classList.remove("show");
      clearForm();
      var element = document.createElement('div');
      str = '';
      if (title != '')
        str += "Title: " + title + "; ";
      if (date != '')
        str += "Date: " + date + "; ";
      if (users != '')
        str += "Users: " + users + "; ";
      if (description != '')
        str += "Description: " + description + "; ";
      element.innerHTML = str;
      number = currentObj.getElementsByClassName('div_text').length + 1;
      element.value = number;
      element.name = currentObj.id;
      element.onclick = function() {
         id_tr = this.name;
         number = this.value;
         e = findEvent(id_tr, number);
         setEvent(e);
         fillForm(e);
         document.getElementById('save_changes_button').style.display = "";
         document.getElementById('delete_event_button').style.display = "";
      };
      element.classList.add('div_text');
      if (str != ''){
        myEvent = new MyEvent(title, date, users, description, number, currentObj.id);
        events.push(myEvent);
        currentObj.append(element);
      }
    }

    function saveEvent(title, date, users,description){
      isOpen = false;
      document.getElementById("myForm").classList.remove("show");
      document.getElementById('save_changes_button').style.display = "none";
      document.getElementById('delete_event_button').style.display = "none";
      clearForm();
      var element = document.getElementById(currentEvent.id).getElementsByClassName('div_text')[parseInt(currentEvent.number) - 1];
      str = '';
      if (title != '')
        str += "Title: " + title + "; ";
      if (date != '')
        str += "Date: " + date + "; ";
      if (users != '')
        str += "Users: " + users + "; ";
      if (description != '')
        str += "Description: " + description + "; ";
      element.innerHTML = str;
      currentEvent.name = title;
      currentEvent.date = date;
      currentEvent.users = users;
      currentEvent.description = description;
    }

    function deleteEvent(){
      isOpen = false;
      document.getElementById("myForm").classList.remove("show");
      document.getElementById('save_changes_button').style.display = "none";
      document.getElementById('delete_event_button').style.display = "none";
      clearForm();
      var element = document.getElementById(currentEvent.id).getElementsByClassName('div_text')[parseInt(currentEvent.number) - 1];
      element.remove();
      deleteItemInEvent(currentEvent.id, currentEvent.number)
    }
    function deleteItemInEvent(id, number){
      id = 0;
      index = null;
      events.forEach(function(e) {
          if (e.id == id &&  e.number == number){
            index = 1;
         }
         id += 1;
      });
      events.splice(index,1);
    }

    function findEvent(id, number){
      myEvent = null;
      events.forEach(function(e) {
          if (e.id == id &&  e.number == number){
            myEvent = e;
         }
      });
      return myEvent;
    }
    function setEvent(e){
      currentEvent = e;
    }
    function fillForm(myEvent){
      document.getElementById('sob').value = myEvent.name;
      document.getElementById('data').value = myEvent.date;
      document.getElementById('name').value = myEvent.users;
      document.getElementById('text_b').value = myEvent.description;
    }

  return {

    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();


function onClick(obj){
  events = mySingleton.getInstance();
  events.changeForm(obj);
}

function saveChanges(){
  var x = document.getElementById("sob").value;
  var y = document.getElementById("data").value;
  var o = document.getElementById("name").value;
  var p = document.getElementById("text_b").value;
  events = mySingleton.getInstance();
  events.saveEvent(x,y,o,p);
}

function deleteEvent(){
  events = mySingleton.getInstance();
  events.deleteEvent();
}

function getAllEvents(){
    events = mySingleton.getInstance();
    console.log(events.getEvents());
}


function getAllObjects(){
    events = mySingleton.getInstance();
    console.log(JSON.parse(events.getEvents()));
}



function closeForm() {
  events = mySingleton.getInstance();
  events.closeForm();
  console.log(events.getEvents())
}
function enter(){
  var x = document.getElementById("sob").value;
  var y = document.getElementById("data").value;
  var o = document.getElementById("name").value;
  var p = document.getElementById("text_b").value;
  events = mySingleton.getInstance();
  events.addEvent(x,y,o,p);
}


function Calendar(id, year, month) {

    var date = new Date();
    currentMonth = new Date(year,month+1,0).getMonth() + 1;
    currentYear = new Date(year,month+1,0).getFullYear();
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

    if (DNfirst != 0) {
      for(var  i = 1; i < DNfirst; i++) calendar += '<td class="last_new">';
    }else{
      for(var  i = 0; i < 6; i++) calendar += '<td >';
    }
    for(var  i = 1; i <= Dlast; i++) {
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today" id="'+ getMyDate(currentYear,currentMonth,i) +'" onclick="onClick(this)"><div class="day_now">' + i;
      }else{
        calendar += '<td  class="tabl_t " id="'+ getMyDate(currentYear,currentMonth,i) +'" onclick="onClick(this)" ><div class="nomer_d">' + i;
      }
      if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
        calendar += '<tr>';
      }
    }

    for(var  i = DNlast; i < 7; i++) calendar += '<td class="last_new">';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('.month').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('.month').dataset.month = D.getMonth();
    document.querySelector('.month').dataset.year = D.getFullYear();
  }
  function getMyDate(year, month, day){
    return year + '-' + month + '-' + day;
  }


  Calendar("calendar", new Date().getFullYear(), new Date().getMonth());

  document.querySelector('.p').onclick = function() {
    Calendar("calendar", document.querySelector('.month').dataset.year, parseFloat(document.querySelector('.month').dataset.month)-1);
  }

  document.querySelector('.n ').onclick = function() {
    Calendar("calendar", document.querySelector('.month').dataset.year, parseFloat(document.querySelector('.month').dataset.month)+1);
  }