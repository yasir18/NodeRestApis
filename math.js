//this becomes private
var calc={
    display: function(){
        return "calculator output";
    },
    myProperty:"sample"
}

//this becomes public and can be accessed in other files
var calc2={
    display2: function(){
        return "calculator output 2";
    },
    myProperty2:"sample 2"
}

module.exports=calc2;