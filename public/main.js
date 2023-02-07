
const socket = io.connect()

const productsForm = document.getElementById('productsForm')
const productsList = document.getElementById('productsList')

productsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newProduct = { title: productsForm[0].value, price: productsForm[1].value, thumbnail: productsForm[2].value }
    socket.emit('newProduct', newProduct)
    productsForm.reset()
})


socket.on('productsTable', data => {
    fetch('views/datos.handlebars')
    .then(res => res.text())
    .then(htmlCode => {
        const productos = data.length
        const misProd = data
        const template = Handlebars.compile(htmlCode)
        const productsTemplate = template({ productos, misProd })

        productsList.innerHTML = productsTemplate
    })
})



const messagesForm = document.getElementById('messagesForm')
const userEmail = document.getElementById('userEmail')
const messageContent = document.getElementById('msn')
const messagesContainer = document.getElementById('msnContainer')
const msgBtn = document.getElementsByClassName('msgBtn')
const verUser = document.getElementsByClassName('email')
const user = document.getElementById('user')
const userL = document.getElementById('userL')
const age = document.getElementById('age')
const nickname = document.getElementById('nickname')
const avatar = document.getElementById('avatar')
const messages = document.getElementsByClassName('messages')

const userDataValidations = (user, userL, age, nickname, avatar) => {
    if (user == '' || userL == '' || age == '' || nickname == '' || avatar == ''
    || user == ' ' || userL == ' ' || age == ' ' || nickname == ' ' || avatar == ' ') return false
    else return true
}

messagesForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const verUser = userDataValidations(user.value, userL.value, age.value, nickname.value, avatar.value,email.value, )
    if (validateUserEmail() && verUser){
        newMessage = {
            author: {
                id: email.value,
                nombre: user.value,
                apellido: userL.value,
                edad: age.value,
                alias: nickname.value,
                avatar: avatar.value
            },
            text: messagesForm[0].value
        }
        socket.emit('newMessage', newMessage)
        messages.reset()
    } else {
        messageContent.value = 'Error'
    }
})

userEmail.addEventListener('click', () => {
    messageContent.style.color = 'black'
    messageContent.value = ''
})


const authorSchema = new normalizr.schema.Entity('author')
const postSchema = new normalizr.schema.Entity('post', { author: authorSchema }, { idAttribute: '_id' })
const postsSchema = new normalizr.schema.Entity('posts', { mensajes: [postSchema] })

socket.on('allMessages', data => {
    const { normalizedM, dataLength } = data
    console.log('Normalizados:', normalizedM)
    const denormalized = normalizr.denormalize(normalizedM.result, postsSchema, normalizedM.entities)
    console.log('Desnormalizados:', denormalizedM)
    const allNormalized = JSON.stringify(normalizedM).length
    let compressionRatio
    originalDataLength === 2
        ? compressionRatio = 0
        : compressionRatio = ((allNormalized * 100) / dataLength).toFixed(2)
    messagesCenterTitle[0].innerText = `Centro de Mensajes - Compresión: ${compressionRatio}%`
    const mapping = denormalized.mensajes.map(message => {
        return `<div id='messageInfo'>
                    <div'>
                    <div>
                        <img src='${message.author.avatar}' ${message.author.alias}]' width='50px'>
                    </div>
                    <p>${message.author.nickname}</p>
                    <span [ ${message.date} ]</span>
                    </div>
                    <div class='texts'>
                    <p>  ${message.text}<p>
                    </div>
                </div>`
    })
    messagesContainer.innerHTML =mapping.join(' ')
})
socket.on('allMessages', data => {
    const mapping = data.map(message => {
        return `<div>
                    <p style="color: black">${message.user}</p>
                    <span>[ ${message.date} ]</span>
                    <p>=>  ${message.msn}</p>
                </div>`
    })
    messagesContainer.innerHTML = mapping.join(' ')
})

const validateUserEmail = () => {
    const emailPattern =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    let validEmail
    emailPattern.test(email.value) ? validEmail = true : validEmail = false
    return validEmail
}