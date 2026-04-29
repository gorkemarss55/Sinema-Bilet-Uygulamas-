class Storagex{

static keySelectedSeats="keySelectedSeats";
static keyFullSeats ="keyFullSeats";
static keySelectedMovie="keySelectedMovie";

 static getSelectedSeatsFromStorage() {
    let SelectedSeats;
    if(localStorage.getItem(this.keySelectedSeats)=== null){
        SelectedSeats=[];
    }else{
        SelectedSeats=JSON.parse(localStorage.getItem(this.keySelectedSeats));
    }
    return SelectedSeats;
 }
static getFullSeatsFromStorage(){
     let fullSeats;
    if(localStorage.getItem(this.keyFullSeats)=== null){
        fullSeats=[];
    }else{
        fullSeats=JSON.parse(localStorage.getItem(this.keyFullSeats));
    }
    return fullSeats;
 }

 static addSelectedSeatsToStorage(indexs){
    localStorage.setItem(this.keySelectedSeats,JSON.stringify(indexs));
 }

 static addFullSeatsToStorage(indexs){
   const fullSeatsIndex= this.getFullSeatsFromStorage();
        indexs.forEach(index=>fullSeatsIndex.push(index))
        localStorage.setItem(this.keyFullSeats, JSON.stringify(fullSeatsIndex));
    
 }

 static addSelectedMovieToStorage(index){
    localStorage.setItem(this.keySelectedMovie, JSON.stringify(index));
 }

 static getSelectedMovieIndexFromStorage(){
    return localStorage.getItem(this.keySelectedMovie);
 }
}