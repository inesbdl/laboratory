
const { Laboratory } = require('../src/Laboratory.js');

// Initialiser

test('initialisation du laboratoire', () => {
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])    

  expect(labo.name).toBe("My laboratory");
  expect(labo.substances).toEqual({
    Substance1 : 0,
    Substance2 : 0,
    Substance3 : 0
  })
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

test("ajout quantité substance non existante", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add("Substance123", 2).toThrow("La substance 'Substance123' n'existe pas"))
})
test("ajout quantité substance nom null", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add(null, 2).toThrow("Veuillez entrer un nom de substance"))
})
test("ajout quantité substance nom pas string", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add({name:"coucou"}, 2).toThrow("Veuillez entrer un nom de substance valide"))
})

test("ajout quantité substance qte null", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add("Substance1", null).toThrow("Veuillez entrer un quantité"))
})
test("ajout quantité substance qte invalide", ()=>{
    const labo = new Laboratory("My laboratory",["Substance1", "Substance2", "Substance3"])
    expect(()=> labo.add("Substance1", []).toThrow("Veuillez entrer une quantité valide"))
})