let menu = {
    1:['<li class="order-item"><img src="./img/cola.jpeg"><div><span class="order-name">Cola</span><span class="order-count">2</span></div></li>',"Cola"],
    2:['<li class="order-item"><img src="./img/fanta.jpeg"><div><span class="order-name">Fanta</span><span class="order-count">2</span></div></li>',"Fanta"],
    3:['<li class="order-item"><img src="./img/burger_cheese.jpeg"><div><span class="order-name">Cheese Burger</span><span class="order-count">2</span></div></li>',"Cheese Burger"],
    4:['<li class="order-item"><img src="./img/chicken_togora.jpeg"><div><span class="order-name">Chicken togora</span><span class="order-count">2</span></div></li>',"Chicken togora"],
    5:['<li class="order-item"><img src="./img/chicken_wings.jpeg"><div><span class="order-name">Chicken wings</span><span class="order-count">2</span></div></li>',"Chicken wings"],
    6:['<li class="order-item"><img src="./img/combo.jpeg"><div><span class="order-name">Combo</span><span class="order-count">2</span></div></li>',"Combo"],
    7:['<li class="order-item"><img src="./img/spinner.jpeg"><div><span class="order-name">Spinner</span><span class="order-count">2</span></div></li>',"Spinner"],

}

let user_list = JSON.parse(window.localStorage.getItem('user_list')) || {};

let foods = ["Cola", "Fanta", "Cheese Burger", "Chicken togora", "Chicken wings", "Combo", "Spinner"]
// Users lani elementlari
let users = document.querySelectorAll('li[class="customer-item"]')
const user_display = document.querySelector('ul[class="customers-list"]')
const adding_customer = document.querySelector('button[class="adding_customer"]')

// Form elementlari
const form_user = document.querySelector('form[id="userAdd"]')
const name_input = document.querySelector('input[id="usernameInput"]')
const phone_input = document.querySelector('input[id="telephoneInput"]')

let selected_user = 0
// Ikkinchi Form elementlari

const form_food = document.querySelector('#foodsForm')

// Order lar

const orders_lis = document.querySelector('.orders-list')

form_food.addEventListener("submit", (event) => {
    event.preventDefault()
    if(event.target[1].value < 11 && event.target[1].value > 0 && selected_user){
        
        let help = menu[event.target[0].value][0].split("2")
        help.splice(1,0,event.target[1].value)
        help = help.join("")
        
        
        
        
        for(let child of orders_lis.children){
            if(child.lastElementChild.firstElementChild.textContent == menu[event.target[0].value][1]){
                child.lastElementChild.lastElementChild.textContent = parseInt(child.lastElementChild.lastElementChild.textContent) + +event.target[1].value
                
                for(let i of user_list[selected_user.firstElementChild.textContent]){
                    
                    for(let food of foods){
                        let selectedOption = event.target[0].options[event.target[0].selectedIndex];
                        const selectedText = selectedOption.text;
                        
                        console.log(i, i.includes(food) , selectedText, food)
                        if(i.includes(food) && selectedText == food){
                            console.log(true)
                            let regex = /\d/
                            let match = i.match(regex)
                            let help2 = i.split(match[0])
                            help2.splice(1,0,parseInt(event.target[1].value) + parseInt(match[0]))
                            console.log(help2)
                            help2 = help2.join("")
                            user_list[selected_user.firstElementChild.textContent][user_list[selected_user.firstElementChild.textContent].indexOf(i)] = help2
                            console.log(user_list)
                            orders_lis.innerHTML = user_list[selected_user.firstElementChild.textContent].join("")
                            
                        }
                    }
                }
                return
            }
            
        }
        user_list[selected_user.firstElementChild.textContent].push(help) 
        // console.log(user_list)
        window.localStorage.setItem('user_list', JSON.stringify(user_list))
        user_list = JSON.parse(localStorage.getItem('user_list'))
        orders_lis.innerHTML = user_list[selected_user.firstElementChild.textContent].join("")

        
    
    }
})
















form_user.addEventListener('submit', (event) => {
    event.preventDefault()
    if(validation_name(name_input) && validation_number(phone_input)){
        let new_li = document.createElement('li')
        new_li.setAttribute('class', 'customer-item')
        new_li.setAttribute('id',`${gen_id()}`)

        let span = document.createElement('span')
        span.textContent = name_input.value
        span.setAttribute('class', 'customer-name')

        let a = document.createElement('a')
        a.textContent = phone_input.value
        a.setAttribute('href', `tel:${phone_input.value}`)
        a.setAttribute('class', 'customer-phone')

        new_li.append(span, a)
        user_display.append(new_li)

        user_list[name_input.value] = []
        window.localStorage.setItem('user_list', JSON.stringify(user_list))

        name_input.value = null
        phone_input.value = null
        
        users = document.querySelectorAll('li[class="custo mer-item"]')
    }


    for(let user of users){
        user.addEventListener('click', () => {
            selected_user = user
            let id = document.querySelector("span[id='clientId']")
            let username = document.querySelector("h1[id='userHeader']")

            id.textContent = user.id
            username.textContent = user.firstElementChild.textContent
            window.localStorage.getItem("user_list")
            orders_lis.innerHTML = user_list[selected_user.firstElementChild.textContent]
        })
    }
})










































function validation_number(input){
    if(input.value.length == 13 && input.value[0] == "+"){
        return true
    }
    return false
}
function validation_name(input){
    if(input.value.length < 20){
        return true
    }
    return false
}

function gen_id(){
    let date = Date.now().toString()
    return date.slice(-3)
}