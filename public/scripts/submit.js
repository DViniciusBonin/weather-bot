const loading = document.getElementById('loading')

document.querySelector('button').addEventListener('click', () => {
  loading.style.display = 'flex'
  const ajax = new XMLHttpRequest();
  const city = document.querySelector('input').value
  const json = {
    city: city
  }
  ajax.open('POST', '/submit')
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send(`city=${city}`)

  ajax.addEventListener("readystatechange", function() {
    if(ajax.readyState === 4 && ajax.status === 200) {
      loading.style.display = 'none'
    
      const response = JSON.parse(ajax.response)

      let nameCity = document.querySelectorAll('h4');
      nameCity[1].innerHTML = response.city

      let itens = document.querySelectorAll('li');
      itens[0].innerHTML = 'temperatura:'
      itens[1].innerHTML = 'Probabilidade de chuva:'
      itens[2].innerHTML = 'Nascer e pôr do Sol:'
      
      itens[0].innerHTML += ` min ${response.tempMin} máx ${response.tempMax}`
      itens[1].innerHTML += " " + response.rain
      itens[2].innerHTML += " " + response.sun

    }
  })
})