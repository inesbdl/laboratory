

class Laboratory{

    constructor(name,substancesList){

        if(typeof name !== "string") throw new Error("Veuillez entrer un nom de laboratoire valide")
        if(!name) throw new Error("Veuillez entrer un nom de laboratoire")
        
        if(!substancesList || substancesList.length === 0) throw new Error("Veuillez entrer au moins une substance")

        substancesList.forEach(substance => {
            if(typeof substance !== "string") throw new Error("Veuillez entrer des noms de substance valides")
        })

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