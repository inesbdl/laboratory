

class Laboratory{

    constructor(name,substancesList){
        this.name = name;
        this.substances = {};
        substancesList.forEach(substance => {
            this.substances[substance] = 0
        });
    }

    getQuantity(substance) {

        if(!substance) throw new Error('Veuillez entrer un nom de substance')
        if (typeof substance === "string" && !(substance in this.substances)) throw new Error(`La substance '${substance}' n'existe pas`)
        if(typeof substance !== "string") throw new Error("Veuillez entrer un nom de substance valide")
            
        return this.substances[substance]
    }
    
}

module.exports = {Laboratory}