
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