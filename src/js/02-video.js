import Player from '@vimeo/player'; // Импортируем vimeo
import throttle from 'lodash.throttle'; // Импортируем throttle

// Инициализируем плеер
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

// Отслеживаем время и записываем в локальное хранилище
const onPlay = function(data) {
    localStorage.setItem(STORAGE_KEY, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000)); // Отслеживаем время один раз в секунду

const savedCurrentTime = localStorage.getItem(STORAGE_KEY);

if (savedCurrentTime) {
    player.setCurrentTime(savedCurrentTime); // Возобновляем просмотр после перезагрузки
}




