// var a=15;
// console.log(a);

// //functions
// function add(a,b){
//     console.log(a+b);
// }

// add(2,3);
// add("yasir","affan");
// //********************************************************* */
// //objects

// var obj={
//     name:"yasir",
//     age:22,
//     print: function(){
//         console.log(this.name+" "+this.age);
//     }
// }

// console.log(obj.name);
// obj.print();
//********************************************************* */
//constructors

// function Employee(name,age){
//     this.name=name;
//     this.age=age;
//     this.print = function(){
//         console.log(this.name+" "+this.age);
//     }
// }

// var emp1=new  Employee("yasir",22);
// var emp2=new Employee("affan",24);
// console.log(emp1.name+" "+emp2.age);
// emp1.print();

//********************************************************* */
//async 

function addAsync(a, b, cb) {
    console.log("Started...");

    //db,file,web service, setTimeout
    setTimeout(function () {
        console.log("Calculating");
        var c = a + b;
        cb(c, 1000);
    }, 2000);

    console.log("Ended");
    return undefined;
}

addAsync(20, 30, function callback(result, result2) {
    console.log(result, result2);
});
