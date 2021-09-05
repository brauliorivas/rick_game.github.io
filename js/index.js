const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const URL = 'https://p4.wallpaperbetter.com/wallpaper/588/5/300/rick-and-morty-toilets-hd-wallpaper-preview.jpg';

const getWallpaper = async (url) => {
    const img = new Image();
    const promise = new Promise((resolve, reject) => {
        resolve(img.src = URL)
        reject('Error when loading background')
    });
    await promise;
    var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

getWallpaper(URL);
    