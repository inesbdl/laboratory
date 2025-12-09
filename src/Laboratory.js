

class Laboratory{

    constructor(name,substancesList){
        this.name = name;
        this.substances = {};
        substancesList.forEach(substance => {
            this.substances[substance] = 0
        });
    }

    getQuantity(substance) {


        return this.substances[substance]
    }
    
}

module.exports = {Laboratory}