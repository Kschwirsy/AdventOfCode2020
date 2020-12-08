const fs = require('fs');
const readline = require('readline');

class Bag {
    constructor (bagColor, innerBags) {
        this.bagColor = bagColor
        this.innerBags = innerBags
    }

    GetColor = () => {
        return this.bagColor;
    }

    HasGoldenBags = () => {
        var foundGold = false;
        if (this.innerBags){
            for(var i = 0; i < this.innerBags.length; i++){
                if(!foundGold){
                    this.innerBags[i].bag.GetColor() === "shiny gold" ? foundGold = true : foundGold = bagMap[this.innerBags[i].bag.GetColor()].HasGoldenBags()
                }
            }
        }
        return foundGold
    }

    TotalNestedBags = () => {
        var total = 0

        if (this.innerBags){
            for(var i = 0; i < this.innerBags.length; i++){
                var numberOfInner = parseInt(this.innerBags[i].count)
                var totalBags = numberOfInner + (numberOfInner * bagMap[this.innerBags[i].bag.GetColor()].TotalNestedBags());
                total += totalBags;
            }
            return total
        }
    }
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./Day7/input.txt')
});

var bagMap = [];

lineReader.on('line', function (line) {
    bagContains = []

    if(line) {
        var splitLine = line.replace(/(bags?)|\./gi, "").split("contain")
        var bagColor = splitLine[0].trim()

        splitLine[1].split(",").forEach(rule => {
            if(rule.trim() !== "no other") {
                bagContains.push({
                    count: rule.match(/\d/gi)[0],
                    bag: new Bag(rule.match(/([a-zA-Z]+) ([a-zA-Z]+)/ig)[0])
                })
            }
        })
        bagMap[bagColor] = new Bag(bagColor, bagContains)
    }
}).on('close', function(){
    var goldenCount = 0;

    for(let bag in bagMap){
        bagMap[bag].HasGoldenBags() ? goldenCount++ : true
    }
    console.log("Total Golden Bags:", goldenCount)
    console.log("Total bags in golden:", bagMap['shiny gold'].TotalNestedBags())

});
