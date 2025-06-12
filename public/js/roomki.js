
const checkboxRoom = document.getElementById('roomid');
const checkboxVilla = document.getElementById('villaid');


function handleCheckboxClick(event) {
    const parentDivRoom = document.querySelectorAll(".rooom"); 
    const parentDivvilla = document.querySelectorAll(".vil");

    let roomshow="flex";
    let villashow="flex";

    if((checkboxRoom.checked && checkboxVilla.checked) || (!checkboxRoom.checked && !checkboxVilla.checked)){
        roomshow="flex";
        villashow="flex";
    }
    else if(checkboxRoom.checked){
        roomshow = "flex";
        villashow = "none";
    }
    else{
        roomshow = "none";
        villashow = "flex";
    }

    parentDivRoom.forEach((item)=>{
        item.style.display=roomshow;
   });
   parentDivvilla.forEach((item)=>{
        item.style.display = villashow;
});
}


checkboxRoom.addEventListener('change', handleCheckboxClick);
checkboxVilla.addEventListener('change', handleCheckboxClick);

