

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

    add(substance,qte){

        if(!substance) throw new Error("Veuillez entrer un nom de substance")
        if (typeof substance === "string" && !(substance in this.substances)) throw new Error(`La substance '${substance}' n'existe pas`)
        if(typeof substance !== "string") throw new Error("Veuillez entrer un nom de substance valide")

        if (!qte) throw new Error("Veuillez entrer une quantité")
        if(typeof qte !== "number") throw new Error("Veuillez entrer une quanttié valide")

        // volontairement pas de vérif si qte positive ou négative car ça permet de retirer des qte de substance
        this.substances[substance] += qte
    }
    
}

module.exports = {Laboratory}