const fs = require('fs');
const readline = require('readline');

function ID() {}
ID.prototype.setByr = function(byr){this.byr = byr}
ID.prototype.setIyr = function(iyr){this.iyr = iyr}
ID.prototype.setEyr = function(eyr){this.eyr = eyr}
ID.prototype.setHgt = function(hgt){this.hgt = hgt}
ID.prototype.setHcl = function(hcl){this.hcl = hcl}
ID.prototype.setEcl = function(ecl){this.ecl = ecl}
ID.prototype.setPid = function(pid){this.pid = pid}
ID.prototype.setCid = function(cid){this.cid = cid}
ID.prototype.getByr = function(){console.log(this.byr)}
ID.prototype.getIyr = function(){console.log(this.iyr)}
ID.prototype.getEyr = function(){console.log(this.eyr)}
ID.prototype.getHgt = function(){console.log(this.hgt)}
ID.prototype.getHcl = function(){console.log(this.hcl)}
ID.prototype.getEcl = function(){console.log(this.ecl)}
ID.prototype.getPid = function(){console.log(this.pid)}
ID.prototype.getCid = function(){console.log(this.cid)}

// Does a validation of all the rules
ID.prototype.isValidId = function(){
    
    if (!this.byr) {return false} 
    else if( this.byr < 1920) {return false} 
    else if( this.byr > 2002) {return false}

    if (!this.iyr) {return false} 
    else if( this.iyr < 2010) {return false} 
    else if( this.iyr > 2020) {return false}

    if (!this.eyr) {return false} 
    else if( this.eyr < 2020) {return false} 
    else if( this.eyr > 2030) {return false}
    
    if (!this.hgt) {return false}
    var height = this.hgt.match(/[a-z]+|[^a-z]+/gi);  
    if (height[1]) {
        switch(height[1]){
            case "cm":
                if(height[0] < 150 || height[0] > 193) {return false;} 
            break;
            case "in":
                if(height[0] < 59 || height[0] > 76) {return false;}
            break;
            default:
                return false;
        }
    } else {return false}   

    if (!this.hcl) {return false}
    if (!this.hcl.match(/#(\d|[a-z]|[A-Z]){6}/gi)) {return false}

    if (!this.ecl) {return false}
    var validEyeColors = ["amb", "blu", "gry", "grn", "hzl", "oth", "brn"]
    if (!validEyeColors.includes(this.ecl)) {return false;}

    if (!this.pid) {return false} 
    if (!this.pid.match(/\b\d{9}\b/gi)) {return false}
    return true
    
}

// Does a print of all the values against their validation rules
// This was definitely was not neccessary, made for some nice formatiing output though
ID.prototype.printValidation = function(){
    
    if (!this.byr) {console.log("empty byr")} 
    else if( this.byr < 1920) {console.log("out of birth range - too low")} 
    else if( this.byr > 2002) {console.log("out of birth range - too high")}
    else {console.log("Birth year is valid")}

    if (!this.iyr) {console.log("empty iyr")} 
    else if( this.iyr < 2010) {console.log("out of iyr range - too low")} 
    else if( this.iyr > 2020) {console.log("out of iyr range - too high")}
    else {console.log("Issue year is valid")}

    if (!this.eyr) {console.log("empty eyr")} 
    else if( this.eyr < 2020) {console.log("out of expire range - too low")} 
    else if( this.eyr > 2030) {console.log("out of expiration range - too high")}
    else {console.log("Expiration year is valid")}
    
    if (!this.hgt) {console.log("empty hgt")}
    else {
        var height = this.hgt.match(/[a-z]+|[^a-z]+/gi);  
        if (height[1]) {
            switch(height[1]){
                case "cm":
                    if(height[0] < 150 ) {console.log("Height Validation:", height, "| This is TOO LOW and NOT valid")} else if (height[0] > 193) {console.log("Height Validation:", height, "| This is TOO HIGH and NOT valid")} 
                    else {console.log(console.log("Height Validation in cm:", height, "is valid"))} 
                break;
                case "in":
                    if(height[0] < 59 ) {console.log("Height Validation:", height, "| This is TOO LOW and NOT valid")} else if (height[0] > 76) {console.log("Height Validation:", height, "| This is TOO HIGH and NOT valid")} 
                    else {console.log(console.log("Height Validation in in:", height, "is valid"))}
                break;
                default:
                    console.log("height measure is INVALID");
            }
        } else {console.log("height invalid")}   
    }

    if (!this.hcl) {console.log("Haircolor is Empty");}
    else if (this.hcl && !this.hcl.match(/#(\d|[a-z]|[A-Z]){6}/gi)) {console.log("haircolor invalid")}
    else if(this.hcl)console.log("Hair Validation:", this.hcl.match(/#(\d|[a-z]|[A-Z]){6}/gi), "is valid")


    if (!this.ecl) {console.log("empty ecl");}
    else {
        var validEyeColors = ["amb", "blu", "gry", "grn", "hzl", "oth", "brn"]
        if (this.ecl && !validEyeColors.includes(this.ecl)) {console.log("Eye colors don't match")}
        console.log("Eye Validation:", validEyeColors.includes(this.ecl), " and is valid")  
    }

    if (!this.pid) {console.log("empty Passport ID")} 
    else if (this.pid && !this.pid.match(/\b\d{9}\b/gi)) {console.log("Passport ID is not valid")}
    else {console.log("Passport ID is valid")}
    return 
}

// Print out each ID info with validation and total success
function PrintIdInfo(id, validIdCt) {
    console.log("--------------------------------------");
    console.log(id);
    console.log(id.printValidation())
    console.log("This passport is", id.isValidId() ? "VALID." : "INVALID.", "That's a total of:", validIdCt, "valid ones.")
}

// Read in input file
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

var id = new ID();
var validIdCt = 0
lineReader.on('line', function (line) {
    if(line) {
        var lineElements = line.split(" ")
        lineElements.forEach(element => {
            var metaData = element.split(":")
            switch(metaData[0]){
                case "byr":
                    id.setByr(metaData[1])
                    break;
                case "iyr":
                    id.setIyr(metaData[1])
                    break;
                case "eyr":
                    id.setEyr(metaData[1])
                    break;
                case "hgt":
                    id.setHgt(metaData[1])
                    break;
                case "hcl":
                    id.setHcl(metaData[1])
                    break;
                case "ecl":
                    id.setEcl(metaData[1])
                    break;
                case "pid":
                    id.setPid(metaData[1])
                    break;
                case "cid":
                    id.setCid(metaData[1])
                    break;
            }
        });
    } else {
        if(id.isValidId()){validIdCt++}
        PrintIdInfo(id, validIdCt)
        id = new ID();
    }
}).on('close', function(){
    if(id.isValidId()){validIdCt++}
    PrintIdInfo(id, validIdCt)    
    console.log("-------------------------------------");
});
