fetch('./annunci.json').then(data => data.json()).then(ads => {

    function generateLikesButtons(){
        let likesBtns = document.querySelectorAll('.likes')
        
        
        likesBtns.forEach(btn => {
            btn.addEventListener('click', function(){
                let id = btn.getAttribute('ad-id');

                let storage = sessionStorage.getItem('likes').split(',');

                if(storage.includes(id)){
                    storage = storage.filter(el => el != id)
                } else {
                    storage.push(id)
                }


                sessionStorage.setItem('likes' , storage)

                btn.classList.toggle('fas')
                btn.classList.toggle('far')
                btn.classList.toggle('tc-main')
            })
        })
    }

    function populateAds(ads){
        const adsWrapper = document.querySelector('#ads-wrapper')

        function setFavourite(id){
            if(sessionStorage.getItem('favourite')){
                let storage = sessionStorage.getItem('favourite').split(',');
    
                if(storage.includes(id.toString())){
                    return `fas tc-linear`
                } else {
                    return `far`
                }
            } else {
                sessionStorage.setItem('favourite' , '')
                return `far`
            }

        }


        adsWrapper.innerHTML = ''

        ads.forEach((ad , i) => {
            let card = document.createElement('div')
    
            card.classList.add('col-12' , 'col-sm-6' , 'col-lg-4' , 'mb-4')
    
            card.innerHTML = 
            `
            <div class="card-product mx-auto"
                data-aos="zoom-in"
                data-aos-delay="${(i <= 5) ? 100 * i : 200 + i*10}"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="true"
                data-aos-anchor-placement="top-center">
                <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
                <div class="card-product-body tc-white">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <h3 class="mb-0">${ad.name}</h3>
                    <i ad-id="${ad.id}" class="${setFavourite(ad.id)} far fa-heart likes fs-3"></i>
                    <a class="tc-white w-100" href="">${ad.category}</a>
                    </div>
                <p class="fs-3 text-end">${ad.price}$</p>
                    
                </div>
            </div>
            `
    
            adsWrapper.appendChild(card)
        })

        generateLikesButtons()
    }
    
    function populateCategoryFilterRadio(){
        let categories = Array.from(new Set(ads.map(ad => ad.category)))
        let wrapper = document.querySelector('#wrapper-category-radio')


        categories.forEach((category , i) => {
            let input = document.createElement('div')

            input.classList.add('form-check')

            input.innerHTML = 
            `        
            <input class="form-check-input filter-category" type="radio" name="category-filter" id="flexRadioDefault${i}" data-filter="${category}">
            <label class="form-check-label" for="flexRadioDefault${i}">
                ${category}
            </label>
            
            `

            wrapper.appendChild(input)
        })        
    }

    function populateCategorySelect(){
        let categories = Array.from(new Set(ads.map(ad => ad.category)))
        let wrapper = document.querySelector('#category-select')

        categories.forEach(category => {
            let option = document.createElement('option')

            option.innerHTML = `${category}`
            option.value = `${category}`
            wrapper.appendChild(option)
        })
    }

    function filterByCategoryRadio(){
        let radios = document.querySelectorAll('.filter-category')

        radios.forEach(radio => {
            radio.addEventListener('input' , function(){
                let selected = radio.getAttribute('data-filter')

                if(selected === 'all'){
                    populateAds(ads)
                } else {
                    let filtered = ads.filter(ad => ad.category === selected)

                    populateAds(filtered)
                }
                

            })
        })
    }

    function filterByCategorySelect(){
        let input = document.querySelector('#category-select')

        input.addEventListener('change', function(){

            if(input.value === 'all'){
                populateAds(ads)
            } else {
                let filtered = ads.filter(ad => ad.category === input.value)

                populateAds(filtered)
            }
        })
    }

    function filterBySearch(){
        let input = document.querySelector('#search-input')
        
        input.addEventListener('keydown', function(e){

            let filtered = ads.filter(ad => ad.name.toLowerCase().includes(input.value.toLowerCase()))

            populateAds(filtered) 

        })
    }

    function populatePriceFilter(){
        let minInput = document.querySelector('#min-price-filter')
        let minLabel = document.querySelector('#min-price-label')

        let maxInput = document.querySelector('#max-price-filter')
        let maxLabel = document.querySelector('#max-price-label')

        let max = ads.map(ad => ad.price).sort((a , b) => b - a)[0]

        // inizializzo il massimo e l'attributo max
        maxLabel.innerHTML = `${Math.ceil(max)} $`
        minInput.max = max
        maxInput.max = max
        maxInput.value = max

        minInput.addEventListener('input' , function(e) { 
            if((Number(maxInput.value) - 200) <= Number(minInput.value)){
                e.preventDefault()
                minInput.value = Number(maxInput.value) - 200
            }
            minLabel.innerHTML = `${minInput.value} $`
        })

        maxInput.addEventListener('input' , function(e) {
            // maxInput.min = Number(minInput.value) + 200
            if((Number(maxInput.value) - 200) <= Number(minInput.value) ){
                e.preventDefault()
                maxInput.value = Number(minInput.value) + 200
            }

            maxLabel.innerHTML = `${maxInput.value} $`
        })

    }

    function filterByPrice(){
        let minInput = document.querySelector('#min-price-filter')
        let maxInput = document.querySelector('#max-price-filter')

        function filterAds(){
            let filtered = ads.filter(ad => Number(ad.price) > Number(minInput.value) && Number(ad.price) <= Number(maxInput.value) + 1)

            populateAds(filtered)
        }

        minInput.addEventListener('change' , filterAds)

        maxInput.addEventListener('change' , filterAds)
    }


    populateCategorySelect()
    populateCategoryFilterRadio()
    populatePriceFilter()

    filterByCategoryRadio()
    filterByCategorySelect()
    filterBySearch()
    filterByPrice()

    populateAds(ads)
    
    

})