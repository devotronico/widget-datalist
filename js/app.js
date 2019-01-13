let count = 1;

// let group, search, list, items;

let group = document.querySelector('.widget-1'); // seleziona il widget
let search = group.querySelector(".widget__search"); // seleziona il campo input
let list = group.querySelector(".widget__list"); // seleziona il secondo UL
let items = list.querySelectorAll(".widget__item"); // seleziona tutti gli elementi LI figli del secondo elemento UL
//  button.textContent = "▼";








/**
 * Quando non si clicca il campo INPUT e un ITEM
 * viene resettato il valore del campo INPUT
 * 
 * Se si clicca un ITEM
 * il valore del campo INPUT sarà uguale a quello dell' ITEM cliccato
 * 
 * Al click sul campo INPUT si attivano le funzioni:
 * init_list()
 * show_list(list)
 * key_up_down()
 */
document.addEventListener('click', function (e) {  // console.log('click');

 if ( e.target.classList.item(0) === "widget__search" ) { console.log('cambia widget');

  list.dataset.toggle = 'false'; 

  group = e.target.parentNode;
  search = e.target; //console.dir( search);
  list = group.children[2];
  items = list.querySelectorAll(".widget__item"); 


  search.addEventListener('input', input_digit);   
  search.addEventListener('keypress', input_enter); // 

 }




  if (e.target != search && e.target.parentNode != list ) { //  console.log('chiude');

    list.dataset.toggle = 'false'; 
  } else if (e.target == search ) {  // console.log('apre');

  search.value = null;
  init_list();
  // for (let i = 0; i < items.length; i++) { matching(items[i]) }
  show_list(list);
  key_up_down();
  }

});




/**
 * quando il campo INPUT è attivo e ci si scrive dentro
 */
function input_digit() {

  console.log('input');
  for (let i = 0; i < items.length; i++) { 
    matching(items[i])
  }
  show_list(list);
  key_up_down();
};











/**
 * Se in precedenza è stato già digitato qualcosa nel campo input
 * 
 * Se prima di premere il tasto ENTER (keyCode = 13 info -> https://keycode.info/)
 * è stato selezionato un elemento LI con i tasti freccia su e giù (data-highlight="true")
 * allora il campo input assume il valore dell' elemento selezionato
 * 
 * la funzione hide_list(): nasconde il secondo elemento UL e tutti i suoi elementi figli LI
 * la funzione init_list(): riinizializza la lista LI
 */
function input_enter(e){  console.log('keypress');

  if (e.keyCode == 13) {  console.log('enter');

    this.value = list.querySelector('[data-highlight="true"]') ? list.querySelector('[data-highlight="true"]').innerHTML : this.value; 
  }
  hide_list(list);
  init_list();

}





/**
 * per ogni elemento LI che viene passato come paramentro
 * controlla se il testo che contiene ha corrispondeza con il testo presente nel campo INPUT
 * Se c'è corrispondenza allora l'attributo display dell'elemento LI viene settato a true 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 * @todo aggiungere la sottolineatura alle lettere
 * @param {*} item 
 */
function matching(item) {
  const str = new RegExp(search.value, 'gi');
  if (item.innerHTML.match(str)) {

    item.dataset.display = 'true';
    
    //console.log(item.innerHTML.match(str));
    // let replaceText = `<span class="test">${item.innerHTML.match(str)}</span>`; 
    //let replaceText = `<span class="test">${search.value}</span>`; 
    //item.innerHTML =  item.innerHTML.replace(str, replaceText); 
  } else {

    item.dataset.display = 'false';
    item.dataset.highlight = 'false';
    count = 0;
  }
}



/**
 * resetta count
 * Per ogni elemento LI della lista di elementi del secondo UL:
 * la funzione init_item: setta i loro attributi nel loro stato di default e
 * aggiunge a ognuno di essi un evento click che attiva la funzione copy_paste
 */
function init_list() {
  count = 0;
  for (let i = 0; i < items.length; i++) {
    init_item(items[i]);
    items[i].addEventListener('click', copy_paste);
  }
}



/**
 * setta gli attributi degli elementi LI 
 * nel loro stato di default:
 * @param {*} item 
 */
function init_item(item) {
  item.dataset.display = 'true';
  item.dataset.highlight = 'false';
}


/**
 * Al click su un elemento LI della lista:
 * al campo INPUT viene assegnato il valore della stringa che contiene l'elemento LI
 * 
 * con la funzione init_list():
 * con la funzione hide_list(): nasconde il secondo elemento UL e tutti i suoi elementi figli LI
 */
function copy_paste() {
  search.value = this.innerHTML;
  
  // todo : controlla la corrispondenza del testo dell'elenco e il valore di input per la classe .current 
  init_list();
  hide_list(list);
}



/**
 * nasconde il secondo elemento UL e tutti i suoi elementi figli LI
 * @param {*} ele 
 */
function hide_list(ele) {
  ele.dataset.toggle = 'false'
}


/**
 * Rende visibile l'elemento UL e la lista di elementi LI e
 * vedere file css
 * @param {*} ele 
 */
function show_list(ele) {
  ele.dataset.toggle = 'true'
}

function key_up_down() {

  var items = group.querySelectorAll('li[data-display="true"]');
  var last = items[items.length - 1];
  var first = items[0];

  search.onkeydown = function (e) {
    
    /**
     * Se viene premuto il tato freccia alto(up arrow)
     */
    if (e.keyCode === 38) { 
      count--;
      count = count <= 0 ? items.length : count;
      items[count - 1].dataset.highlight = items[count - 1] ? 'true' : 'false';
      if (items[count]) {
        items[count].dataset.highlight = 'false';
      }
      else {
        first.dataset.highlight = 'false';
      }
    } 
    
    if (e.keyCode === 40) {
      items[count].dataset.highlight = items[count] ? 'true' : 'false';
      if (items[count - 1]) {
        items[count - 1].dataset.highlight = 'false';
      }
      else {
        last.dataset.highlight = 'false';
      }
      count++;
      count = count >= items.length ? 0 : count;
    }
  };
}






/* <FUNZIONI-DISATTIVATE> */


/*
search.addEventListener('keypress', function (e) {  console.log('keypress'); // keypress

  if (e.keyCode == 13) { 

    this.value = list.querySelector('[data-highlight="true"]') ? list.querySelector('[data-highlight="true"]').innerHTML : this.value; 
  }
  hide_list(list);
  init_list();
});
*/




/**
 * Quando non si clicca il campo INPUT e un ITEM
 * viene resettato il valore del campo INPUT
 * 
 * Se si clicca un ITEM
 * il valore del campo INPUT sarà uguale a quello dell' ITEM cliccato
 * 
 * Al click sul campo INPUT si attivano le funzioni:
 * init_list()
 * show_list(list)
 * key_up_down()
 */
/*
document.addEventListener('click', function (e) {  // console.log('click');

  if (e.target != search && e.target.parentNode != list ) {// && e.target.parentNode != list){ console.log('chiude lista');

    console.log('chiude');
    
    // search.value = null;
     
    
      list.dataset.toggle = 'false'; 
    } else if (e.target == search )  {  console.log('apre');

    search.value = null;
    init_list();
   // for (let i = 0; i < items.length; i++) { matching(items[i]) }
    show_list(list);
    key_up_down();
    
    }
});
*/






/**
 * quando il campo INPUT è attivo e ci si scrive dentro
 */
/*
search.addEventListener('input', function (e) {   

    for (let i = 0; i < items.length; i++) {
      matching(items[i])
    }
    show_list(list);
    key_up_down();
});
*/





/**
 * Al click sul campo input per attivarlo
 * 
 * la funzione init_list(): per ogni elemento LI della lista:
 *  reset degli attributi al loro valore di default, e 
 *  assegna a ognuno di essi la funzione evento copy_paste()
 * 
 * la funzione show_list(): Rende visibile l'elemento UL e la lista di elementi LI 
 */
/*
search.addEventListener('click', function (e) {   console.log('click search');

  init_list();
  show_list(list);
  key_up_down();
});
*/





/**
 * Se il mouse esce fuori dal widget
 *  Se il target non è l' elemento lista(secondo UL) e 
 *  Se il target non è un elemento item della lista(UL->LI)
 */
/*
group.addEventListener('mouseleave', function(e){ 

  if (e.target != list && e.target.parentNode != list){ console.log('chiude lista');

    list.dataset.toggle = 'false'; // console.log('toggle = false');
  } else {

    console.log('NON chiude lista');
  }
});
*/





/*
let freccia = group.querySelector(".widget__search"); // seleziona il campo input
  freccia.addEventListener('click', function (e) {  console.log('freccia');
});
*/


/* </FUNZIONI-DISATTIVATE> */