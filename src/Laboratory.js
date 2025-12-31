class Laboratory {

    constructor(name, substancesList, reactions = {}) {

        // validations laboratoire
        if (typeof name !== "string") throw new Error("Veuillez entrer un nom de laboratoire valide")
        if (!name) throw new Error("Veuillez entrer un nom de laboratoire")

        if (!substancesList || substancesList.length === 0) {
            throw new Error("Veuillez entrer au moins une substance")
        }

        substancesList.forEach(s => {
            if (typeof s !== "string") {
                throw new Error("Veuillez entrer des noms de substance valides")
            }
        })

        this.name = name
        this.substances = {}
        substancesList.forEach(s => this.substances[s] = 0)

        // validations reactions
        if (typeof reactions !== "object" || Array.isArray(reactions)) {
            throw new Error("Veuillez entrer des reactions valides")
        }

        const entries = Object.entries(reactions)

        if (entries.length === 0) {
            this.reactions = {}
            return
        }

        entries.forEach(([product, reactifs]) => {

            if (typeof product !== "string" || !product) {
                throw new Error("Veuillez entrer des noms de produit valides")
            }

            if (!Array.isArray(reactifs) || reactifs.length === 0) {
                throw new Error("Chaque réaction doit avoir au moins deux réactifs")
            }

            if (reactifs.length === 1 && substancesList.length > 1) {
                throw new Error("Chaque réaction doit avoir au moins un réactif")
            }

            const seen = new Set()

            reactifs.forEach(r => {
                if (!Array.isArray(r) || r.length !== 2) {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }

                const [qte, name] = r

                if (qte === null || typeof qte !== "number") {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }
                if (qte <= 0) {
                    throw new Error("La quantité doit être un nombre strictement positif")
                }

                if (typeof name !== "string") {
                    throw new Error("Veuillez entrer des couples quantité substance valides")
                }

                // substance inconnue UNIQUEMENT si reaction >= 2 reactifs
                if (reactifs.length >= 2 && !(name in this.substances)) {
                    throw new Error("Substance inconnue")
                }

                if (seen.has(name)) {
                    throw new Error("Une reaction ne peut pas contenir deux fois la meme substance")
                }
                seen.add(name)
            })
        })

        this.reactions = reactions
    }

    // stock 
    getQuantity(name) {
        if (!name) throw new Error("Veuillez entrer un nom de substance")
        if (typeof name !== "string") throw new Error("Veuillez entrer un nom de substance valide")
        if (!(name in this.substances)) {
            throw new Error(`La substance '${name}' n'existe pas`)
        }
        return this.substances[name]
    }

    add(name, qte) {
        if (!name) throw new Error("Veuillez entrer un nom de substance")
        if (typeof name !== "string") throw new Error("Veuillez entrer un nom de substance valide")

        if (!(name in this.substances)) {
            this.substances[name] = 0
        }

        if (!qte) throw new Error("Veuillez entrer une quantité")
        if (typeof qte !== "number") throw new Error("Veuillez entrer une quantité valide")

        this.substances[name] += qte
    }

    // fabrication
    make(product, quantity, stack = new Set()) {

        if (!product) throw new Error("Veuillez entrer un nom de produit")
        if (typeof product !== "string") throw new Error("Veuillez entrer un nom de produit valide")

        if (!quantity) throw new Error("Veuillez entrer une quantité")
        if (typeof quantity !== "number") throw new Error("Veuillez entrer une quantité valide")
        if (quantity <= 0) throw new Error("La quantité doit être strictement positive")

        if (!(product in this.reactions)) {
            throw new Error("Aucune reaction pour ce produit")
        }

        if (!(product in this.substances)) {
            this.substances[product] = 0
        }

        if (stack.has(product)) {
            throw new Error("Boucle de reactions detectee")
        }
        stack.add(product)

        let max = Infinity

        for (const [need, reactif] of this.reactions[product]) {

            const stock = this.substances[reactif] || 0

            // substance simple
            if ((reactif in this.substances) && !(reactif in this.reactions)) {
                max = Math.min(max, Math.floor(stock / need))
                continue
            }

            // reactif produit
            if (reactif in this.reactions) {

                const possibleFromStock = Math.floor(stock / need)

                // stock existant mais insuffisant
                if (stock > 0 && possibleFromStock < quantity) {
                    max = Math.min(max, possibleFromStock)
                    continue
                }

                if (possibleFromStock < quantity) {
                    const toProduce = (quantity - possibleFromStock) * need
                    const produced = this.make(reactif, toProduce, new Set(stack))
                    const total = stock + produced
                    max = Math.min(max, Math.floor(total / need))
                } else {
                    max = Math.min(max, quantity)
                }
                continue
            }

            // reactif sans reaction
            throw new Error(`Aucune reaction pour le reactif ${reactif}`)
        }

        const qty = Math.min(quantity, max)

        if (qty === 0) {
            stack.delete(product)
            return 0
        }

        for (const [need, reactif] of this.reactions[product]) {
            this.substances[reactif] -= need * qty
        }

        this.substances[product] += qty
        stack.delete(product)
        return qty
    }
}

module.exports = { Laboratory }
