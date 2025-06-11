const products = [
    {
        id: 'em-609',
        title: 'SPC ЛАМИНАТ ROYCE EMOTION ДУБ МОКСИ EM-609',
        price: 1590,
        oldPrice: 1790,
        specs: '42 класс 4 мм',
        images: ['images/em-609.jpg', 'images/em-609-2.jpg'],
        addedDate: '2025-06-01'
    },
    {
        id: 'em-604',
        title: 'SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604',
        price: 1590,
        specs: '42 класс 4 мм',
        images: ['images/em-604.jpg', 'images/em-604-2.jpg'],
        addedDate: '2024-04-01'
    },
    {
        id: 'em-605',
        title: 'SPC ЛАМИНАТ ROYCE EMOTION ДУБ СЬЕРРА EM-605',
        price: 1590,
        oldPrice: 1890,
        specs: '42 класс 4 мм',
        images: ['images/em-605.jpg', 'images/em-605-2.jpg'],
        addedDate: '2025-06-06'
    },
    {
        id: 'em-603',
        title: 'SPC ЛАМИНАТ ROYCE EMOTION ДУБ ПЛАСТ EM-603',
        price: 1590,
        specs: '42 класс 4 мм',
        images: ['images/em-603.jpg', 'images/em-603-2.jpg'],
        addedDate: '2023-08-01' 
    }
];

localStorage.setItem('products', JSON.stringify(products));

document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    
    products.forEach(product => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const isNew = new Date(product.addedDate) > oneMonthAgo;
    const hasSale = product.oldPrice && product.oldPrice > product.price;
    
        const price = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        const oldPrice = product.oldPrice ? product.oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '';
        
        swiperWrapper.innerHTML += `
        <div class="swiper-slide">
            <div class="product-card" data-id="${product.id}">
                <div class="product-card__image-wrapper">
                    <img src="${product.images[0]}" alt="${product.title}" class="product-card__image">
                    <div class="product-card__dots">
                        <span class="product-card__dot product-card__dot--active"></span>
                        <span class="product-card__dot"></span>
                    </div>
                        ${isNew ? '<span class="product-card__sticker product-card__sticker--new">New</span>' : ''}
                        ${hasSale ? '<span class="product-card__sticker product-card__sticker--sale">%</span>' : ''}
                </div>
                <div class="product-card__info">
                    <h3 class="product-card__title">${product.title}</h3>
                    <div class="product-card__specs">${product.specs}</div>
                        <div class="product-card__price-wrapper">
                            ${hasSale ? `<span class="product-card__old-price">${oldPrice} ₽</span>` : ''}
                            <span class="product-card__price">${price} ₽</span>
                            <span class="product-card__price-unit">/ м²</span>
                    </div>
                    <button class="product-card__button">Купить</button>
                </div>
            </div>
        </div>
    `;
    });

    const swiper = new Swiper('.collection__slider', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2.2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });

    const cards = document.querySelectorAll('.product-card__image-wrapper');
    
    cards.forEach(card => {
        const img = card.querySelector('.product-card__image');
        const dots = card.querySelectorAll('.product-card__dot');
        let showingFirst = true;
        
        if (window.innerWidth >= 1024) {
            card.addEventListener('mouseenter', () => {
                const productId = card.closest('.product-card').dataset.id;
                const product = products.find(p => p.id === productId);
                img.src = showingFirst ? product.images[1] : product.images[0];
                dots[0].classList.toggle('product-card__dot--active');
                dots[1].classList.toggle('product-card__dot--active');
                showingFirst = !showingFirst;
            });
            
            card.addEventListener('mouseleave', () => {
                if (!showingFirst) {
                    const productId = card.closest('.product-card').dataset.id;
                    const product = products.find(p => p.id === productId);
                    img.src = product.images[0];
                    dots[0].classList.add('product-card__dot--active');
                    dots[1].classList.remove('product-card__dot--active');
                    showingFirst = true;
                }
            });
        } else {
            let touchStart = 0;
            let touchEnd = 0;
            
            card.addEventListener('touchstart', (e) => {
                touchStart = e.touches[0].clientX;
            });
            
            card.addEventListener('touchmove', (e) => {
                touchEnd = e.touches[0].clientX;
            });
            
            card.addEventListener('touchend', () => {
                if (Math.abs(touchEnd - touchStart) > 50) {
                    const productId = card.closest('.product-card').dataset.id;
                    const product = products.find(p => p.id === productId);
                    img.src = showingFirst ? product.images[1] : product.images[0];
                    dots[0].classList.toggle('product-card__dot--active');
                    dots[1].classList.toggle('product-card__dot--active');
                    showingFirst = !showingFirst;
                    }
                });
            }
    });
});