document.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar-presto')
    if (window.scrollY > 150) {
        navbar.classList.add('p-bg-white')
    } else {
        navbar.classList.remove('p-bg-white')
    }
})


const toggler = document.querySelector('.navbar-toggler')

toggler.addEventListener('click' , function(){
    toggler.classList.toggle('fa-rotate-90')
})




function populateCategoriesWrapper() {
    const categoriesWrapper = document.querySelector('#categories-wrapper')

    if(!categoriesWrapper){
        return
    }


    let categories = [
        {'name' : 'Moto' , icon : 'fas fa-motorcycle'},
        {'name' : 'Auto' , icon : 'fas fa-car'},
        {'name' : 'Bici' , icon : 'fas fa-bicycle'},
        {'name' : 'Telefono' , icon : 'fas fa-phone'},
        {'name' : 'Computer' , icon : 'fas fa-mouse'},
        {'name' : 'Casa' , icon : 'fas fa-home'},
        {'name' : 'Immobili' , icon : 'fas fa-couch'},
        {'name' : 'Giochi' , icon : 'fas fa-gamepad'},

    ]
    
    categories.forEach(category => {
        let card = document.createElement('div')
        card.classList.add('col-12', 'col-lg-3', 'col-sm-6', 'mb-5')
        card.innerHTML = 
        `
                <div class="card-category tc-white text-center mx-auto">
                    <h3 class="fw-bold mb-4 tc-main"> <i class="${category.icon}"></i>${category.name}</h3>
                    <button class="btn-main">Vai alla categoria</button>
                </div>
        `
        categoriesWrapper.appendChild(card)
    })
}

function populateLastAds(){
    let lastAds = [
        {
            "id":1,
            "name": "Huawei X5",
            "category": "Elettronica",
            "price": "120.12"
        },
        {
            "id": 2,
            "name": "Fiat 500",
            "category": "Auto",
            "price": "21000.99"
        },
        {
            "id": 3,
            "name": "Mazza da Baseball",
            "category": "Sport",
            "price": "20"
        },
        {
            "id": 4,
            "name": "Bilocale",
            "category": "Immobili",
            "price": "320000"
        },
        {
            "id": 5,
            "name": "Felpa usata",
            "category": "Abbigliamento",
            "price": "10.42"
        },
        {
            "id": 6,
            "name": "Divani due posti",
            "category": "Arredamento",
            "price":"400.64"
        },
        {
            "id": 7,
            "name": "Pala",
            "category": "Giardinaggio",
            "price":"30.45"
        }

    ]
    
    const swiperWrapper = document.querySelector('.swiper-wrapper-home')

    if(!swiperWrapper){
        return
    }

    lastAds.forEach(ad => {
        let slide = document.createElement('div')
    
        slide.classList.add('swiper-slide')
    
        slide.innerHTML =
        `
        <div class="card-product mx-auto">
            <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
            <div class="card-product-body tc-white">
                <div class="d-flex flex-wrap justify-content-between align-items-center">
                <h3 class="mb-0">${ad.name}</h3>
                <i class="far fa-heart likes fs-3"></i>
                <a class="tc-sec w-100" href="">${ad.category}</a>
                </div>
                <p class="fs-3 text-end">${ad.price}$</p>
                
            </div>
        </div>
        `
    
        swiperWrapper.appendChild(slide)
    })
}


function generateCarousel() {
    const swiper = new Swiper('.swiper-container-home', {
        // Optional parameters
        loop: true,
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1424: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        },
    
      });
}


function generateLikesBtn() {
    let likesBtns = document.querySelectorAll('.likes')

    likesBtns.forEach(btn => {
        btn.addEventListener('click', function(){
            btn.classList.toggle('fas')
            btn.classList.toggle('far')
            btn.classList.toggle('tc-main')
        })
    })
}

populateCategoriesWrapper()
populateLastAds()
generateCarousel()
generateLikesBtn()