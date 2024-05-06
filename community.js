const searchInput = document.querySelector('.searchBx input');
const cards = document.querySelectorAll('.card');
const navIcons = document.querySelectorAll('.nav-icon');
const navItems = document.querySelectorAll('.nav a');
const submitBtn = document.getElementById('submitBtn'); 

function scrollToSection(targetSection) {
    targetSection.classList.add('animate-section');

    setTimeout(function () {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    setTimeout(function () {
        targetSection.classList.remove('animate-section');
    }, 1500);
}

function toggleNavIcons() {
    navIcons.forEach(function (icon) {
        icon.classList.remove('active');
    });
    this.classList.add('active');
}

navIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
        toggleNavIcons.call(this);

        let dataItem = this.getAttribute('data-item');

        cards.forEach(function (card) {
            let cardDataItem = card.getAttribute('data-item');

            let categories = cardDataItem.split(' ');

            if (dataItem === 'all' || categories.includes(dataItem)) {
                card.classList.remove('hide');
                card.classList.add('active');

                categories.forEach(function (category) {
                    card.classList.add('animate-' + category);
                });

                setTimeout(function () {
                    categories.forEach(function (category) {
                        card.classList.remove('animate-' + category);
                    });
                }, 1500);
            } else {
                card.classList.remove('active');
                card.classList.add('hide');
            }
        });
    });
});

window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

function handleSearch() {
    const searchQuery = searchInput.value.trim().toLowerCase();

    const previousSearchResults = document.querySelector('.search-results');
    if (previousSearchResults) {
        previousSearchResults.remove();
    }

    const searchResultsSection = document.createElement('div');
    searchResultsSection.classList.add('search-results');
    searchResultsSection.style.overflowY = 'auto';
    searchResultsSection.style.overflowX = 'hidden';
    searchResultsSection.style.maxHeight = '350px';
    searchResultsSection.style.scrollbarWidth = 'thin';

    cards.forEach(function (card) {
        const gameName = card.querySelector('h3').textContent.toLowerCase();
        if (gameName.includes(searchQuery)) {
            const clonedCard = card.cloneNode(true);
            clonedCard.classList.add('search-result');
            searchResultsSection.appendChild(clonedCard);
        }
    });

    searchInput.parentElement.parentElement.appendChild(searchResultsSection);

    resetNavIcons();

    if (searchQuery === '') {
        searchResultsSection.style.display = 'none';
    }
}

function resetNavIcons() {
    navIcons.forEach(function (icon) {
        icon.classList.remove('active');
    });
}

searchInput.addEventListener('input', handleSearch);

navItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
        event.preventDefault();

        let targetId = this.getAttribute('href').substring(1);
        let targetSection = document.getElementById(targetId);

        scrollToSection(targetSection);

        searchInput.value = '';
        const searchResultsSection = document.querySelector('.search-results');
        if (searchResultsSection) {
            searchResultsSection.remove();
        }
    });
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.searchBx')) {
        searchInput.value = '';
        const searchResultsSection = document.querySelector('.search-results');
        if (searchResultsSection) {
            searchResultsSection.remove();
        }
    }
});

if (performance.navigation.type === 1) {
    window.location.href = "game.html";
}

