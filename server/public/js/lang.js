document.addEventListener('DOMContentLoaded', getLocalLang)

const info = document.querySelectorAll('.information');

var arrLang = {
    'en': {
        'reg-btn': 'Registration',
        'close-btn': 'Close',
        'prep': 'Enter your nickname',
        'warn1': 'This nickname is already taken',
        'warn2': 'This name will be shown to all other users',
        'done': 'Done',
        'inst-M': 'Please install Metamask First',
        'market': 'Market',
        'crosing': 'Crosing',
        'rating': 'Rating',
        'num-rating': 'Rating:',
        'planets': 'Planets',
        'stars': 'Stars',
        'buy': 'BUY',
        'genesis': 'Genesis',
        'com-rare': 'Com/Rare',
        'extra': 'Extra',
        'common': 'Common',

    },
    'ru': {
        'reg-btn': 'Регистрация',
        'close-btn': 'Закрыть',
        'prep': 'Введите ваш псевдоним',
        'warn1': 'Этот псевдоним уже взят',
        'warn2': 'Этот псевдоним будет показан всем другим пользователям',
        'done': 'Готово',
        'inst-M': 'Пожалуйста сперва установите Metamask',
        'market': 'Магазин',
        'crosing': 'Скрещевание',
        'rating': 'Рейтинг',
        'num-rating': 'Рейтинг:',
        'planets': 'Планеты',
        'stars': 'Звёзды',
        'buy': 'Купить',
        'com-rare': 'Обч/Ред',
        'common': 'Обычная',

    }
}


$('.switch-btn').click(function() {
    $(this).toggleClass('switch-on');
    if ($(this).hasClass('switch-on')) {
        lang = document.getElementById('ru');
        lang.id = 'en';
        saveLocalLang(lang.id)
        keyLang()
        console.log(lang.id)
    } else {
        lang = document.getElementById('en');
        lang.id = 'ru';
        saveLocalLang(lang.id)
        keyLang()
        console.log(lang.id)
    }
});


function keyLang() {
    $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang.id][$(this).attr('key')]);
    });

};


// LOCAL STORAGE 

function saveLocalLang(language) {
    let langs
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.push(language)
    localStorage.setItem('langs', JSON.stringify(langs))

}

function getLocalLang() {
    let langs
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.forEach(function(language) {
        let lang = langs[langs.length - 1]
        setTimeout(() => {
            $('.lang').each(function(index, item) {
                $(this).text(arrLang[lang][$(this).attr('key')]);
            });
            if (langs[langs.length - 1] === "ru") {
                const info1 = document.getElementById('information1');
                const info2 = document.getElementById('information2');
                info1.setAttribute('data-tooltip', 'диапазон гинезиса: 0100000000-0175757575;\n возможное качество: common, rare.');
                info2.setAttribute('data-tooltip', 'диапазон дополнительной: 0100000000-0130303030;\n возможное качество: common.');
            } else if (langs[langs.length - 1] === "en") {
                const info1 = document.getElementById('information1');
                const info2 = document.getElementById('information2');
                info1.setAttribute('data-tooltip', 'range genesis: 0100000000-0175757575;\n possible quality: common, rare.');
                info2.setAttribute('data-tooltip', 'range extra: 0100000000-0130303030;\n possible quality: common, common.');
            }
        }, 0);

    })
}