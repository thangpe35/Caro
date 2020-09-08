const controller = {};

controller.subscribeRealtimeUpdate = [];

controller.unsubscribeAll = function () {
    for (let unsubscribe of controller.subscribeRealtimeUpdate) {
        unsubscribe();
    }
    let count = controller.subscribeRealtimeUpdate.length;
    controller.subscribeRealtimeUpdate.splice(0, count);
}
/**
 * Xử lý login
 *
 */
controller.login = async function (dataLogin) {
    if (dataLogin.email === '') {
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if (dataLogin.password === '') {
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if (dataLogin.email !== '' &&
        dataLogin.password !== '') {
        model.login(dataLogin)
    }
}

/**
 * Xử lý register
 *
 */
controller.register = async function (data) {
    if (data.firstName === '') {
        document.getElementById('first-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('first-name-error').innerText = ''
    }
    if (data.lastName === '') {
        document.getElementById('last-name-error').innerText = 'Please input first name'
    } else {
        document.getElementById('last-name-error').innerText = ''
    }
    if (data.email === '') {
        document.getElementById('email-error').innerText = 'Please input email'
    } else {
        document.getElementById('email-error').innerText = ''
    }
    if (data.password === '') {
        document.getElementById('password-error').innerText = 'Please input password'
    } else {
        document.getElementById('password-error').innerText = ''
    }
    if (data.confirmPassword.trim() === '') {
        document.getElementById('confirmPassword-error').innerText = 'Please input confirmpassword'
    } else if (data.password !== data.confirmPassword) {
        document.getElementById('confirmPassword-error').innerText = "Password didn't match"
    } else {
        document.getElementById('confirmPassword-error').innerText = ''
    }
    if (data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.password === data.confirmPassword) {
        model.register(data)
    }
    if (data.firstName !== '' &&
        data.lastName !== '' &&
        data.email !== '' &&
        data.password !== '' &&
        data.confirmPassword !== '' &&
        data.password == data.confirmPassword) {
        model.register(data)
    }
}

/**
 * Load các challenge gửi từ user khác đến mình
 *
 */
controller.loadChallenges = async function () {
    // dùng bộ lọc where
    let response = await firebase.firestore().collection('challenges').where('to', '==', model.currentUser.email).get();
    model.challenges = getDataFromDocs(response.docs);
    // sau đó chỉ cần hiển thị challenges ra thui, chỗ này làm sau
    // đây nè , xóa cái vừa nãy đi, chưa gọi hàm thôi :D
    view.showChallenges()
}

/**
 * Gửi thư khiêu chiến
 * @param string email
 */
controller.challengeOther = async function (opponentEmail) {
    // thằng user ko thể tự thách đấu chính mình đc
    await firebase.firestore().collection('challenges').add({
        from: model.currentUser.email,
        to: opponentEmail,
        accept: false
    });

    alert('Đã gửi thư khiêu chiến đến ' + opponentEmail);
}

/**
 * Xử lý thư khiêu chiến, có thế xóa. Nếu accept -> beginFight và đặt status 2 bên là fighting
 * @param string id
 * @param string action
 */
controller.handleRequestChallenge = async function (id, action) {
    if (action == 'delete') {
        await firebase.firestore().collection('challenges').doc(id).delete();

    } else if (action == 'accept') {
        // cập nhật lại challenge có challengeId
        await firebase.firestore().collection('challenges').doc(id).update({
            accept: true,
            currentTurn: 0,
            table: JSON.stringify([
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
                ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],

            ]),
            winner: null
        });
        let response = await firebase.firestore().collection('challenges').doc(id).get();
        let currentChallenge = getDataFromDoc(response);
        controller.beginFight(currentChallenge);
    }
}

// Chờ đối phương accept challenge của mình
controller.listenRequestChallengeUpdate = async function () {
    // lắng nghe sự kiện (accept) thay đổi ở challenges
    return firebase.firestore().collection('challenges').where('from', '==', model.currentUser.email).onSnapshot(function (response) {

        // chỗ này logic vẫn chưa đúng, cần phải sửa
        let challenges = getDataFromDocs(response.docs);

        let acceptedChallenge = challenges.find(challenge => challenge.accept == true);

        if (acceptedChallenge) {
            controller.beginFight(acceptedChallenge);
        }
    });
}

// Nhận challenge từ các đối thủ khác
controller.listenRequestChallengeComing = function () {

    return firebase.firestore().collection('challenges').where('to', '==', model.currentUser.email).onSnapshot(function (response) {
        let challenges = getDataFromDocs(response.docs);
        model.challenges = challenges;
        view.showChallenges();
    });
}

// Cập nhật realtime trạng thái của người dùng
controller.listenPlayersStatusChanged = function () {
    return firebase.firestore().collection('users').onSnapshot(function (response) {
        model.listUsers = getDataFromDocs(response.docs);
        view.showUsers();
    });
}

/**
 * Nếu bên mình hoặc đối phương accept challenge thì bắt đầu fight
 *
 */
controller.beginFight = async function (challenge) {
    // cập nhật lại status cho người dùng
    await firebase.firestore().collection('users').doc(model.currentUser.email).update({
        status: 'fighting'
    });

    model.currentChallenge = challenge;
    view.showScreen('fight');


}

/**
 * Người dùng đánh x hoặc o lên bàn cờ
 */
controller.hitOnTable = function (i, j) {
    let currentChallenge = model.currentChallenge;

    // cái này là mặc định cho thằng nào là x thằng nào là o 
    // thằng gửi thư khiêu chiến là o, thằng chấp nhận lời khiêu chiến là x
    let flag = false;
    let currentTurn = '';
    let type = '#'; // xét loại x || o
    if (currentChallenge.from == model.currentUser.email && currentChallenge.currentTurn == 0) {
        type = '0'
        currentTurn = 1;
        flag = true;
    } else if (currentChallenge.to == model.currentUser.email && currentChallenge.currentTurn == 1) {
        type = '1';
        currentTurn = 0;
        flag = true;
    }
    if (!flag) return;

    let newTable = JSON.parse(model.currentChallenge.table);
    newTable[i][j] = type;

    firebase.firestore().collection('challenges').doc(currentChallenge.id).update({
        table: JSON.stringify(newTable),
        currentTurn: currentTurn
    });
}

controller.listenCurrentChallengeUpdate = function () {

    //     let sub = firebase.firestore().collection('challenges').doc(model.currentChallenge.id).onSnapshot(function (doc) {
    //         if(doc.exists){
    //             model.currentChallenge = getDataFromDoc(doc);

    //             view.showTable();

    //             let winner = checkTable(JSON.parse(model.currentChallenge.table));
    //             if (winner != null) {
    //                 controller.endFight(winner);
    //             }
    //         }

    //     });
    //  return sub

    return firebase.firestore().collection('challenges').onSnapshot(function (response) {
        let challenges = getDataFromDocs(response.docs)
        let currentChallenge = challenges.find(function (challenge) {
            return challenge.id == model.currentChallenge.id
        })

        let winner = checkTable(JSON.parse(model.currentChallenge.table));
        if (winner != null) {
            controller.endFight(winner);
            return
        }
        model.currentChallenge = currentChallenge;
        view.showTable();
    })

}

controller.endFight = async function (winner, unsubscribe) {
    let winnerEmail = (winner == 0) ? model.currentChallenge.from : model.currentChallenge.to;
    alert(winnerEmail + ' đã giành chiến thắng');

    firebase.firestore().collection('users').doc(model.currentChallenge.from).update({
        status: 'free',
        score: firebase.firestore.FieldValue.increment((winner == 0) ? 3 : 0)
    });

    firebase.firestore().collection('users').doc(model.currentChallenge.to).update({
        status: 'free',
        score: firebase.firestore.FieldValue.increment((winner == 1) ? 3 : 0)
    });

    // sau khi fight xong thì phải xóa challenge đi

    await firebase.firestore().collection('challenges').doc(model.currentChallenge.id).delete();
    model.currentChallenge = null;
    view.showScreen("lobby");
}

/**
 * Load các users với điểm và trạng thái 
 *
 */
controller.loadUsers = async function () {
    // load từ firebase về r cho vô model
    // là mình lấy dữ liệu từ firebase -> model xong từ controller -> view à a
    // làm đi 
    // load hết trong collection users ra
    // viết sai này, có lỗi thì để ý 1 tí
    const loadUser = await firebase.firestore().collection('users').get()
    model.listUsers = getDataFromDocs(loadUser.docs)
    // load cái đống users về thôi mà dùng cái docs đấy à a ờ
    // h qua view.showUsers r show nó lên màn hình thôi , viet ham show à a
    view.showUsers();
}
controller.loadPLayer = async function () {
    const loadPLayer = await firebase.firestore().collection('users').get()
    model.currentUser = getDataFromDocs(loadPLayer.docs)
    view.showPlayer();
}

//  ơ thế phải viết thêm 1 cái hàm nữa à a 

// nhìn nhiều function thế thôi, chứ tách thế này ra thì mỗi cái ngắn lắm oke a những nhìn vẫn áp lực =)))
// chú cứ code quen thì nhìn thế nó còn ngắn, chứ a toàn phải đọc mấy đoạn code dài hon 300 dòng cơ @@
