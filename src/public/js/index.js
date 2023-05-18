

const socket= io()
socket.emit('message', "hola web socket emitiendo")

socket.on('evento individual', data=>{
    console.log(data)
})
socket.on('evento todos menos yo', data=>{
    console.log(data)
})
socket.on('evento todos', data=>{
    console.log(data)
})