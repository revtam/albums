global.favoritesList = [];

const favoritesListManager = {
    contains: (item) => {
        for (const currentItem of favoritesList) {
            if (currentItem.key == item.key) return true;
        }
        return false;
    },
    indexOf: (item) => {
        let i = 0;
        for (const currentItem of favoritesList) {
            if (currentItem.key == item.key) return i;
            ++i;
        }
        return -1;
    },
    add: (item) => {
        if (!favoritesListManager.contains(item)) favoritesList.push(item);
    },
    remove: (item) => {
        const index = favoritesListManager.indexOf(item);
        if (index > -1) {
            favoritesList.splice(index, 1);
        }
    },
    toggle: (item) => {
        if (favoritesListManager.contains(item)) favoritesListManager.remove(item);
        else favoritesListManager.add(item);
    }
}

export default favoritesListManager;