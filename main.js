const container=document.querySelector(".container");
const Selectmovie=document.querySelector("#movieSelect");
const count=document.querySelector("#count");
const amount=document.querySelector("#amount");
const seats=Array.from(document.querySelectorAll(".seat"));
const buybutton=document.querySelector("#buybutton");

runEventListener();

function runEventListener(){
    container.addEventListener("click", select);
    Selectmovie.addEventListener("change",changeMovie);
    document.addEventListener("DOMContentLoaded",runPageLoaded);
    buybutton.addEventListener("click", buyTicket);
}
function changeMovie(){
   calculate(); 
    saveSelectedMovieIndexToStorage();
}
function runPageLoaded(){
   const selectedSeatsIndex =Storagex.getSelectedSeatsFromStorage();
   const fullSeatsIndex = Storagex.getFullSeatsFromStorage();

    seats.forEach((seat ,index)=>{
        if(selectedSeatsIndex.includes(index)){
            seat.classList.add("selected");
        }
    })

    seats.forEach((seat , index)=>{
        if(fullSeatsIndex.includes(index)){
            seat.classList.add("full");
        }
    })

    Selectmovie.selectedIndex = Storagex.getSelectedMovieIndexFromStorage();
    calculate();
}
function buyTicket(){
    
    if(confirm("Satın almak istiyor musunuz ?")){
        
    
        const selectedSeats = getSelectedSeat(); 
        const selectedSeatsIndex = getSelectedSeatsIndex();
        
        selectedSeats.forEach(seat => {
            seat.classList.remove("selected");
            seat.classList.add("full");
        });
        
        Storagex.addFullSeatsToStorage(selectedSeatsIndex);
        
        // DÜZELTME 2: Metot ismini düzelttik ve sepeti sıfırlamak için boş dizi [] gönderdik
        Storagex.addSelectedSeatsToStorage([]);

        // EKSTRA: Satın alma bittikten sonra aşağıdaki toplam tutar yazısını sıfırla
        calculate(); 
    }
}

function saveSelectedMovieIndexToStorage(){
    const selectedMovieIndex=Selectmovie.selectedIndex;
    Storagex.addSelectedMovieToStorage(selectedMovieIndex);
}

function select(e){
const selectedElement=e.target.parentElement;
if(selectedElement.classList.contains("seat")&& !selectedElement.classList.contains("full")){
    selectedElement.classList.toggle("selected");
    calculate();
    saveSelectedSeatsIndexToStorage(); 
    saveSelectedMovieIndexToStorage();
}
}

function getSelectedSeat(){
    const selectedList=[...container.querySelectorAll(".selected")];
    return selectedList;
}
function getSelectedSeatsIndex(){
    const selectedList=getSelectedSeat();
    const selectedSeatIndex=selectedList.map((seat)=>{
        return seats.indexOf(seat);
    })
    return selectedSeatIndex;
}

function saveSelectedSeatsIndexToStorage(){
    const selectedSeatsIndex=getSelectedSeatsIndex();
    Storagex.addSelectedSeatsToStorage(selectedSeatsIndex);
}

function calculate(){
const SelectedSeatsCount=getSelectedSeat().length;
const price=Selectmovie.value;

count.textContent=SelectedSeatsCount;
amount.textContent=SelectedSeatsCount*price;
}