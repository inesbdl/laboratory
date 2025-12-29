

class Laboratory{

    constructor(name, substancesList, reactions = {}) {

        if (typeof name !== "string") throw new Error("Veuillez entrer un nom de laboratoire valide")
        if (!name) throw new Error("Veuillez entrer un nom de laboratoire")

        if (!substancesList || substancesList.length === 0) {
            throw new Error("Veuillez entrer au moins une substance")
        }

        substancesList.forEach(substance => {
            if (typeof substance !== "string") {
                throw new Error("Veuillez entrer des noms de substance valides")
            }
        })

        this.name = name
        this.substances = {}
        substancesList.forEach(substance => {
            this.substances[substance] = 0
        })

        if (typeof reactions !== "object" || Array.isArray(reactions)) {
            throw new Error("Veuillez entrer des reactions valides")
        }

        const reactionEntries = Object.entries(reactions)

        if (reactionEntries.length === 0) {
            this.reactions = {}
            return
        }

        reactionEntries.forEach(([productName, reactifs]) => {

            // nom du produit
            if (typeof productName !== "string" || !productName) {
                throw new Error("Veuillez entrer des noms de produit valides")
            }

            // reactifs
            if (!Array.isArray(reactifs) || reactifs.length < 2) {
                throw new Error("Chaque réaction doit avoir au moins deux réactifs")
            }

            const seenSubstances = new Set()

            reactifs.forEach(reactif => {

                if (!Array.isArray(reactif) || reactif.length !== 2) {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }

                const [quantite, substance] = reactif

                // quantité
                if (quantite === null || typeof quantite !== "number") {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }

                if (quantite <= 0) {
                    throw new Error("La quantité doit être un nombre strictement positif")
                }

                // substance
                if (typeof substance !== "string") {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }

                if (!(substance in this.substances)) {
                    throw new Error("Substance inconnue")
                }

                if (seenSubstances.has(substance)) {
                    throw new Error("Une reaction ne peut pas contenir deux fois la meme substance")
                }

                seenSubstances.add(substance)
            })
        })

        this.reactions = reactions
    }

    getQuantity(substance) {

        if(!substance) throw new Error('Veuillez entrer un nom de substance')
        if (typeof substance === "string" && !(substance in this.substances)) throw new Error(`La substance '${substance}' n'existe pas`)
        if(typeof substance !== "string") throw new Error("Veuillez entrer un nom de substance valide")

        return this.substances[substance]
    }

    add(substance,qte){
        //TODO faire un tableau d'erreurs pour en ressortir pls si besoin
        if(!substance) throw new Error("Veuillez entrer un nom de substance")
        if(typeof substance !== "string") throw new Error("Veuillez entrer un nom de substance valide")

        if(substance in this.substances === false) {
            this.substances[substance] = 0
        }

        if (!qte) throw new Error("Veuillez entrer une quantité")
        if(typeof qte !== "number") throw new Error("Veuillez entrer une quanttié valide")

        // volontairement pas de vérif si qte positive ou négative car ça permet de retirer des qte de substance
        this.substances[substance] += qte
    }

}

module.exports = {Laboratory}