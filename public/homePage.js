const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout( () => {
    if (true) {
        location.reload();
    }
} )

ApiConnector.current( response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
} )

const ratesBoard = new RatesBoard();
function ratesBoardFunc() {
    ApiConnector.getStocks( (response) => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    } ) 
}
ratesBoardFunc();
let intervalId = setInterval( ratesBoardFunc, 60000 );

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = response => {
    // console.log(response);
    ApiConnector.addMoney(response, response => {
        // console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Пополнение счета выполнено");
        } else {
            moneyManager.setMessage(response.success, "При пополнении счета произошла ошибка");
        }
    });
}

moneyManager.conversionMoneyCallback = response => {
    // console.log(response);
    ApiConnector.convertMoney(response, response => {
        // console.log(response.data);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация проведена успешно");
        } else {
            moneyManager.setMessage(response.success, "При конвертации произошла ошибка");
        }
    })
}

moneyManager.sendMoneyCallback = response => {
    // console.log(response);
    ApiConnector.transferMoney(response, response => {
        // console.log(response.data);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод завершен успешно");
        } else {
            moneyManager.setMessage(response.success, "При переводе произошла ошибка");
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites( response => {
    if (response.success === true) {
        // console.log(response);
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, "Адресная книга обновлена");
    } else {
        moneyManager.setMessage(response.success, "При обновлении адресной книги произошла ошибка");
    }
} );

favoritesWidget.addUserCallback = response => {
    ApiConnector.addUserToFavorites(response, (data) => {
        // console.log(response);
        // console.log(data);
        if (data.success === true) {
            // console.log(true);
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            favoritesWidget.setMessage(data.success, "Адресат добавлен успешно");
        } else {
            favoritesWidget.setMessage(data.success, "При добавлении адресата произошла ошибка");
        }  
    }); 
}

favoritesWidget.removeUserCallback = response => {
    ApiConnector.removeUserFromFavorites(response, (data) => {
        // console.log(response);
        // console.log(data);
        if (data.success === true) {
            // console.log(true);
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data.data);
            moneyManager.updateUsersList(data.data);
            favoritesWidget.setMessage(data.success, "Адресат удален успешно");
        } else {
            favoritesWidget.setMessage(data.success, "При удалении адресата произошла ошибка");
        } 
    });
}