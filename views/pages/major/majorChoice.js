import { makeElement } from "./domHelper.js"
// const form = document.querySelector('#myform')
// form.addEventListener('submit', function(event){
//     console.log('test')
//     event.preventDefault()
//     const majorChoicediv = makeElement('div', 'This is where the compare data will go',{
//         "class": "card text-center", 
//         "id": "majorChoice"
//     })
//     document.querySelector('#majorChoice').appendChild(majorChoicediv)
// })
document.getElementById('changePage').onclick=function(){
    console.log('test')
    const majorChoicediv = makeElement('div', 'This is where the compare data will go',{
        "class": "card text-center", 
        "id": "majorChoice"
    })
    document.querySelector('#majorChoice').appendChild(majorChoicediv)
}