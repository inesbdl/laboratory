
const { Laboratory } = require('../src/Laboratory.js');

// Initialiser

test('initialisation du laboratoire', () => {
    const reactions = {
        ProduitA: [
            [2, "Substance1"],
            [1, "Substance2"]
        ],
        ProduitB: [
            [3, "Substance2"],
            [1, "Substance3"]
        ]
    }
    const labo = new Laboratory(
        "My laboratory",
        ["Substance1", "Substance2", "Substance3"], reactions
    )
    expect(labo.name).toBe("My laboratory");
    expect(labo.substances).toEqual({
        Substance1 : 0,
        Substance2 : 0,
        Substance3 : 0
    })
    expect(labo.reactions).toEqual(reactions)
});

test('initialisation du laboratoire type nom invalide', ()=>{
    expect(() => new Laboratory(true,["Substance1", "Substance2", "Substance3"]) ).toThrow("Veuillez entrer un nom de laboratoire valide") 
})
test('initialisation du laboratoire nom vide', ()=>{
    expect(() => new Laboratory(null,["Substance1", "Substance2", "Substance3"]) ).toThrow("Veuillez entrer un nom de laboratoire") 
})
test('initialisation du laboratoire sans substances', ()=>{
    expect(() => new Laboratory("My laboratory",[]) ).toThrow("Veuillez entrer au moins une substance") 
})
test('initialisation du laboratoire type substance invalide', ()=>{
    expect(() => new Laboratory("My laboratory",[1,true]) ).toThrow("Veuillez entrer des noms de substance valides") 
})

// Récupérer la quantité

test("voir la quantité d'une substance existante", ()=> {
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(labo.getQuantity("Substance1")).toBe(0)
})

test("voir la quantité d'une substance qui n'existe pas", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=>labo.getQuantity("coucou")).toThrow("La substance 'coucou' n'existe pas")  
})

test ('voir la quantité d une substance avec un nom invalide null', ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=>labo.getQuantity(null)).toThrow("Veuillez entrer un nom de substance")  
})

test ('voir la quantité d une substance avec un nom invalide pas string', ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.getQuantity(1)).toThrow("Veuillez entrer un nom de substance valide")  
})


// ajout quantité
test("ajout quantité substance existante", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    labo.add("Substance1", 2)
    labo.add("Substance1", 2)
    expect(()=> labo.getQuantity("Substance1").toEqual(4))
})

// test("ajout quantité substance non existante", ()=>{
//     const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
//     expect(()=> labo.add("Substance123", 2).toThrow("La substance 'Substance123' n'existe pas"))
// })
test("ajout quantité substance nom null", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add(null, 2).toThrow("Veuillez entrer un nom de substance"))
})
test("ajout quantité substance nom pas string", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(() => labo.add({name:"coucou"}, 2).toThrow("Veuillez entrer un nom de substance valide"))
})

test("ajout quantité substance qte null", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(() => labo.add("Substance1", null).toThrow("Veuillez entrer une quantité"))
})
test("ajout quantité substance qte invalide", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(() => labo.add("Substance1", []).toThrow("Veuillez entrer une quantité valide"))
})


// ajout produit stock
test("ajout nouveau produit stock", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    labo.add("Substance123", 2)
    expect(labo.getQuantity("Substance123")).toEqual(2)
})


test("ajout nouveau produit nom null", () => {
    const labo = new Laboratory("My laboratory", ["Substance1", "Substance2"])
    expect(() => labo.add(null, 2).toThrow("Veuillez entrer un nom de substance"))
})

test("ajout nouveau produit nom invalide", () => {
    const labo = new Laboratory("My laboratory", ["Substance1", "Substance2"])
    expect(() => labo.add(123, 2).toThrow("Veuillez entrer un nom de substance valide"))
})

test("ajout nouveau produit quantité invalide", () => {
    const labo = new Laboratory("My laboratory", ["Substance1", "Substance2"])
    expect(() => labo.add("ProdA", "10").toThrow("Veuillez entrer une quantité valide"))
})

// tests reactions

test('initialisation reactions valides', () => {
    const reactions = {
        ProduitA: [
            [2, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "My laboratory",
        ["Substance1", "Substance2"],
        reactions
    )

    expect(labo.reactions).toEqual(reactions)
})

test('initialisation reactions vide', () => {
    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1"],
            []
        )
    ).toThrow("Veuillez entrer des reactions valides")
})

test('initialisation reactions pas un objet', () => {
    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1"],
            "reactions"
        )
    ).toThrow("Veuillez entrer des reactions valides")
})

// nom de pdt enlevé car clé obj toujours convertie en string donc impossible de tester
// test('initialisation reactions nom de produit non string', () => {
//     const reactions = {
//         123: [
//             [1, "Substance1"],
//             [1, "Substance2"]
//         ]
//     }

//     expect(() =>
//         new Laboratory(
//             "My laboratory",
//             ["Substance1", "Substance2"],
//             reactions
//         )
//     ).toThrow("Veuillez entrer des noms de produit valides")
// })

test('initialisation reactions nom de produit vide', () => {
    const reactions = {
        "": [
            [1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des noms de produit valides")
})

test('chaque reaction doit avoir au moins deux reactifs', () => {
    const reactions = {
        ProduitA: [
            [2, "Substance1"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Chaque réaction doit avoir au moins deux réactifs")
})

test('liste de reactifs vide pour un produit', () => {
    const reactions = {
        ProduitA: []
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1"],
            reactions
        )
    ).toThrow("Chaque réaction doit avoir au moins deux réactifs")
})

test('reactif doit etre un couple [quantite, substance]', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1", "extra"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des couples quantité substance valides")
})

test('reactif non tableau', () => {
    const reactions = {
        ProduitA: [
            "Substance1",
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des couples quantité substance valides")
})

// qte
test('quantité nulle', () => {
    const reactions = {
        ProduitA: [
            [null, "Substance1"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des couples quantité substance valides")
})

test('quantité negative', () => {
    const reactions = {
        ProduitA: [
            [-1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("La quantité doit être un nombre strictement positif")
})

test('quantité egale a zero', () => {
    const reactions = {
        ProduitA: [
            [0, "Substance1"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("La quantité doit être un nombre strictement positif")
})

test('quantité non numerique', () => {
    const reactions = {
        ProduitA: [
            ["deux", "Substance1"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des couples quantité substance valides")
})

// substantce
test('substance non string', () => {
    const reactions = {
        ProduitA: [
            [2, 123],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1", "Substance2"],
            reactions
        )
    ).toThrow("Veuillez entrer des couples quantité substance valides")
})

test('substance inconnue du laboratoire', () => {
    const reactions = {
        ProduitA: [
            [1, "SubstanceInconnue"],
            [1, "Substance2"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance2"],
            reactions
        )
    ).toThrow("Substance inconnue")
})

// doublons
test('doublon de substance dans une reaction', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1"],
            [2, "Substance1"]
        ]
    }

    expect(() =>
        new Laboratory(
            "My laboratory",
            ["Substance1"],
            reactions
        )
    ).toThrow("Une reaction ne peut pas contenir deux fois la meme substance")
})

// methode make

test('make produit la quantité demandée si stock suffisant', () => {
    const reactions = {
        ProduitA: [
            [2, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    labo.add("Substance1", 10)
    labo.add("Substance2", 10)

    const produced = labo.make("ProduitA", 3)

    expect(produced).toBe(3)
    expect(labo.getQuantity("Substance1")).toBe(4)
    expect(labo.getQuantity("Substance2")).toBe(7)
    expect(labo.getQuantity("ProduitA")).toBe(3)
})


// pas asseez de composants
test('make produit le maximum possible si stock insuffisant', () => {
    const reactions = {
        ProduitA: [
            [2, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    labo.add("Substance1", 5)
    labo.add("Substance2", 10)

    const produced = labo.make("ProduitA", 10)

    expect(produced).toBe(2)
    expect(labo.getQuantity("Substance1")).toBe(1)
    expect(labo.getQuantity("Substance2")).toBe(8)
    expect(labo.getQuantity("ProduitA")).toBe(2)
})


// stock null
test('make ne produit rien si une substance est absente du stock', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    labo.add("Substance1", 10)

    const produced = labo.make("ProduitA", 5)

    expect(produced).toBe(0)
    expect(labo.getQuantity("Substance1")).toBe(10)
    expect(labo.getQuantity("ProduitA")).toBe(0)
})


// pdt inconnu
test('make avec un produit sans reaction', () => {
    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        {}
    )

    expect(() =>
        labo.make("ProduitInconnu", 1)
    ).toThrow("Aucune reaction pour ce produit")
})


// validation params
test('make avec nom de produit null', () => {
    const labo = new Laboratory("Lab", ["Substance1"])

    expect(() =>
        labo.make(null, 1)
    ).toThrow("Veuillez entrer un nom de produit")
})

test('make avec nom de produit non string', () => {
    const labo = new Laboratory("Lab", ["Substance1"])

    expect(() =>
        labo.make(123, 1)
    ).toThrow("Veuillez entrer un nom de produit valide")
})

test('make avec quantité nulle', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    expect(() =>
        labo.make("ProduitA", null)
    ).toThrow("Veuillez entrer une quantité")
})

test('make avec quantité non numerique', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    expect(() =>
        labo.make("ProduitA", "2")
    ).toThrow("Veuillez entrer une quantité valide")
})

test('make avec quantité negative', () => {
    const reactions = {
        ProduitA: [
            [1, "Substance1"],
            [1, "Substance2"]
        ]
    }

    const labo = new Laboratory(
        "Lab",
        ["Substance1", "Substance2"],
        reactions
    )

    expect(() =>
        labo.make("ProduitA", -1)
    ).toThrow("La quantité doit être strictement positive")
})