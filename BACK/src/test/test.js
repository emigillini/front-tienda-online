
const suma = (...nums)=>{
    if(nums.length===0) return 0;
    let validInput = true
    for (let index = 0; index < nums.length&&validInput; index++) {
        if(typeof nums[index]!=="number" )
        {validInput=false}
        
    }
    if(!validInput){return null}
    let result = 0
    for (let index = 0; index < nums.length; index++) {
        result+=nums[index]
        
    }

    return result
}


let testPasados = 0
let testTotales = 4
console.log("test 1 = la funcion devuelve null si algun parametro es no numerico");

let resultTest1 =suma("2",2)
console.log(resultTest1)
if (resultTest1===null){
    console.log("test1 pasado");
    testPasados++
}

else console.log(`test 1 no pasado se recibio ${typeof resultTest1}, se esperaba null`);

console.log("test 2 = la funcion devuelve 0 si no se paso parametro");

let resultTest2 =suma()
console.log(resultTest2)
if (resultTest2===0){
    console.log("test2 pasado");
    testPasados++
}
else console.log(`test 2 no pasado se recibio ${ resultTest2}, se esperaba 0`)

console.log("test 3 = la funcion devuelve la suma correcta");

let resultTest3 =suma(5,5)
console.log(resultTest3)
if (resultTest3===10){
    console.log("test3 pasado");
    testPasados++
}
else console.log(`test 3 no pasado se recibio ${ resultTest3}, se esperaba 10`)

console.log("test 4 = la funcion devuelve la suma correcta, cualquie cantidad de parametros");

let resultTest4 =suma(5,5,5,5)
console.log(resultTest4)
if (resultTest4===20){
    console.log("test4 pasado");
    testPasados++
}
else console.log(`test 4 no pasado se recibio ${ resultTest4}, se esperaba 20`)
if(testPasados==testTotales) {console.log("todos pasados con exito");}
else console.log (`se pasaron ${testPasados} de un total ${testTotales}`)

 const login = (user, pass) => {
    if(pass === '') return 'No password';
    if(user === '') return 'No user';
    if(pass !== '123') return 'Wrong password';
    if(user !== 'coderUser') return 'Wrong user';
    return 'Logueado';
}

const totalTests = 5;
let testPasadosx = 0;

console.log('Test 1: Testeo de password vacio');
    let resultado1 = login('coderUser', '')
    if(resultado1 === 'No password'){
        console.log('Test 1 pasado')
        testPasadosx++;
    }else{
        console.log('Test 1 NO pasado')
    }

    console.log('Test 2: Testeo de usuario vacio');
    let resultado2 = login('', '123')
    if(resultado2 === 'No user'){
        console.log('Test 2 pasado')
        testPasadosx++;
    }else{
        console.log('Test 2 NO pasado')
    }

    console.log('Test 3: Testeo de password incorrecto');
    let resultado3 = login('coderUser', '321')
    if(resultado3 === 'Wrong password'){
        console.log('Test 3 pasado')
        testPasadosx++;
    }else{
        console.log('Test 3 NO pasado')
    }

    console.log('Test 4: Testeo de user incorrecto');
    let resultado4 = login('cod', '123')
    if(resultado4 === 'Wrong user'){
        console.log('Test 4 pasado')
        testPasadosx++;
    }else{
        console.log('Test 4 NO pasado')
    }

    console.log('Test 5: Testeo de login correcto');
    let resultado5 = login('coderUser', '123')
    if(resultado5 === 'Logueado'){
        console.log('Test 5 pasado')
        testPasadosx++;
    }else{
        console.log('Test 5 NO pasado')
    }

    if(totalTests === testPasadosx){
    console.log('Pasaron todos los test')
    }else{
    console.log(`Pasaron ${testPasadosx} test de ${totalTests}`)
    }