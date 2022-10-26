
const weekday = ["Mon","Tue","Wed","Thu","Fri","Sat" , "Sun"];
const dayweek = {"Mon": 0,"Tue" : 1,"Wed":2,"Thu":3,"Fri":4, "Sat":5 , "Sun":6};


class Solution{
   
    constructor(){
        // intializing the dict
        this.dict ={}

    }
    meanify(){
        // adding all days aka which are not present as NAN
        for (const [key, value] of Object.entries(dayweek)) {
            if(!(key in this.dict)){
                this.dict[key] = NaN
            }
        }
        
        //distribute the value around dict
        for (const [key, value] of Object.entries(this.dict)) {
            
            if(isNaN(value)){
                // found a day which is missing now will check if next day is also missing
                
                let prev = dayweek[key]-1;
                let cnt = dayweek[key];
                while(cnt < 6 && isNaN(this.dict[weekday[cnt]])){
                    cnt++;
                }
                // if the days are missing in a line then they will form AP with adjacent members therefore finding the d of ap and applying formula
                let n = cnt-prev-1;
                let d = (this.dict[weekday[cnt]]-this.dict[weekday[prev]])/(n+1);
                cnt = dayweek[key]
                let k = 1;

                //adding the values back as formula a+d , a+2d , a+3d
                while(cnt < 6 && isNaN(this.dict[weekday[cnt]])){
                    this.dict[weekday[cnt]] = this.dict[weekday[prev]]+(k* d );
                    cnt++;
                    k++;
                }
            }
        }
    }
    add(D){
        // looping through all input and adding to dict
       
        for (const [key, value] of Object.entries(D)) {
            let date = new Date(key)
            // getting the value of day according to our const 
            let x = date.getDay()-1;
            if(x < 0){
                x = 6;
            }
            let day = weekday[x];
            
            if(day in this.dict){
                this.dict[day]+= value;
            }else{
                this.dict[day] = value;
            }
            
        }
        this.meanify()
    }
    
    print(){
        // printing the dict
        console.log(this.dict)
    }
}



//let D = {"2020-01-01":4, "2020-01-02": 4, "2020-01-03": 6, "2020-01-04": 8, "2020-01-05": 2, "2020-01-06": -6, "2020-01-07": 2, "2020-01-08" : -2}
let D = {"2020-01-01":6, "2020-01-04": 12, "2020-01-05": 14, "2020-01-06": 2, "2020-01-07":4}

let soln = new Solution();


soln.add(D)
soln.print()
