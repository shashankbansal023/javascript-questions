// create a memoize function

function memoize(fn,context){
    let cache = [];
    return function (...args){
        let argsHash = JSON.stringify(args);
        if(!cache[argsHash]){
            cache[argsHash] = fn.call(context|| this,...args);
        }
        return cache[argsHash];
    }
}
//polyfills 

Array.prototype.myMap = function (callback) {
    let arr = [];
    for(let i = 0; i < this.length;i++){
        arr.push(callback(this[i] , i , this));
    }
    return arr;
}

Array.prototype.myFilter = function(callback){
    let arr = [];
    for(let i = 0 ;i < this.length;i++){
        if(callback(this[i] , i , this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

Array.prototype.myReduce = function (callback , acc){
    for(let i = 0; i < this.length;i++){
        acc = callback(acc , this[i]);
    }
    return acc;
}

//call , apply , bind

Function.prototype.myCall = function(args){
    let context = args[0];
    this.call(args[0]);
} 

Function.prototype.myBind = function (args){
    let context = this;
    let params = args.slice(1);
    return function (...a){
        context.call(args[0] , ...[...params , ...a]);
    }
}


function abc(...args){
    console.log(this.name, args);
}

let obj = {
    name : "Shashank",
}

// abc.call(obj, "26"); // sets the context of the function to the object provided inside the parameter .

abc.apply(obj , ["a", "b" , "c"]);

const functionABC = abc.bind(obj ,"a","b" , "c");
functionABC()

function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.call(this, "convertible", "petrol");
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.call(this, "convertible", "diesel");
	this.price = price;
	console.log(`Car details = `, this);
}

const newBrand = new setBrand('Brand1'); // {brand : Brand1 , type: convertible , fuelType: petrol}
const newCarPrice = new definePrice(100000) // { price : 100000, type : convertible , fuelType: diesel}

const newEntity = (obj) => console.log(obj);

function mountEntity(){
	this.entity = newEntity;
	console.log(`Entity ${this.entity} is mounted on ${this}`);
}

mountEntity.call();




////

let arr = [1, 2,3,4,5];
let sum = arr.myReduce((acc , element)=>{
    return acc + element;
} ,0);

//prototype 

var foo = function(name){
    this.name = name;
}

foo.prototype.tellName = function (){
    console.log('tell my name ' , this.name);
}

var foo1 = new foo('James');
var foo2 = new foo('alice');

foo1.tellName();

console.log('sum',sum);

function goodDay(){
    const a = 10;
    return function (){
        console.log(a);
    }
}

const func = goodDay();

document.querySelector('.abc').addEventListener('click',func());

//Inheritance 

class Vehicle {
    constructor (vehicle) {
        this.vehicleType = vehicle;
    }

    blowHorn(){
        console.log(this.vehicleType);
    }
}

class Bus extends Vehicle{
    constructor(make){
        super('Bus');
        this.make = make;
    }

    ride(){
        console.log("ride cycle" ,  this.make);
    }
}

Bus.prototype.noOfTyres = 6;

const myBus = new Bus('2012');
console.log(myBus);