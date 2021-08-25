function truncateTitle(title){
    let splitted = title.split(' ')
    if(splitted.length > 1){
        return `${splitted[0]}...`
    } else {
        return splitted[0]
    }  
}

function setFavourite(id){
    if(sessionStorage.getItem('likes')){
        let storage = sessionStorage.getItem('likes').split(',');

        if(storage.includes(id.toString())){
            return `fas tc-main`
        } else {
            return `far`
        }
    } else {
        sessionStorage.setItem('likes' , '')
        return `far`
    }

}

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

            let slide = document.querySelector(`.ad-${id}`)
            slide.parentNode.removeChild(slide);

            btn.classList.toggle('fas')
            btn.classList.toggle('far')
            btn.classList.toggle('tc-main')
        })
    })
}

    
fetch('./annunci.json').then(data => data.json())
    .then( ads => {
        let storage = sessionStorage.getItem('likes').split(',') 
    
        let likes = ads.filter(ad => storage.includes(ad.id.toString()))
        
        let wrapper = document.querySelector('.likes-wrapper')
    
        likes.forEach(ad => {
    
            let slide = document.createElement('div')
    
            slide.classList.add('swiper-slide' , `ad-${ad.id}`)
    
            slide.innerHTML =
            `
            <div class="card-product mx-auto">
                <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
                <div class="card-product-body tc-white">
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <div class="position-relative flex-grow-1 title-box">
                        <h3 class="mb-0">${truncateTitle(ad.name)}</h3>
                    </div>
                    <i ad-id="${ad.id}" class="${setFavourite(ad.id)} fa-heart likes fs-3"></i>
                    <a class="tc-main w-100" href="">${ad.category}</a>
                    </div>
                    <p class="fs-3 text-end">${ad.price}$</p>
                    
                </div>
            </div>
            `
    
            wrapper.appendChild(slide)
    
        })
    
    
        const swiper = new Swiper('.swiper-likes', {
            // Optional parameters
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
    
        generateFavouriteButtons()
})
    



