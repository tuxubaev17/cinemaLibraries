/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';


document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        //2   movieList = document.querySelectorAll('.promo__interactive-item');
        movieList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('form.add'),
        inputFilms = form.querySelector('.adding__input'),
        check = form.querySelector('[type=checkbox]');


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = inputFilms.value;
        const fav = check.checked;

        if (fav){
            console.log('Добавляем любимый фильм');
        }

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            watchedFilms(movieDB.movies, movieList);
        }
        e.target.reset();
    });

    const sortArr = (arr) => {
        arr.sort();
    }


    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }

    function watchedFilms(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                watchedFilms(films, parent);

                });
            });
    }

    makeChanges();
    deleteAdv(adv);
    watchedFilms(movieDB.movies, movieList);


});


